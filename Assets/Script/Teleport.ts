import { Collider,GameObject, Quaternion, Vector3, Physics } from "UnityEngine";
import { Button } from "UnityEngine.UI";
import { ZepetoPlayers } from "ZEPETO.Character.Controller";
import {ZepetoScriptBehaviour} from "ZEPETO.Script";
import * as CS from "../ZepetoScripts/Multiplay/ClientStarter"
export default class Teleport extends ZepetoScriptBehaviour {
    public hitBox:GameObject;
    public targetObjs:GameObject;



    //hitBox의 collider에 닿으면 지정된 위치로 텔레포트하는 로직
    OnTriggerEnter(hitBox: Collider) {
        if(hitBox.gameObject.tag == "Player"){
            //플레이어가 무한 이동하는 버그 수정 로직.
            //플레이어의 X,Y,Z 값이 히트 오브젝트의 X,Y,Z값과 완벽하게 일치하면(텔레포트 직후라면) OnTriggerEnter가 반응하지 않도록 수정
            if(this.hitBox.transform.position != ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.position){
                ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.StopMoving();
                ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.Teleport(this.targetObjs.transform.position,this.targetObjs.transform.rotation);
        }
        }
    }
}