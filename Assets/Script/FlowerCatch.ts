import { Camera, Canvas, GameObject, Quaternion, Random, Vector3 } from 'UnityEngine'
import { Button } from 'UnityEngine.UI';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import FlowerGame from './FlowerGame';

export default class FlowerCatch extends ZepetoScriptBehaviour {
    public canvas : GameObject;
    public btn : Button;
    public flower : GameObject;
    public Checker : GameObject;


    private cam : Camera;
    Start() {    
        this.cam = ZepetoPlayers.instance.ZepetoCamera.camera;
        this.canvas.GetComponent<Canvas>().worldCamera = this.cam;

        // let checker = ;
        
        let hand = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.GetChild(0).GetChild(1).GetChild(2).GetChild(0).GetChild(1).GetChild(3).GetChild(1).GetChild(1).GetChild(0).GetChild(1).GetChild(0);

        this.btn.onClick.AddListener(()=>{
            // console.log("꽃 획득 버튼 누름");
            //let num = parseInt(Random.Range(0,4).toString());
            let flObjPrefab = this.flower;
            let flObj = GameObject.Instantiate(flObjPrefab) as GameObject;
            flObj.transform.SetParent(hand);
            flObj.transform.localPosition = new Vector3(0.05,0.03,0); //0.123,0.035,-0.15
            flObj.transform.localRotation = Quaternion.Euler(new Vector3(-90,-30,0));
            ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.ZepetoAnimator.SetBool("isHold", true);
            this.gameObject.SetActive(false);
            this.Checker.GetComponent<FlowerGame>().cnt++;
            // console.log("checker.cnt " + checker.cnt);
            this.Checker.GetComponent<FlowerGame>().flowerObjs.push(flObj);
            // console.log("꽃 획득 버튼 누름 완료");
        });
    }


}