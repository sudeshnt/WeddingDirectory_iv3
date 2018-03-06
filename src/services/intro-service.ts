import { IService } from './IService';
import { Toast } from 'ionic-native';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SpinnerDialog } from 'ionic-native';
import { Network } from 'ionic-native';
import { AppSettings } from './app-settings'

@Injectable()
export class IntroService {

    constructor(public af: AngularFireDatabase) {}

    getData = (): any => {
        return {
          'btnPrev': 'Previous',
          'btnNext': 'Next',
          'btnFinish': 'Finish',
          'items': [
              {   logo: 'assets/images/logo/2.png',
                  title: 'Welcome to our new iOS style theme',
                  description: 'Finished layouts and components for Ionic 3. Ready to use!'

              },
              {
                  logo: 'assets/images/logo/2.png',
                  title: 'For Developers',
                  description: 'Save hours of developing. Tons of funcional components.'
              },
              {
                  logo: 'assets/images/logo/2.png',
                  title: 'For Designers',
                  description: 'Endless possibilities. Combine layouts as you wish.'
              }
          ]
      };
    }

    load(): Observable<any> {
        SpinnerDialog.show(null, "Loading");
        if (AppSettings.IS_FIREBASE_ENABLED) {
            return new Observable(observer => {
                this.af
                    .object('intro')
                    .valueChanges()
                    .subscribe(snapshot => {
                        SpinnerDialog.hide();
                        observer.next(snapshot);
                        observer.complete();
                    }, err => {
                        SpinnerDialog.hide();
                        observer.error([]);
                        observer.complete();
                    });
            });
        } else {
            return new Observable(observer => {
                SpinnerDialog.hide();
                observer.next(this.getData());
                observer.complete();
            });
        }
    };
}
