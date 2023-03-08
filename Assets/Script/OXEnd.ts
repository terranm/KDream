import { Transform } from 'UnityEngine';
import { Button } from 'UnityEngine.UI'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class OXEnd extends ZepetoScriptBehaviour {
    public EndBtn:Button;

    public img : Transform

    public imgBtn : Button;


    Start() {    
        this.EndBtn.onClick.AddListener(()=>{
            this.img.gameObject.SetActive(true);
        });
        this.imgBtn.onClick.AddListener(()=>{
            this.img.gameObject.SetActive(false);
        });
        this.img.gameObject.SetActive(false);
    }

}