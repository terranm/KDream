import { Camera, Canvas, GameObject, Quaternion, Vector3 } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class Yeonmot extends ZepetoScriptBehaviour {

    // public but:Button;
    public cam : Camera;
    // public popUp : GameObject;
    // public no:Button;
    // public closeall : GameObject;

    Start() {
        this.cam = ZepetoPlayers.instance.ZepetoCamera.camera;    // 생성된 플레이어의 카메라 가져오기
        console.log(this.cam);
        console.log('camera setting');
        this.GetComponent<Canvas>().worldCamera = this.cam;
    

    // this.but.onClick.AddListener(() => {
    //     console.log(`누르다 버튼`);
    //     this.popUp.SetActive(true);
    // })
    
    // this.no.onClick.AddListener(() => {
    //     this.popUp.SetActive(false);
    //     this.but.gameObject.SetActive(false);
    //     this.closeall.SetActive(false);
    // })

    }
}