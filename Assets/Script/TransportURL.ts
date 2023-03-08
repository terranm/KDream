import { Application } from 'UnityEngine';
import { Button } from 'UnityEngine.UI'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class TransportURL extends ZepetoScriptBehaviour {

    private urlBtn : Button;

    public url : string;

    Start() {    
        this.urlBtn = this.gameObject.transform.GetComponent<Button>();

        this.urlBtn.onClick.AddListener(()=>{
            Application.OpenURL("https://www.kdream.or.kr:446/user/index.asp");
        }); 
    }

}