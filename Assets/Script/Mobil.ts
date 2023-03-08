import { Collider, GameObject, Quaternion, Time, Transform, Vector3 } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class Mobil extends ZepetoScriptBehaviour {
    // public StartBtn : Button;
    // public ShowZone : GameObject;

    public MovePoints : GameObject;
    public speed : number;
    public accel : number;

    private _cnt : number;
    private points : Transform[];
    private isStart : boolean;

    // Awake(){
    //     this.StartBtn.onClick.AddListener(()=>{
    //         console.log("Btn Click");
    //         this.Ride();
    //         this.StartBtn.gameObject.SetActive(false);
    //     });
    // }
    
    Start() {    
        this.points = new Array();
        this.points = this.MovePoints.GetComponentsInChildren<Transform>();
        this.points.shift();
        this._cnt = 0;
        // this.StartBtn.onClick.AddListener(()=>{
        //     console.log("Btn Click");
        //     this.Ride();
        //     this.StartBtn.gameObject.SetActive(false);
        // });
        console.log("showzone");
        // this.ShowZone.SetActive(true);
    }

    OnTriggerEnter(coll : Collider){
        if (coll.gameObject.tag == "Player"){
            this.Ride();
        }
    }

    public Ride(){
        if (this.isStart) return;
        console.log("Ride Start");
        // obj.SetActive(false);
        // let zipLine = GameManager.Resource.Instantiate("ZipLine");
        // zipLine.transform.position = this.zipPoints[0].position;
        // zipLine.transform.LookAt(this.zipPoints[1].position);
        ZepetoPlayers.instance.LocalPlayer.StopMoving();
        ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.enabled = false;
        ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.SetParent(this.transform);
        ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.localPosition = new Vector3(0,-0.88,0);
        ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.localRotation = Quaternion.Euler(new Vector3(0, 0, 0));
        this.isStart = true;
        ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.ZepetoAnimator.SetBool("isSit2", true);
        this.StartCoroutine(this.Coroutine_Move(this.points));
    }

    *Coroutine_Move(points : Transform[]){
        // console.log("Coroutine_Move Start");
        while(this.isStart){
            yield null;
            this.isStart = this.Move(points);
        }
        ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.enabled = true;
        ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.SetParent(null);
        ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.ZepetoAnimator.SetBool("isSit2", false);
        this.gameObject.SetActive(false);
        this.StopCoroutine(this.Coroutine_Move(points));
        // console.log("Coroutine_Move End");
    }

    Move(points:Transform[]){
        // if (this._cnt < points.length - 1){
        //     this.speed += this.accel;
        // }
        // else {
        //     if (this.speed > 0.5){
        //         this.speed -= (this.accel * 3);
        //     }
        // }
        this.transform.position = Vector3.MoveTowards(this.transform.position, points[this._cnt].position, this.speed * Time.deltaTime);
        this.transform.Rotate(new Vector3(0,0.3,0));
        // console.log("speed " + this.speed);
        let dir: Vector3 = Vector3.zero;
        dir = (points[this._cnt].position - this.transform.position).normalized;
        let dist = Vector3.Distance(points[this._cnt].position, this.transform.position)
        if (dist > 0.5) {
            // this.transform.rotation = Quaternion.Slerp(this.transform.rotation, Quaternion.LookRotation(dir), Time.deltaTime * 1);
            
        }
        else {
            if (this._cnt +1 < points.length) {
                dir = (points[this._cnt++].position - this.transform.position).normalized;
            } else if (this._cnt + 1 > points.length){
                dir = (points[0].position - this.transform.position).normalized;
            }
        
            // this.transform.rotation = Quaternion.Slerp(this.transform.rotation, Quaternion.LookRotation(dir), Time.deltaTime * 1);
        }
        
        //this.transform.LookAt(this.foodPos[this.foodNum].transform.position);

        if (this.transform.position == points[this._cnt].position){
            dir = new Vector3((points[this._cnt].position.x - this.transform.position.x), (points[this._cnt].position.y - this.transform.position.y), 0).normalized;
            //this.transform.rotation = Quaternion.LookRotation(this.dir);
            this._cnt++;
        }

        // if (this.foodNum == 11 && this.number == 0 && !this.isDown) {
        //     this.StopDown();
        // }
        // console.log("this._cnt " + this._cnt + " points.length " + points.length);
        return this._cnt != points.length;
        // if (this._cnt == this._points.Length) {
        //     this._cnt = 0;
        // }
    }
}


