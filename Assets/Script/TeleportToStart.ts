import { Collider,GameObject, Quaternion, Vector3 } from "UnityEngine";
import { Button } from "UnityEngine.UI";
import { ZepetoPlayers } from "ZEPETO.Character.Controller";
import {ZepetoScriptBehaviour} from "ZEPETO.Script";
export default class Teleport extends ZepetoScriptBehaviour {
    public hitBox:GameObject;
    public targetObjs:GameObject;
    private ojbVecX:number;
    private ojbVecY:number;
    private ojbVecZ:number;
    private hitVecX:number;
    private hitVecY:number;
    private hitVecZ:number;
    private isTeleported:boolean = false;

    //hitBox의 collider에 닿으면 지정된 위치로 텔레포트하는 로직
    OnTriggerStay(hitBox: Collider) {
        if(hitBox.gameObject.tag == "Player"){
            //타겟 오브젝트의 Vector3 값을 저장
            this.ojbVecX = this.targetObjs.transform.position.x;
            this.ojbVecY = this.targetObjs.transform.position.y;
            this.ojbVecZ = this.targetObjs.transform.position.z;
            //히트 오브젝트의 Vector3 값을 저장
            this.hitVecX = this.hitBox.transform.position.x;
            this.hitVecY = this.hitBox.transform.position.y;
            this.hitVecZ = this.hitBox.transform.position.z;
            //플레이어가 무한 이동하는 버그 수정 로직.
            //플레이어의 X,Y,Z 값이 히트 오브젝트의 X,Y,Z값과 완벽하게 일치하면(텔레포트 직후라면) OnTriggerEnter가 반응하지 않도록 수정
            if(this.hitVecX != ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.position.x && this.hitVecY != ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.position.y && this.hitVecZ != ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.position.z && this.isTeleported == false){
                ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.StopMoving();
                ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.Teleport(new Vector3(this.ojbVecX, this.ojbVecY, this.ojbVecZ), Quaternion.identity);
                ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.StopMoving();
                this.isTeleported = true;
                console.log(`Teleported.`)
            }
        }
    }
}