import { Canvas, GameObject, Time, Transform, Vector3, WaitForSeconds } from 'UnityEngine'
import { Button } from 'UnityEngine.UI';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class RouletteGame extends ZepetoScriptBehaviour {
    public popupBtn : Button;
    public showzone: GameObject;
    
    public popup : GameObject;
    public gainPop : GameObject;
    // public hpPop : GameObject;

    public goods : GameObject[];
    private bodyParts : Transform[];
    private goodPositions : Vector3[];
    private goodRotations : Vector3[];
    
    private spinDuration:number;
    private rotSpeed : number;



    Start() {    
        this.popupBtn.transform.parent.GetComponent<Canvas>().worldCamera = ZepetoPlayers.instance.ZepetoCamera.camera;

        this.popupBtn.onClick.AddListener(()=>{
            // console.log("this.popupBtn click " + this.popupBtn.name);
            this.popup.SetActive(true);
        });

        let mainPlate = this.popup.transform.GetChild(0);
        let rollPlate = this.popup.transform.GetChild(1);
        let mpBtns = mainPlate.GetComponentsInChildren<Button>();
        mpBtns[0].onClick.AddListener(()=>{
            this.popup.SetActive(false);
        });
        mpBtns[1].onClick.AddListener(()=>{
            rollPlate.gameObject.SetActive(true);
            this.StartCoroutine(this.Rolling(rollPlate));
        });
        
        
        this.popup.SetActive(false);
        rollPlate.gameObject.SetActive(false);
        
        let gainBtns = this.gainPop.GetComponentsInChildren<Button>();
        // let cnt = 0;
        gainBtns.forEach((btn)=>{
            btn.onClick.AddListener(()=>{
                btn.transform.parent.gameObject.SetActive(false);
                // this.hpPop.SetActive(true);
                // this.gameObject.SetActive(false);
            });
            // console.log(btn.transform.parent.name);
            btn.transform.parent.gameObject.SetActive(false);
            this.gainPop.SetActive(false);
            // switch(cnt){
            //     case 0:
                         
            //         break;
            // }
            // cnt++;
        });
        this.gainPop.SetActive(false);

        // let hpBtns = this.hpPop.GetComponentsInChildren<Button>();
        // hpBtns.forEach((btn)=>{
        //     btn.onClick.AddListener(()=>{
        //         this.hpPop.SetActive(false);
        //         this.gameObject.SetActive(false);
        //     });
        // });
        // this.hpPop.SetActive(false);

        this.spinDuration = 2;
        this.rotSpeed = 500;


        this.bodyParts = new Array();
        this.goodPositions = new Array();
        this.goodRotations = new Array();

        // wing
        this.bodyParts.push(ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.GetChild(0).GetChild(1).GetChild(2).GetChild(0));
        this.goodPositions.push(new Vector3(-0.2,0,-0.25));
        this.goodRotations.push(new Vector3(0,0,90));

        // dodam
        this.bodyParts.push(ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.GetChild(0).GetChild(1).GetChild(2).GetChild(0).GetChild(1).GetChild(2).GetChild(1).GetChild(1).GetChild(0).GetChild(1).GetChild(0));
        this.goodPositions.push(new Vector3(-0.25,0.06,0.05));
        this.goodRotations.push(new Vector3(35,0,0));

        //firefly
        this.bodyParts.push(ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.GetChild(0).GetChild(1));
        this.goodPositions.push(new Vector3(0,0,0));
        this.goodRotations.push(new Vector3(0,0,0));

        //RoketBullon
        this.bodyParts.push(ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.GetChild(0).GetChild(1).GetChild(2));//3).GetChild(0).GetChild(1).GetChild(2).GetChild(1).GetChild(1).GetChild(0).GetChild(1).GetChild(0));
        this.goodPositions.push(new Vector3(-0.388224691,-0.137299165,-0.130949169));
        this.goodRotations.push(new Vector3(0.310774058,358.70575,82.2026443));

        //flower
        this.bodyParts.push(ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.GetChild(0).GetChild(1).GetChild(2).GetChild(0).GetChild(1).GetChild(3).GetChild(1).GetChild(1).GetChild(0).GetChild(1).GetChild(0));
        this.goodPositions.push(new Vector3(0.055,0.055,-0.07));
        this.goodRotations.push(new Vector3(0,180,90));

        //Book
        this.bodyParts.push(ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.GetChild(0).GetChild(1).GetChild(2).GetChild(0).GetChild(1).GetChild(3).GetChild(1).GetChild(1).GetChild(0).GetChild(1).GetChild(0));
        this.goodPositions.push(new Vector3(0.16,0.1,0));
        this.goodRotations.push(new Vector3(180,0,150));

        
        this.showzone.SetActive(true);
    }


    private *Rolling(rollPlate : Transform){
        let crt = 0;
        while(this.rotSpeed > 5){
            yield new WaitForSeconds(0.01);
            crt += Time.deltaTime;
            if (crt < (this.spinDuration/2)) this.rotSpeed *= 1.01;
            else if (crt > this.spinDuration) this.rotSpeed *= 0.95;
            // console.log("this.rotSpeed " + this.rotSpeed);
            rollPlate.Rotate(0,0,Time.deltaTime * this.rotSpeed);
        }
        yield new WaitForSeconds(1);
        
        this.gainPop.SetActive(true);
        let num = 0;
        if ((330 < rollPlate.rotation.eulerAngles.z && rollPlate.rotation.eulerAngles.z <= 360) || (0 <= rollPlate.rotation.eulerAngles.z && rollPlate.rotation.eulerAngles.z <= 30)){
            // wing
            num = 0;
        }
        else if (30 < rollPlate.rotation.eulerAngles.z && rollPlate.rotation.eulerAngles.z <= 90){
            // dodam
            num = 1;
        }
        else if (90 < rollPlate.rotation.eulerAngles.z  && rollPlate.rotation.eulerAngles.z <= 150){
            // firefly
            num = 2;
        }
        else if (150 < rollPlate.rotation.eulerAngles.z  && rollPlate.rotation.eulerAngles.z <= 210){
            // roket
            num = 3;
            // ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.ZepetoAnimator.SetBool("isHold", true);
        }
        else if (210 < rollPlate.rotation.eulerAngles.z  && rollPlate.rotation.eulerAngles.z <= 270){
            // flower
            num = 4;
            ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.ZepetoAnimator.SetBool("isHold", true);
        }
        else if (270 < rollPlate.rotation.eulerAngles.z  && rollPlate.rotation.eulerAngles.z <= 330){
            // book
            num = 5;
            ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.ZepetoAnimator.SetBool("isHold", true);
        }
        // console.log("get " + this.gainPop.transform.GetChild(num).name + " " + rollPlate.rotation.eulerAngles.z);
        this.gainPop.transform.GetChild(num).gameObject.SetActive(true);
        let goodObj = GameObject.Instantiate(this.goods[num]) as GameObject;
        goodObj.transform.SetParent(this.bodyParts[num]);
        goodObj.transform.localPosition = this.goodPositions[num];
        goodObj.transform.localEulerAngles = this.goodRotations[num];

        // this.spinDuration = 3 + Random.Range(1,2);
        this.rotSpeed = 500;
        rollPlate.gameObject.SetActive(false);
        this.popup.SetActive(false);
    }

}