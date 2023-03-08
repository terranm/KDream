import { Camera, Canvas, GameObject, WaitForSeconds } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { ZepetoCamera, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import ClientStarter from '../ZepetoScripts/Multiplay/ClientStarter';

export default class LookAt extends ZepetoScriptBehaviour {

    public movingObject:GameObject;

    // private Stater : ClientStarter;
    // Start() {
    //     // this.transform.parent.GetComponent<Canvas>().worldCamera = ZepetoPlayers.instance.ZepetoCamera.camera;
    //     this.StartCoroutine(this.LookAt());
    // }

    // private *LookAt(){
    //     while(true){
    //         yield new WaitForSeconds(0.01);
    //         this.transform.LookAt(ZepetoPlayers.instance.LocalPlayer.zepetoCamera.cameraParent.GetChild(0).transform.position);
    //     }
    // }
    Update() {
        // if (this.Stater.isGameStart == null){
        //     console.log("isGameStart " + this.transform.name);
        // }
        // if (this.Stater.isGameStart != true) {
        //     return;
        // }
        // console.log(this.transform.parent.parent.name + this.transform.parent.name + this.transform.name);
        this.transform.LookAt(ZepetoPlayers.instance.LocalPlayer.zepetoCamera.cameraParent.GetChild(0).transform.position);
        // console.log(ZepetoPlayers.instance.LocalPlayer.zepetoCamera.cameraParent.GetChild(0).transform.position);
    }
}