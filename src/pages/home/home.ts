import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { Sim } from 'ionic-native';
import {CallNumber} from 'ionic-native';
import {RechargePage} from '../recharge/recharge'; 


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[CallNumber]
})

export class HomePage {
  simname: string;
  recharge_code :any;
  USSD:any;
  dialog_balance = "*%23456%23"
  dialog_loan = "%23356%23"
  dialog_hotline = "0777123456"
  dialog_recharge = "*%23123%23"
  dialog_share = ""

  mobitel_balance = "*100%23"
  mobitel_loan = "*%23247%23"
  mobitel_hotline = "1717"
  mobitel_recharge = "*102*"
  mobitel_share= ""
/// Change thesee codes Airtel,Hutch,Etisalat
  Airtel_balance = "*100%23"
  Airtel_loan = "*%23247%23"
  Airtel_hotline = "1717"
  Airtel_recharge = "*102*"
  Airtel_share= ""

  Hutch_balance = "*100%23"
  Hutch_loan = "*%23247%23"
  Hutch_hotline = "1717"
  Hutch_recharge = "*102*"
  Hutch_share= ""

  Etisalat_balance = "*100%23"
  Etisalat_loan = "*%23247%23"
  Etisalat_hotline = "1717"
  Etisalat_recharge = "*102*"
  Etisalat_share= ""

  constructor(private callNumber: CallNumber ,public navCtrl: NavController,private alertCtrl: AlertController) {
    Sim.getSimInfo().then(
      (info) =>
      //console.log('Unable to get sim info: ',info),
     this.simname=info.carrierName,
      (err) => console.log('Unable to get sim info: ', err)
    );   
    Sim.hasReadPermission().then(
  (info) => console.log('Has permission: ', info)
    );

    Sim.requestReadPermission().then(
    () => console.log('Permission granted'),
    () => console.log('Permission denied')
    );
    
  }

Balance(){
     let alert = this.alertCtrl.create({
    title: 'Please Confirm',
    message: 'This service is only for Prepaid customers.Do you still want to check your account balance?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
            this.USSD = this.get_USSD_codes("Balance")
            console.log('checking USSD =>',this.USSD)
            CallNumber.callNumber(this.USSD, true)
                        .then(() => console.log('Launched dialer!'))
                        .catch(() => console.log('Error launching dialer'));
         // window.location.href = 'tel:'+ '*%23456%23';
         console.log('Buy clicked');
        }
      }
    ]
  });
  alert.present();      
}
Recharge(){
   let prompt = this.alertCtrl.create({
      title: 'Enter your recharge card pin ',
      message: "If you are a prepaid customer, please enter your recharge card pin. DO NOT enter the wrong card pin more than twice.",
      inputs: [
        {
          name: 'RechargePin',
          placeholder: 'Pin'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Recharge',
          handler: data => {
            console.log('Saved clicked',data);
            if(!data.RechargePin.trim()){
                        let alert = this.alertCtrl.create({
                        title: 'Ops!',
                        subTitle: 'Pin code cannot be empty. Please enter the pin code from your recharge card. ',
                        buttons: ['Dismiss']
                    });
                    alert.present();
            }else{
                    this.recharge_code = data.RechargePin
                    //this.USSD = this.get_USSD_codes("Recharge")
                    console.log('checking recharge code =>',this.recharge_code)
                    this.USSD = this.get_USSD_codes("Recharge")
                    console.log('checking USSD =>',this.USSD)
                    let recharge_USSD = this.USSD+this.recharge_code+"%23"
                    console.log("recharge ussd code=>",recharge_USSD)
            }
          }
        }
      ]
    });
    prompt.present();
}
Loan(){
         let alert = this.alertCtrl.create({
    title: 'Please Confirm',
    message: 'This service is only for Prepaid customers.Do you still want to get a loan?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
            this.USSD = this.get_USSD_codes("Loan")
            console.log('checking USSD =>',this.USSD)
            CallNumber.callNumber(this.USSD, true)
                        .then(() => console.log('Launched dialer!'))
                        .catch(() => console.log('Error launching dialer'));
         // window.location.href = 'tel:'+ '*%23456%23';
         console.log('Buy clicked');
        }
      }
    ]
  });
  alert.present(); 
}
CustomerCare(){

}
Credit_share(){

}
Contact(){

}
get_USSD_codes(activity){
    switch (activity){
        case "Balance":
            switch (this.simname){
            case 'Dialog':
                return this.dialog_balance;
                
            case 'Mobitel':
                return this.mobitel_balance;
                
            case 'Hutch':
                return this.Hutch_balance;
                
            case 'Airtel':
                return this.Airtel_balance;
                
            case 'Etisalat':
                return this.Etisalat_balance;
                        
            default:
    }
        break

        case "Recharge":
            switch (this.simname){
                case 'Dialog':
                    return this.dialog_recharge;
                    
                case 'Mobitel':
                    return this.mobitel_recharge
                    
                case 'Hutch':
                    return this.Hutch_recharge
                    
                case 'Airtel':
                    return this.Airtel_recharge
                     
                case 'Etisalat':
                    return this.Etisalat_recharge
                               
                default:
    }
        break

        case "Loan":
            switch (this.simname){
            case 'Dialog':
                return this.dialog_loan
                
            case 'Mobitel':
                return this.mobitel_loan
                
            case 'Hutch':
                return this.Hutch_loan
                
            case 'Airtel':
                return this.Airtel_loan
                 
            case 'Etisalat':
                return this.Etisalat_loan
                           
            default:
    }
        break

        case "Call_center":
            switch (this.simname){
            case 'Dialog':
                return this.dialog_hotline
                
            case 'Mobitel':
                return this.mobitel_hotline
                
            case 'Hutch':
                return this.Hutch_hotline
                
            case 'Airtel':
                return this.Airtel_hotline
                 
            case 'Etisalat':
                return this.Etisalat_hotline
                           
            default:
    }
        break

        case "Share":
            switch (this.simname){
            case 'Dialog':
                return this.dialog_share
                
            case 'Mobitel':
                return this.mobitel_share
                
            case 'Hutch':
                return this.Hutch_share
                
            case 'Airtel':
                return this.Airtel_share
                 
            case 'Etisalat':
                return this.Etisalat_share
                           
            default:
    }
        break
    }


}
backgroundColor() {
  //  let color='gray';
  let styles = {
    'background-color':'#efefef'
  };
  return styles;
}
navBarColor() {
  let color;
  switch (this.simname) {
            case 'Dialog':
                color='Dialog'
                break;
            case 'Mobitel':
                color='Mobitel'
                break;
            case 'Hutch':
                color='Hutch'
                break;
            case 'Airtel':
                color='Airtel'
                break; 
            case 'Etisalat':
                color='Etisalat'
                break;           
            default:

        }
   return color;
}
Tittle(){
    let bg_color;
    switch (this.simname) {
            case 'Dialog':
                bg_color='#892d7a'
                break;
            case 'Mobitel':
                bg_color='#00B145'
                break;
            case 'Hutch':
                bg_color='#FF6300'
                break;
            case 'Airtel':
                bg_color='#ED1B24'
                break; 
            case 'Etisalat':
                bg_color='#BDD30F'
                break;           
            default:
        }
    let styles = {
    'font-size':'18px',
    'color':'#ffffff',
    'background-color':bg_color
  };
  return styles;
}
iconColor() {
   let iconcolor;
  switch (this.simname) {
            case 'Dialog':
                iconcolor='#892d7a'
                break;
            case 'Mobitel':
                iconcolor='#00B145'
                break;
            case 'Hutch':
                iconcolor='#FF6300'
                break;
            case 'Airtel':
                iconcolor='#ED1B24'
                break; 
            case 'Etisalat':
                iconcolor='#BDD30F'
                break;           
            default:
        }
  let styles = {
    'color': iconcolor
  };
  return styles;
}
}
