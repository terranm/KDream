import { Collider, GameObject, SphereCollider, WaitForSeconds } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import HandleBook from './HandleBook';

export default class MegiGameReset extends ZepetoScriptBehaviour {
        
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
            this.toShow.GetComponent<HandleBook>().ResetGame();
            this.gameObject.GetComponent<Collider>().enabled = false;
            this.StartCoroutine(this.YieldOut());
        }
    }

    private *YieldOut(){
        yield new WaitForSeconds(0.3);
        this.toShow.SetActive(false);
        this.gameObject.GetComponent<Collider>().enabled = true;
        this.StopCoroutine(this.YieldOut());
    }
}