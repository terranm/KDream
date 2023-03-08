import { GameObject } from 'UnityEngine'
import { Button, Text } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
export default class TicketSystem extends ZepetoScriptBehaviour {

    public UI : GameObject;
    public UITicket1 : GameObject;
    public UITicket2 : GameObject;
    public UITicket3 : GameObject;
    public UITicket4 : GameObject;
    public UITicket5 : GameObject;
    public opneBtn : Button;
    public closeBtn : Button;
    private isOpen : boolean;
    public ticket1 : Button;
    public ticket2 : Button;
    public ticket3 : Button;
    public ticket4 : Button;
    public ticket5 : Button;

    private ticketCnt : number;

    public openMapBtn : Button;
    public closeMapBtn : Button;
    public map : GameObject;
    private isMapOpen : boolean;

    public Roulette : GameObject;

    Start() {
        this.ticketCnt = 0;
        this.isOpen = false;
        this.isMapOpen = false;
        // console.log("11111111111111111")
        this.opneBtn.onClick.AddListener(() => {
            if(this.isOpen == true){
                this.UI.SetActive(false);
                this.isOpen = false;
            }else if(this.isOpen == false){
                this.UI.SetActive(true);
                this.isOpen = true;
            }
        })
        // console.log("222222222222222")
        this.closeBtn.onClick.AddListener(()=>{
            if(this.isOpen == true){
                this.UI.SetActive(false);
                this.isOpen = false;
            }
        });
        // console.log("333333333333")

        this.opneBtn.GetComponentInChildren<Text>().text = this.ticketCnt.toString() + "/5";

        this.ticket1.onClick.AddListener(() => {
            this.UITicket1.SetActive(false);
            this.TicketCheck();
        })
        this.ticket2.onClick.AddListener(() => {
            this.UITicket2.SetActive(false);
            this.TicketCheck();
        })
        this.ticket3.onClick.AddListener(() => {
            this.UITicket3.SetActive(false);
            this.TicketCheck();
        })
        this.ticket4.onClick.AddListener(() => {
            this.UITicket4.SetActive(false);
            this.TicketCheck();
        })
        this.ticket5.onClick.AddListener(() => {
            this.UITicket5.SetActive(false);
            this.TicketCheck();
        })

        this.openMapBtn.onClick.AddListener(() => {
            if(this.isMapOpen == true){
                this.map.SetActive(false);
                this.isMapOpen = false;
            }else if(this.isMapOpen == false){
                this.map.SetActive(true);
                this.isMapOpen = true;
            }
        })
        this.closeMapBtn.onClick.AddListener(()=>{
            if(this.isMapOpen == true){
                this.map.SetActive(false);
                this.isMapOpen = false;
            }
        });
    }

    private TicketCheck(){
        this.ticketCnt++;
        this.opneBtn.GetComponentInChildren<Text>().text = this.ticketCnt.toString() + "/5";

        if (this.ticketCnt >= 5){
            this.Roulette.SetActive(true);
        }
    }
}