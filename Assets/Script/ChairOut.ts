import { Collider } from 'UnityEngine';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class ChairOut extends ZepetoScriptBehaviour {

    OnTriggerExit(coll:Collider){
        if (coll.gameObject.tag == "Player"){
            ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.ZepetoAnimator.
            SetBool("isSit1", false);
            this.transform.GetChild(1).gameObject.SetActive(true);
        }
    }
}