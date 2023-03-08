import { Camera, Canvas, Collider, Transform } from 'UnityEngine';
import { Button } from 'UnityEngine.UI'
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class sitChair extends ZepetoScriptBehaviour {

    public btn : Button;
    public chairPoint : Transform;

    private cam : Camera;

    Start() {
        this.cam = ZepetoPlayers.instance.ZepetoCamera.camera;    // 생성된 플레이어의 카메라 가져오기
        this.GetComponent<Canvas>().worldCamera = this.cam;

        this.btn.onClick.AddListener(() => {
            this.btn.transform.parent.parent.gameObject.SetActive(false);

            ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.ZepetoAnimator.SetBool("isSit1", true);
            ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.Teleport(this.chairPoint.position, this.chairPoint.rotation);
            // ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.position = this.chairPoint.position;
            // ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.rotation = this.chairPoint.rotation;
        })
    }
}