import { GameObject,Vector3, Collider, WaitForSeconds } from 'UnityEngine';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class LookAt extends ZepetoScriptBehaviour {

    public movingObject:GameObject;
    // public targetV:Vector3;


    public LookAtStart(){
        this.StartCoroutine(this.LootAtCharacter());
    }

    public LookAtStop(){
        this.StopCoroutine(this.LootAtCharacter());
    }

    *LootAtCharacter(){
        console.log("LookAt " + this.transform.name);
        while(true){
            yield new WaitForSeconds(0.001)
            let target = new Vector3(ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.position.x ,this.transform.position.y,ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.position.z)
            this.movingObject.transform.LookAt(target);
        }
    }
    

}