import { Collider, GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import LookAt from './LookAtDodam';

export default class LookAtTrigger extends ZepetoScriptBehaviour {

    // private lookAt:LookAt;

    // Start(){
    //     if(!this.transform.parent.TryGetComponent<LookAt>(null)){
    //         console.log("looAt null " + this.transform.parent.name);
    //     }
    //     this.lookAt = this.transform.parent.GetComponent<LookAt>();
    // }

    OnTriggerEnter(coll : Collider){
        if (coll.gameObject.tag == "Player"){
            this.transform.parent.GetComponent<LookAt>().LookAtStart();
        }
    }
    
    OnTriggerExit(coll : Collider){
        if (coll.gameObject.tag == "Player"){
            this.transform.parent.GetComponent<LookAt>().LookAtStop();
        }
    }

}