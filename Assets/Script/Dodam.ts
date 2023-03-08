import { Camera, Canvas, GameObject } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class Dodam extends ZepetoScriptBehaviour {

    public but1:Button;
    public cam : Camera;
    public yes:Button;
    public no1:GameObject;


    Start() {
        this.cam = ZepetoPlayers.instance.ZepetoCamera.camera;    // 생성된 플레이어의 카메라 가져오기
        this.GetComponent<Canvas>().worldCamera = this.cam;
    
    this.yes.onClick.AddListener(() => {
        this.no1.SetActive(true);
    })
    this.but1.onClick.AddListener(() => {
        this.no1.SetActive(false);
    })
    }
}