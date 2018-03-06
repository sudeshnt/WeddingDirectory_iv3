import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IService } from '../../services/IService';
import { WizardService } from "../../services/wizard-service";

@IonicPage()
@Component({
  templateUrl: 'item-details-wizard.html',
  providers: [WizardService]
})
export class ItemDetailsPageWizard {

  page: any;
  service: IService;
  params: any = {};

  constructor(public navCtrl: NavController, navParams: NavParams , private wizardService: WizardService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.page = navParams.get('page');
    this.service = navParams.get('service');
    if (this.service) {
      this.params = this.service.prepareParams(this.page, navCtrl);
      this.service.load(this.page).subscribe(snapshot => {
        this.params.data = snapshot;
      });
    } else {
      navCtrl.setRoot("HomePage");
    }
  }
}
