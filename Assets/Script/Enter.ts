import { BoxCollider, Collider, GameObject, Quaternion, Vector3, WaitForSeconds } from 'UnityEngine';
import { Button, Image } from 'UnityEngine.UI';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import ClientStarter from '../ZepetoScripts/Multiplay/ClientStarter';

export default class Enter extends ZepetoScriptBehaviour {


    public loadingimg : GameObject;
    public enterpopup : GameObject;
    public toPC : Button;
    public toGaraoke : Button;

    public toPCobj :GameObject;
    public toGaraokeobj : GameObject;
    private ojbVecX:number;
    private ojbVecY:number;
    private ojbVecZ:number;

    //hitBox의 collider에 닿으면 지정된 위치로 텔레포트하는 로직
    // private Stater : ClientStarter;
    Start() {
        // this.Stater = (GameObject.Find("ClientStarter")).GetComponent<ClientStarter>();
    //타겟 오브젝트의 Vector3 값을 저장
        // this.transform.GetComponent<BoxCollider>().enabled = false;

        this.loadingimg.SetActive(true);
        
        this.toPC.onClick.AddListener(() => {
            this.toPCobj.SetActive(true);
            ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.StopMoving();
            ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.Teleport(this.toPCobj.transform.position, this.toPCobj.transform.rotation);
            this.enterpopup.SetActive(false);
        })
        this.toPCobj.SetActive(false);
        this.toGaraoke.onClick.AddListener(() => {
            this.toGaraokeobj.SetActive(true);
            ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.StopMoving();
            ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.Teleport(this.toGaraokeobj.transform.position, this.toGaraokeobj.transform.rotation);
            this.enterpopup.SetActive(false);
        })
        this.toGaraokeobj.SetActive(false);

        this.transform.GetChild(0).gameObject.SetActive(false);
        // this.StartCoroutine(this.init());

    }

    // private *init(){
    //     // while(!this.Stater.isGameStart){
    //     //     yield new WaitForSeconds();
    //     // }
    //     this.StopCoroutine(this.init());
    // }
    
    OnTriggerEnter(coll : Collider){
        if(coll.gameObject.tag == "Player"){
            this.loadingimg.SetActive(false);
            this.enterpopup.SetActive(true);
        }
    }
}