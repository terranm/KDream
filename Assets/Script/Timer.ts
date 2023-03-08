import { GameObject, Time } from 'UnityEngine';
import { Button, Text } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import FlowerGame from './FlowerGame';
import MovieSetGameManager from './MovieSetGameManager';


export default class Timer extends ZepetoScriptBehaviour {
    public placeNum : number = 0;
    public time : float = 9;
    public timerTxt : Text;
    private selectCountdown : float;
    public StartButton : Button;
    public isGameStart : boolean;

    public GameObj :GameObject;
    private movieGame : MovieSetGameManager;
    private flowerGame : FlowerGame;

    Start() {
        this.isGameStart = false;
        this.selectCountdown = this.time;
        
        switch(this.placeNum){
            case 0:
                this.movieGame = this.GameObj.GetComponent<MovieSetGameManager>();
                break;
            case 1:
                this.flowerGame = this.GameObj.GetComponent<FlowerGame>();
                break;
        }

        this.StartButton.onClick.AddListener(() =>{
            if(this.isGameStart == false){
                this.isGameStart = true;
                this.StartButton.gameObject.SetActive(false);
                switch(this.placeNum){
                    case 0:
                        this.movieGame.StartGame();
                        break;
                    case 1:
                        this.flowerGame.StartGame();
                        break;
                }
                this.StartCoroutine(this.Timer());
            }
        })

        this.timerTxt.text = "00"
    }

    private *Timer() {
        while(this.isGameStart){
            yield null;
            if(Math.floor(this.selectCountdown) <= 0) {
                this.TimerReset();
            } 
            else {
                this.selectCountdown -= Time.deltaTime;
                this.timerTxt.text = Math.floor(this.selectCountdown).toString() // / 60%60).toString() + ' : ' + Math.floor(this.selectCountdown % 60).toString();
            }
        }
        this.StopCoroutine(this.Timer());
    }

    public TimerReset(isFail:boolean = true){
        this.StartButton.gameObject.SetActive(true);
        switch(this.placeNum){
            case 0:
                this.movieGame.ResetGame(isFail);
                break;
            case 1:
                this.flowerGame.ResetGame(isFail);
                break;
        }
        this.isGameStart = false;
        this.selectCountdown = this.time;
        this.timerTxt.text = "00"
        this.StopCoroutine(this.Timer());
    }

}