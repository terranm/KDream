import { Camera, Canvas, GameObject, Light, Material, Quaternion, Renderer, Shader, Transform, Vector3 } from 'UnityEngine'
import { Button } from 'UnityEngine.UI';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class Banditbul extends ZepetoScriptBehaviour {

    //public bandi : Light;
    private lantern : Renderer;
    private lampybtns : Button[];
    private bandinum: number;
    private getmother : GameObject;
    private cam : Camera;

    public LampybtnList : GameObject;
    public lightbtn : Button;
    public lampy : GameObject;
    public lanternLight : Light;
    public questNum : number;
    public showZone : GameObject;

    public popUp : GameObject;
    public closebtn : Button;

    Start() {
        this.cam = ZepetoPlayers.instance.ZepetoCamera.camera;    // 생성된 플레이어의 카메라 가져오기

        //시작시 초기화
        this.lantern = this.transform.GetComponent<Renderer>();
        this.lantern.material.SetFloat("_BrightAmount", 1);
        // this.questNum = 2;
        this.bandinum = -1;
        this.lanternLight.intensity = 2;
        this.lightbtn.transform.parent.GetComponent<Canvas>().worldCamera = this.cam;
        this.transform.GetChild(0).GetChild(1).gameObject.SetActive(false); // 파티클 끄기
        // this.lightbtn.gameObject.SetActive(false);

        this.lampybtns = new Array();
        this.lampybtns = this.LampybtnList.GetComponentsInChildren<Button>();
        // let num = 0;
        // console.log("lampyBtn Set start " + num);
        this.lampybtns.forEach((btn)=>{
            // ++num;
            // console.log("lampyBtn Set " + num);
            btn.transform.parent.GetComponent<Canvas>().worldCamera = this.cam;
            btn.onClick.AddListener(()=>{
                console.log("lampyBtn Click");
                this.lightbtn.gameObject.SetActive(true);
                this.lampybtns.forEach((btn)=>{
                    btn.gameObject.SetActive(false);
                });
                let hand = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.GetChild(0).GetChild(1).GetChild(2).GetChild(0).GetChild(1).GetChild(3).GetChild(1).GetChild(1).GetChild(0).GetChild(1).GetChild(0);
                this.getmother = GameObject.Instantiate(this.lampy, hand.position, Quaternion.identity) as GameObject;
                this.getmother.transform.SetParent(hand);
                this.getmother.transform.localPosition = new Vector3(0.05,0.02,0);
                this.getmother.transform.localRotation = Quaternion.identity;
                ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.ZepetoAnimator.SetBool("isHold", true);
            });
            btn.gameObject.SetActive(false);
        });
        // console.log("lampyBtn Set end " + num);

        let brightAmount = 1.5 / (this.questNum);
        let intensity = 6 / (this.questNum);

        this.lightbtn.onClick.AddListener(() =>{
            this.bandinum += 1;
            GameObject.Destroy(this.getmother);
            this.lantern.material.SetFloat("_BrightAmount", 
                1 + (this.bandinum * brightAmount));
            this.lanternLight.GetComponentInChildren<Light>().intensity = 
                2 + (this.bandinum * intensity);
            console.log(`반딧불이 ${this.bandinum}마리 수집`);
            this.lightbtn.gameObject.SetActive(false);
            if (this.bandinum >= this.questNum){
                this.popUp.SetActive(true);
                this.LampybtnList.SetActive(false);
                this.transform.GetChild(0).GetChild(1).gameObject.SetActive(true);
            }
            else{
                this.lampybtns.forEach((btn)=>{
                    btn.gameObject.SetActive(true);
                });
            }
            ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.ZepetoAnimator.SetBool("isHold", false);
        })

        let psyTest = this.popUp.transform.GetChild(0);

        for(let i = 0; i < psyTest.childCount-1; i++){
            psyTest.GetChild(i).GetComponentsInChildren<Button>().forEach((btn)=>{
                btn.onClick.AddListener(()=>{
                    psyTest.GetChild(i).gameObject.SetActive(false);
                    psyTest.GetChild(i+1).gameObject.SetActive(true);
                });
            });
            psyTest.GetChild(i).gameObject.SetActive(false);
        }

        psyTest.GetChild(psyTest.childCount-1).GetComponentsInChildren<Button>().forEach((btn)=>{
            btn.onClick.AddListener(()=>{
                psyTest.GetChild(5).gameObject.SetActive(false);
                this.popUp.transform.GetChild(1).gameObject.SetActive(true);
            });
        });

        this.popUp.transform.GetChild(1).GetComponentInChildren<Button>().onClick.AddListener(()=>{
            this.popUp.transform.GetChild(1).gameObject.SetActive(false);
            this.popUp.transform.GetChild(2).gameObject.SetActive(true);
        });

        psyTest.GetChild(0).gameObject.SetActive(true);
        psyTest.GetChild(5).gameObject.SetActive(false);
        this.popUp.transform.GetChild(1).gameObject.SetActive(false);
        this.popUp.transform.GetChild(2).gameObject.SetActive(false);


        this.closebtn.onClick.AddListener(() => {
            this.popUp.SetActive(false);
        })

        this.showZone.SetActive(true);
    }

    public ResetGame(){
        if(this.getmother != null){
            GameObject.Destroy(this.getmother);
            this.lightbtn.gameObject.SetActive(false);
            this.lampybtns.forEach((btn)=>{
                btn.gameObject.SetActive(true);
            });
            ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.ZepetoAnimator.SetBool("isHold", false);
        }
    }
}