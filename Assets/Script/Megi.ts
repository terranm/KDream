import { Camera, Canvas, GameObject } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class Megi extends ZepetoScriptBehaviour {

    public but1:Button;
    public but2:Button;
    public but3:Button;
    public cam : Camera;
    public yes:Button;
    public no1:GameObject;
    public no2:GameObject;
    public no3:GameObject;
    // public active : Button;


    Start() {
        this.cam = ZepetoPlayers.instance.ZepetoCamera.camera;    // 생성된 플레이어의 카메라 가져오기
        console.log(this.cam);
        console.log('camera setting');
        this.GetComponent<Canvas>().worldCamera = this.cam;
        // this.yes.gameObject.SetActive(false);

    // this.active.onClick.AddListener(() => {
    //     this.yes.gameObject.SetActive(true);
    // })
    
    this.yes.onClick.AddListener(() => {
        console.log(`누르다 버튼`);
        this.no1.SetActive(true);
        this.yes.gameObject.SetActive(false);
    })
    this.but1.onClick.AddListener(() => {
        this.no1.SetActive(false);
        this.no2.SetActive(true);
    })
    this.but2.onClick.AddListener(() => {
        this.no2.SetActive(false);
        this.no3.SetActive(true);
    })
    this.but3.onClick.AddListener(() => {
        this.no3.SetActive(false);
    })
    }
}