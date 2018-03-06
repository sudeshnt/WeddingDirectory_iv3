import { IService } from './IService';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Toast } from 'ionic-native';
import { Observable } from 'rxjs/Observable';
import { SpinnerDialog } from 'ionic-native';
import { Network } from 'ionic-native';
import { Subject } from 'rxjs/Subject';
import { AppSettings } from './app-settings';

@Injectable()
export class MenuService implements IService {

    constructor(public af: AngularFireDatabase) {}

    getId = ():string => 'menu';

    getTitle = ():string => 'WeddingFair';

    getAllThemes = (): Array<any> => {
      return [
        {
          "title" : "List Views",
          "theme"  : "listViews",
          "icon" : "icon-format-align-justify",
          "listView" : true,
          "component": "",
          "singlePage":false
        },
        {"title" : "Parallax", "theme"  : "parallax",  "icon" : "icon-format-line-spacing", "listView" : false, "component":"", "singlePage":false},
        {"title" : "Login Pages", "theme"  : "login",  "icon" : "icon-lock-open-outline", "listView" : false, "component":"", "singlePage":false},
        {"title" : "Register Pages", "theme"  : "register",  "icon" : "icon-comment-account", "listView" : false, "component":"", "singlePage":false},
        {"title" : "Image Gallery", "theme"  : "imageGallery",  "icon" : "icon-apps", "listView" : false, "component":"", "singlePage":false},
        {"title" : "Splash Screen", "theme"  : "splashScreens",  "icon" : "icon-logout", "listView" : false, "component":"", "singlePage":false},
        {"title" : "Check Boxes", "theme"  : "checkBoxes",  "icon" : "icon-checkbox-marked", "listView" : false, "component":"", "singlePage":false},
        {"title" : "Search Bars", "theme"  : "searchBars",  "icon" : "icon-magnify", "listView" : false, "component":"", "singlePage":false},
        {"title" : "Typo + small components", "theme"  : "textViews",  "icon" : "icon-tumblr", "listView" : false, "component":"", "singlePage":false},
        {"title" : "Wizard", "theme"  : "wizard",  "icon" : "icon-cellphone-settings", "listView" : false, "component":"", "singlePage":false},
        {"title" : "Spinner", "theme"  : "spinner",  "icon" : "icon-image-filter-tilt-shift", "listView" : false, "component":"", "singlePage":false},
        {"title" : "Tabs", "theme"  : "tabs",  "icon" : "icon-view-array", "listView" : false, "component":"", "singlePage":false},
        {"title" : "Maps", "theme"  : "maps",  "icon" : "icon-google-maps", "listView" : false, "component":"", "singlePage":false},
        {"title" : "QRCode", "theme"  : "qrcode",  "icon" : "icon-qrcode", "listView" : false, "component":"", "singlePage":false},
        {"title" : "Radio Button", "theme"  : "radioButton",  "icon" : "icon-radiobox-marked", "listView" : false, "component":"", "singlePage":false},
        {"title" : "Range", "theme"  : "range",  "icon" : "icon-toggle-switch-off", "listView" : false, "component":"", "singlePage":false},
        {"title" : "Toggle", "theme"  : "toggle",  "icon" : "icon-toggle-switch", "listView" : false, "component":"", "singlePage":false},
        {"title" : "Select", "theme"  : "select",  "icon" : "icon-menu-down", "listView" : true, "component":"", "singlePage":false},
        {"title" : "Action Sheet", "theme"  : "actionSheet",  "icon" : "icon-dots-horizontal", "listView" : false, "component":"", "singlePage":false}
      ];
    };

    getDataForTheme = () => {
      return {
        "background": "../assets/images/background/14.jpg",
        "image": "../assets/images/logo/1.png",
        "title": "WeddingFair",
        "description": "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt"
      };
    };

    getEventsForTheme = (menuItem: any): any => {
      return {};
    };

    prepareParams = (item: any) => {
      return {
        title: item.title,
        data: {},
        events: this.getEventsForTheme(item)
      };
    };

    load(item: any): Observable<any> {
      SpinnerDialog.show(null, "Loading");
      if (AppSettings.IS_FIREBASE_ENABLED) {
        return new Observable(observer => {
          this.af
            .object('menu')
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
          observer.next(this.getDataForTheme());
          observer.complete();
        });
      }
    }
}


