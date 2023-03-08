import { Camera, Canvas, GameObject, WaitForSeconds } from 'UnityEngine';
import { Button, Image } from 'UnityEngine.UI';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class MovieSetGameManager extends ZepetoScriptBehaviour {
    public cam:Camera;
    // public but1:Button;
    // public but2:Button;
    // public but3:Button;
    // public but4:Button;
    
    public GameBtns : GameObject;
    public GameBtnsList:Button[];
    
    public GameImgs : GameObject;
    public GameImgsList:Image[];

    public Result :GameObject;
    
    public alert:GameObject;
    public closebtn:Button;

    public gameCan:GameObject;

    // private Stater : ClientStarter;
    Start() {
        this.cam = ZepetoPlayers.instance.ZepetoCamera.camera;    // 생성된 플레이어의 카메라 가져오기
        this.GetComponent<Canvas>().worldCamera = this.cam;

        this.GameBtnsList = new Array();
        this.GameBtnsList = this.GameBtns.GetComponentsInChildren<Button>();
        this.GameBtnsList.forEach(btn => {
            btn.gameObject.SetActive(false);
        });
        this.GameImgsList = new Array();
        this.GameImgsList = this.GameImgs.GetComponentsInChildren<Image>();
        this.GameImgsList.forEach(img => {
            img.gameObject.SetActive(false);
        });
        this.GameImgsList[0].gameObject.SetActive(true);

        for(let i = 0; i < this.GameBtnsList.Length - 1; i++){
            this.GameBtnsList[i].onClick.AddListener(()=>{
                this.GameBtnsList[i].gameObject.SetActive(false);
                this.GameBtnsList[i+1].gameObject.SetActive(true);
                this.GameImgsList[i+1].gameObject.SetActive(false);
                this.GameImgsList[i+2].gameObject.SetActive(true);
            });
        }
        this.GameBtnsList[this.GameBtnsList.Length - 1].onClick.AddListener(()=>{
            this.GameBtnsList[this.GameBtnsList.Length - 1].gameObject.SetActive(false);
            this.GameImgsList[this.GameBtnsList.Length - 1].gameObject.SetActive(false);
            this.StartCoroutine(this.ResultPopup(1));
        });

        this.Result.transform.GetChild(0).gameObject.SetActive(false);
        this.Result.transform.GetChild(1).gameObject.SetActive(false);

        let clearImg1 = this.alert.transform.GetChild(0);
        let clearImg2 = this.alert.transform.GetChild(1);
        let clearImg3 = this.alert.transform.GetChild(2);

        clearImg1.GetComponentsInChildren<Button>().forEach((btn)=>{
            btn.onClick.AddListener(()=>{
                clearImg1.gameObject.SetActive(false);
                clearImg2.gameObject.SetActive(true);
            });
        });
        clearImg2.GetComponentInChildren<Button>().onClick.AddListener(()=>{
            clearImg2.gameObject.SetActive(false);
            clearImg3.gameObject.SetActive(true);
        });

        clearImg2.gameObject.SetActive(false);
        clearImg3.gameObject.SetActive(false);

        this.closebtn.onClick.AddListener(() => {
            this.alert.SetActive(false);
        })

        // this.Stater = (GameObject.Find("ClientStarter")).GetComponent<ClientStarter>();
        
        // this.StartCoroutine(this.init());
        
    }
    
    private *ResultPopup(rstNum : number){
        this.Result.transform.GetChild(rstNum).gameObject.SetActive(true);
        yield new WaitForSeconds(2);
        this.Result.transform.GetChild(rstNum).gameObject.SetActive(false);
        switch(rstNum){
            case 0:
                break;
            case 1:
                this.alert.SetActive(true);
                this.gameCan.SetActive(false);
                break;
        }
        this.StopCoroutine(this.ResultPopup(rstNum));
    }

    public StartGame(){
        this.GameBtnsList[0].gameObject.SetActive(true);
        this.GameImgsList[1].gameObject.SetActive(true);
    }

    public ResetGame(isFail:bool=true){
        this.GameBtnsList.forEach(btn => {
            btn.gameObject.SetActive(false);
        });
        this.GameImgsList.forEach(img => {
            img.gameObject.SetActive(false);
        });
        this.GameImgsList[0].gameObject.SetActive(true);
        if (isFail){
            this.StartCoroutine(this.ResultPopup(0));
        }
    }
}