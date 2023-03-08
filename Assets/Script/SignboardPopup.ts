import { Camera, Canvas, Collider, GameObject } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class SignboardPopup extends ZepetoScriptBehaviour {
    public cam : Camera;

    public popupBtn : Button;
    public popupImg : GameObject;
    public popupCloseBtn : Button;

    Start() {   
        this.cam = ZepetoPlayers.instance.ZepetoCamera.camera;
        this.GetComponent<Canvas>().worldCamera = this.cam; 
        console.log("Start SignboardPopup");

        this.popupBtn.onClick.AddListener(()=>{
            console.log("Start SignboardPopup btn click");
            this.popupImg.SetActive(true);
        });

        this.popupCloseBtn.onClick.AddListener(()=>{
            console.log("Start SignboardPopup close");
            this.popupImg.SetActive(false);
        });

        this.popupImg.SetActive(false);
        this.popupBtn.gameObject.SetActive(false);
    }

    OnTriggerEnter(coll : Collider){
        if (coll.gameObject.tag == "Player"){
            this.popupBtn.gameObject.SetActive(true);
        }
    }
    
    OnTriggerExit(coll : Collider){
        if (coll.gameObject.tag == "Player"){
            this.popupBtn.gameObject.SetActive(false);
            this.popupImg.SetActive(false);
        }
    }
}