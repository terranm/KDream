import {ZepetoScriptBehaviour} from 'ZEPETO.Script'
import {ZepetoWorldMultiplay} from 'ZEPETO.World'
import {Room, RoomData} from 'ZEPETO.Multiplay'
import {Player, State, Vector3} from 'ZEPETO.Multiplay.Schema'
import {CharacterState, SpawnInfo, ZepetoPlayers, ZepetoPlayer, CharacterJumpState} from 'ZEPETO.Character.Controller'
import * as UnityEngine from "UnityEngine";
import ZepetoAnalytics from '../../Script/ZepetoAnalytics'


export default class ClientStarter extends ZepetoScriptBehaviour {

    public multiplay: ZepetoWorldMultiplay;
    public StartPoint : UnityEngine.Transform;
    public StartGame : UnityEngine.GameObject;
    public SoundListener : UnityEngine.GameObject;
    private analytics : ZepetoAnalytics;

    private room: Room;
    private currentPlayers: Map<string, Player> = new Map<string, Player>();

    private zepetoPlayer: ZepetoPlayer;

    public isGameStart : boolean  = false;

    private Start() {
        this.multiplay.RoomCreated += (room: Room) => {
            this.room = room;
        };

        this.multiplay.RoomJoined += (room: Room) => {
            room.OnStateChange += this.OnStateChange;
        };

        this.StartCoroutine(this.SendMessageLoop(0.1));

        this.analytics = UnityEngine.GameObject.Find("ZepetoAnalytics").GetComponent<ZepetoAnalytics>();
    }

    // Send the local character transform to the server at the scheduled Interval Time.
    private* SendMessageLoop(tick: number) {
        yield new UnityEngine.WaitForSeconds(4);
        while (true) {
            yield new UnityEngine.WaitForSeconds(tick);

            if (this.room != null && this.room.IsConnected) {
                const hasPlayer = ZepetoPlayers.instance.HasPlayer(this.room.SessionId);
                if (hasPlayer) {
                    const myPlayer = ZepetoPlayers.instance.GetPlayer(this.room.SessionId);
                    // //현재 플레이어가 탑승 상태가 아니면 플레이어의 포지션을 서버로 전송
                    // if (myPlayer.character.CurrentState != CharacterState.Idle && !this._player.isRidingZip)
                    this.SendTransform(myPlayer.character.transform);
                    this.isGameStart = true;
                    this.StartGame.SetActive(true);
                }
            }
        }
    }

    private OnStateChange(state: State, isFirst: boolean) {

        // When the first OnStateChange event is received, a full state snapshot is recorded.
        if (isFirst) {
            // [CharacterController] (Local) Called when the Player instance is fully loaded in Scene
            ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
                const myPlayer = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer;
                myPlayer.character.tag = "Player";
                this.zepetoPlayer = myPlayer;
                let listener = UnityEngine.GameObject.Instantiate(this.SoundListener) as UnityEngine.GameObject;
                listener.transform.SetParent(myPlayer.character.transform);
                myPlayer.character.OnChangedState.AddListener((cur, next) => {
                    this.SendState(next);
                });
                this.analytics.GoogleAnalytics_SendLogEvent();
            });
            // [CharacterController] (Local) Called when the Player instance is fully loaded in Scene
            ZepetoPlayers.instance.OnAddedPlayer.AddListener((sessionId: string) => {
                const isLocal = this.room.SessionId === sessionId;
                if (!isLocal) {
                    const player = this.currentPlayers.get(sessionId);

                    // [RoomState] Called whenever the state of the player instance is updated. 
                    player.OnChange += (changeValues) => this.OnUpdatePlayer(sessionId, player);
                }
            });
        }

        let join = new Map<string, Player>();
        let leave = new Map<string, Player>(this.currentPlayers);

        state.players.ForEach((sessionId: string, player: Player) => {
            if (!this.currentPlayers.has(sessionId)) {
                join.set(sessionId, player);
            }
            leave.delete(sessionId);
        });

        // [RoomState] Create a player instance for players that enter the Room
        join.forEach((player: Player, sessionId: string) => this.OnJoinPlayer(sessionId, player));

        // [RoomState] Remove the player instance for players that exit the room
        leave.forEach((player: Player, sessionId: string) => this.OnLeavePlayer(sessionId, player));
    }

    private OnJoinPlayer(sessionId: string, player: Player) {
        console.log(`[OnJoinPlayer] players - sessionId : ${sessionId}`);
        this.currentPlayers.set(sessionId, player);

        // console.log("enum error 4");
        const spawnInfo = new SpawnInfo();
        const position = this.StartPoint.position;//this.ParseVector3(player.transform.position);
        const rotation = this.StartPoint.rotation;//this.ParseVector3(player.transform.rotation);
        spawnInfo.position = position;
        spawnInfo.rotation = rotation;//UnityEngine.Quaternion.Euler(rotation);

        const isLocal = this.room.SessionId === player.sessionId;
        // console.log("enum error 5");
        ZepetoPlayers.instance.CreatePlayerWithUserId(sessionId, player.zepetoUserId, spawnInfo, isLocal);
        // console.log("enum error 6");
        
    }

    private OnLeavePlayer(sessionId: string, player: Player) {
        console.log(`[OnRemove] players - sessionId : ${sessionId}`);
        this.currentPlayers.delete(sessionId);

        ZepetoPlayers.instance.RemovePlayer(sessionId);
    }

    private OnUpdatePlayer(sessionId: string, player: Player) {

        const position = this.ParseVector3(player.transform.position);

        const zepetoPlayer = ZepetoPlayers.instance.GetPlayer(sessionId);

        var moveDir = UnityEngine.Vector3.op_Subtraction(position, zepetoPlayer.character.transform.position);
        moveDir = new UnityEngine.Vector3(moveDir.x, 0, moveDir.z);

        if (moveDir.magnitude > 3) {
            if (player.state === CharacterState.MoveTurn)
                return;

            zepetoPlayer.character.StopMoving();
            zepetoPlayer.character.transform.position = position;
            zepetoPlayer.character.transform.rotation = UnityEngine.Quaternion.identity;
            console.log(position);
        }else if(moveDir.magnitude < 0.1){
            zepetoPlayer.character.StopMoving();
        }else{
            zepetoPlayer.character.MoveContinuously(moveDir);
        }

        if (player.state === CharacterState.Jump) {
            if (zepetoPlayer.character.CurrentState !== CharacterState.Jump) {
                zepetoPlayer.character.Jump();
            }

            if (player.subState === CharacterJumpState.JumpDouble) {
                zepetoPlayer.character.DoubleJump();
            }
        }
    }

    private SendTransform(transform: UnityEngine.Transform) {
        const data = new RoomData();

        const pos = new RoomData();
        pos.Add("x", transform.localPosition.x);
        pos.Add("y", transform.localPosition.y);
        pos.Add("z", transform.localPosition.z);
        data.Add("position", pos.GetObject());

        const rot = new RoomData();
        rot.Add("x", transform.localEulerAngles.x);
        rot.Add("y", transform.localEulerAngles.y);
        rot.Add("z", transform.localEulerAngles.z);
        data.Add("rotation", rot.GetObject());
        this.room.Send("onChangedTransform", data.GetObject());
    }

    private SendState(state: CharacterState) {
        const data = new RoomData();
        data.Add("state", state);
        if(state === CharacterState.Jump) { 
            data.Add("subState", this.zepetoPlayer.character.MotionV2.CurrentJumpState);
        }
        this.room.Send("onChangedState", data.GetObject());
    }

    private ParseVector3(vector3: Vector3): UnityEngine.Vector3 {
        return new UnityEngine.Vector3
        (
            vector3.x,
            vector3.y,
            vector3.z
        );
    }
}