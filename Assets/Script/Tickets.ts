import { GameObject } from 'UnityEngine'
import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
export default class Ticket extends ZepetoScriptBehaviour {

    public UI : GameObject;
    public Games :GameObject;
    public startBtn : Button;
    Start() {
        this.startBtn.onClick.AddListener(() => {
            this.Games.SetActive(true);
            this.UI.SetActive(true);
        })    }
}