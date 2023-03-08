import { Collider, GameObject, WaitForFixedUpdate, WaitForSeconds } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class CloseShow extends ZepetoScriptBehaviour {

    public toShow : GameObject;

    Start(){
        this.toShow.SetActive(false);
    }
    // private *init(){
    //     yield new WaitForSeconds(2);
    //     this.toShow.SetActive(false);
    // }

    OnTriggerEnter(coll : Collider){
        if (coll.gameObject.tag == "Player"){
            this.toShow.SetActive(true);
        }
    }
    
    OnTriggerExit(coll : Collider){
        if (coll.gameObject.tag == "Player"){
            this.toShow.SetActive(false);
        }
    }

}