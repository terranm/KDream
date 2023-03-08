import { Camera, Canvas, GameObject, Quaternion, Vector3, WaitForSeconds } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import ClientStarter from '../ZepetoScripts/Multiplay/ClientStarter';

export default class EnterWorld extends ZepetoScriptBehaviour {

    public but:Button;
    public cam : Camera;
    public popUp : GameObject;
    public targetWelcome : GameObject;
    public targetSangdam : GameObject;
    public yes:Button;
    public sandam:Button;
    public no:Button;

    public tiketUI : GameObject;
    public gameObj : GameObject;

    Start() {
        this.cam = ZepetoPlayers.instance.ZepetoCamera.camera;
        this.GetComponent<Canvas>().worldCamera = this.cam;

        this.but.onClick.AddListener(() => {
            this.popUp.SetActive(true);
        })
        this.yes.onClick.AddListener(() => {
            this.popUp.SetActive(false);
            this.tiketUI.SetActive(true);
            this.gameObj.SetActive(true);
            ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.Teleport(this.targetWelcome.transform.position, this.targetWelcome.transform.rotation);
        })
        this.sandam.onClick.AddListener(() => {
            this.popUp.SetActive(false);
            this.tiketUI.SetActive(true);
            this.gameObj.SetActive(true);
            ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.Teleport(this.targetSangdam.transform.position, this.targetSangdam.transform.rotation);
        })
        
        this.no.onClick.AddListener(() => {
            this.popUp.SetActive(false);
        })
    }   

}