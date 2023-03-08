import { GameObject, WaitForSeconds } from 'UnityEngine'
import { ZepetoPlayers } from 'ZEPETO.Character.Controller'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import ClientStarter from '../ZepetoScripts/Multiplay/ClientStarter';

export default class CharacterCulling extends ZepetoScriptBehaviour {
    //카메라
    private obj : GameObject;
    private Stater : ClientStarter;
    Start() {
        this.Stater = (GameObject.Find("ClientStarter")).GetComponent<ClientStarter>();
        this.obj = GameObject.Find("ZepetoPlayers");
        this.StartCoroutine(this.Check());
    }

    private *Check(){
        while(true){
            yield null;
            if (this.Stater.isGameStart != true) {
                yield new WaitForSeconds(0.1);
                continue;
            }

            if (this.obj.transform.GetChild(2).GetChild(0).GetChild(0).transform.localPosition.z > -0.5){
                // console.log(`좌표\n`+ZepetoPlayers.instance.LocalPlayer.zepetoCamera.cameraParent.GetChild(0).transform.localPosition.z);
                ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.GetChild(0).GetChild(0).gameObject.SetActive(false);
                ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.GetChild(0).GetChild(1).gameObject.SetActive(false);
                ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.GetChild(0).GetChild(2).gameObject.SetActive(false);
            }else{
                ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.GetChild(0).GetChild(0).gameObject.SetActive(true);
                ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.GetChild(0).GetChild(1).gameObject.SetActive(true);
                ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.GetChild(0).GetChild(2).gameObject.SetActive(true);
            }
        }

    }
}