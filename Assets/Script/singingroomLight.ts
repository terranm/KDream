import { GameObject, Quaternion, Time, Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import ClientStarter from '../ZepetoScripts/Multiplay/ClientStarter';

export default class singingroomLight extends ZepetoScriptBehaviour {

    private speed :number  = 1;

    public Start(){
        this.StartCoroutine(this.Rotate);
    }
    
    public *Rotate(){
        while(this.gameObject.activeSelf){
            yield null
            this.transform.Rotate(new Vector3(0, 0, (this.speed + Time.deltaTime)));
            if (this.speed > 360) this.speed = 0;
        }
        this.StopCoroutine(this.Rotate);
    }
}