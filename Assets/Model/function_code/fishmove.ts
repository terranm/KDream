import {ZepetoScriptBehaviour} from 'ZEPETO.Script'
import {  Vector3, GameObject } from 'UnityEngine';
import ClientStarter from '../../ZepetoScripts/Multiplay/ClientStarter';
export default class fishmove extends ZepetoScriptBehaviour {

    public distance:number;
    public isTurn:boolean;
    public speed:number;
    public distanceTravelled:float;
    public fish:GameObject;

    private Stater : ClientStarter;
    Start() {
        this.Stater = (GameObject.Find("ClientStarter")).GetComponent<ClientStarter>();
        
        this.distance = 10 + (Math.random() * 5);
        this.speed = 0.01 + Math.random() * 0.01;
    }

    Update() {
        if (!this.Stater.isGameStart || this.transform == null) return;
        if(this.distanceTravelled > this.distance){
            if(this.isTurn == true){
                this.isTurn = false;
                this.fish.transform.Rotate(new Vector3(0,180,0));
                this.distanceTravelled = 0;
            }else if(this.isTurn == false){
                this.isTurn = true;
                this.fish.transform.Rotate(new Vector3(0,180,0));
                this.distanceTravelled = 0;
            }
        }
        this.transform.Translate(this.speed,0,0);
        this.distanceTravelled += this.speed;
    }









    // public speed:float;
    // public distanceTravelled:float;
    // public goBack:boolean;
    // public spincount:float = 2;
    // public fishany:GameObject;
    
    
    // Update() {
    //     this.distanceTravelled += this.speed * Time.deltaTime;
    //     if (this.goBack == false){
    //         this.transform.Translate(this.speed/100,0,0);
    //     }
    //     if (this.goBack == true){
    //         this.transform.Translate(this.speed/-100,0,0);
    //     }
    //     if (this.distanceTravelled >= (this.spincount - 1)*14 && this.goBack == false){
    //         console.log(`앞으로`);
    //         this.fishany.transform.Rotate(new Vector3(0,180,0));
    //         this.spincount += 1;
    //         this.goBack = true;
    //     }
    //     if (this.distanceTravelled >= (this.spincount - 1)*14 && this.goBack == true){
    //         console.log(`뒤로`);
    //         this.fishany.transform.Rotate(new Vector3(0,180,0));
    //         this.spincount += 1;
    //         this.goBack = false;
    //     }
    // }
}