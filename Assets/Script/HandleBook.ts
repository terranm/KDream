import { GameObject, Quaternion, Vector3, WaitForEndOfFrame, WaitForSeconds } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
// import ClientStarter from '../ZepetoScripts/Multiplay/ClientStarter';

export default class HandleBook extends ZepetoScriptBehaviour {

    public handTrue : Button;
    public handFalse : Button;
    private obj : GameObject;
    public book : GameObject;

    public popup : GameObject;
    public popupClose : Button;
    public effObj : GameObject;
    public megiBtn : GameObject;

    Start() {
        this.popup.SetActive(false);
        this.megiBtn.SetActive(false);
        this.effObj.SetActive(true);

        this.handTrue.onClick.AddListener(() =>{
            this.popup.SetActive(true);
            this.megiBtn.SetActive(true);
            this.effObj.SetActive(false);

            let hand = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.GetChild(0).GetChild(1).GetChild(2).GetChild(0).GetChild(1).GetChild(3).GetChild(1).GetChild(1).GetChild(0).GetChild(1).GetChild(0);
            
            this.obj = GameObject.Instantiate(this.book) as GameObject;

            this.obj.transform.SetParent(hand);
            this.obj.transform.localPosition = new Vector3(0.16,0.1,0);
            this.obj.transform.localEulerAngles = new Vector3(180,0,150);
            ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.ZepetoAnimator.SetBool("isHold", true);
            this.handTrue.gameObject.SetActive(false);
        })

        this.popupClose.onClick.AddListener(()=>{
            this.popup.SetActive(false);
        });

        this.handFalse.onClick.AddListener(() =>{
            ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.ZepetoAnimator.SetBool("isHold", false);
            GameObject.Destroy(this.obj);
        })
        
        
    }

    public ResetGame(){
        if (this.obj != null){
            ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.ZepetoAnimator.SetBool("isHold", false);
            GameObject.Destroy(this.obj);
        }
        this.popup.SetActive(false);
        this.megiBtn.SetActive(false);
        this.effObj.SetActive(true);
        this.handTrue.gameObject.SetActive(true);
    }
}