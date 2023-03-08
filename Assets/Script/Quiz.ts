import { Camera, Canvas, Collider, GameObject, Transform } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class Quiz extends ZepetoScriptBehaviour {

    public canObj : GameObject;

    public OXQuiz : Transform;
    public Result : Transform;

    public RightAnswer : number;
    Start() {    
        // this.OXQuiz = this.canObj.transform.GetChild(0);
        // this.Result = this.canObj.transform.GetChild(1);
        let OXbtns = this.OXQuiz.GetComponentsInChildren<Button>();
        let num = 0;
        OXbtns.forEach((btn)=>{
            btn.onClick.AddListener(()=>{
                this.OXQuiz.gameObject.SetActive(false);
            });
            if (num > 0){
                if (this.RightAnswer == num){
                    btn.onClick.AddListener(()=>{
                        this.Result.gameObject.SetActive(true);
                    }); 
                }
                else{
                    btn.onClick.AddListener(()=>{
                        this.WrongAnswer();
                    }); 
                }
            }
            num++
        });
        this.Result.GetComponentInChildren<Button>().onClick.AddListener(()=>{
            this.Result.gameObject.SetActive(false);
            this.gameObject.SetActive(false);
        });
        
        this.OXQuiz.gameObject.SetActive(false);
        this.Result.gameObject.SetActive(false);
        this.canObj.SetActive(true);
    }

    OnTriggerEnter(coll : Collider){
        if(coll.gameObject.tag == "Player"){
            
            this.OXQuiz.gameObject.SetActive(true);
        }
    }

    private WrongAnswer(){
        for(let i = 0; i < 3; i++){
            this.transform.parent.GetChild(i).gameObject.SetActive(true);
        }
        ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.Teleport(this.transform.parent.position, this.transform.parent.rotation);
    }
}