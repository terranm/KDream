import { Collider, GameObject, Quaternion, Vector3 } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class EnterSangdam extends ZepetoScriptBehaviour {

    public targetObjs:GameObject;
    private ojbVecX:number;
    private ojbVecY:number;
    private ojbVecZ:number;
    public UI:GameObject;
    public btn:Button;

    //hitBox의 collider에 닿으면 지정된 위치로 텔레포트하는 로직
        Start () {
        //타겟 오브젝트의 Vector3 값을 저장
        this.ojbVecX = this.targetObjs.transform.position.x;
        this.ojbVecY = this.targetObjs.transform.position.y;
        this.ojbVecZ = this.targetObjs.transform.position.z;
        
        this.btn.onClick.AddListener(() => {
            this.UI.SetActive(false);
            console.log(`button clicked`);
            ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.StopMoving();
            ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.Teleport(new Vector3(this.ojbVecX, this.ojbVecY, this.ojbVecZ), Quaternion.identity);
        })
    }
}