import { Collider, GameObject } from "UnityEngine";
import { ZepetoScriptBehaviour } from "ZEPETO.Script";
import { Button } from "UnityEngine.UI";
export default class Alert extends ZepetoScriptBehaviour {
    public popUp:GameObject;
    public button:Button;
    public anotherAlert : GameObject;

    Start(){
        this.button.onClick.AddListener(() => {
            this.popUp.SetActive(false);
        })
    }
    OnTriggerEnter(coll : Collider){
        if (coll.gameObject.tag == "Player"){
            this.popUp.SetActive(true);
            this.gameObject.SetActive(false);
            this.anotherAlert.SetActive(false);
        }
    }
}