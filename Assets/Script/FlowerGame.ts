import { GameObject, HideInInspector, WaitForSeconds } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class FlowerGame extends ZepetoScriptBehaviour {
    public clearNum : number;
    public flowers : GameObject;
    public clearCan : GameObject;

    public Result : GameObject;
    
    @NonSerialized()
    public cnt : number;
    @NonSerialized()
    public flowerObjs : GameObject[];

    Start() {
        this.cnt = 0;
        this.flowerObjs = new Array();
        this.clearCan.transform.GetChild(0).GetComponentsInChildren<Button>().forEach((btn)=>{
            btn.onClick.AddListener(()=>{
                this.clearCan.transform.GetChild(0).gameObject.SetActive(false);
                this.clearCan.transform.GetChild(1).gameObject.SetActive(true);
            });
        });
        this.clearCan.transform.GetChild(1).GetComponentInChildren<Button>().onClick.AddListener(()=>{
            this.clearCan.transform.GetChild(1).gameObject.SetActive(false);
            this.clearCan.transform.GetChild(2).gameObject.SetActive(true);
        });
        this.clearCan.transform.GetChild(2).GetComponentInChildren<Button>().onClick.AddListener(()=>{
            this.clearCan.transform.GetChild(2).gameObject.SetActive(false);
        });
        this.clearCan.transform.GetChild(1).gameObject.SetActive(false);
        this.clearCan.transform.GetChild(2).gameObject.SetActive(false);
        this.clearCan.SetActive(false);
        
        this.Result.transform.GetChild(0).gameObject.SetActive(false);
        this.Result.transform.GetChild(1).gameObject.SetActive(false);
        
        this.flowers.SetActive(false);
    }

    private *Checking(){
        // console.log("this.cnt " + this.cnt + " this.clearNum " + this.clearNum);
        while(this.cnt < this.clearNum){
            yield null;
            // console.log("this.cnt " + this.cnt + " this.clearNum " + this.clearNum);
        }
        // clear Game
        this.StartCoroutine(this.ResultPopup(1));
    }
    
    private *ResultPopup(rstNum : number){
        this.StopCoroutine(this.Checking());
        this.Result.transform.GetChild(rstNum).gameObject.SetActive(true);
        yield new WaitForSeconds(2);
        this.DestroyFlowers();
        this.Result.transform.GetChild(rstNum).gameObject.SetActive(false);
        switch(rstNum){
            case 0:
                break;
            case 1:
                this.clearCan.SetActive(true);
                this.transform.GetChild(0).gameObject.SetActive(false);
                break;
        }
        this.StopCoroutine(this.ResultPopup(rstNum));
    }

    public StartGame(){
        this.flowers.SetActive(true);
        this.StartCoroutine(this.Checking());
    }

    public ResetGame(isFail:bool=true){
        this.cnt = 0;
        for(let i = 0; i < this.flowers.transform.childCount; i++){
            this.flowers.transform.GetChild(i).gameObject.SetActive(true);
            this.flowers.transform.GetChild(i).GetChild(0).gameObject.SetActive(false);
        }
        this.flowers.SetActive(false);
        if (isFail){
            this.StartCoroutine(this.ResultPopup(0));
        }
        else {
            this.DestroyFlowers();
        }
    }

    public DestroyFlowers(){
        this.flowerObjs.forEach((flObj)=>{
            GameObject.Destroy(flObj);
        });
        this.flowerObjs = new Array();
        ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.ZepetoAnimator.SetBool("isHold", false);
    }
}