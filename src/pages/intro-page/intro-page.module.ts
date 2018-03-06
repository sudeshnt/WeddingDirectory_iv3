import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntroPage } from './intro-page';

import { WizardLayout1Module } from '../../components/wizard/layout-1/wizard-layout-1.module';
import { WizardLayout2Module } from '../../components/wizard/layout-2/wizard-layout-2.module';
import { WizardLayout3Module } from '../../components/wizard/layout-3/wizard-layout-3.module';

@NgModule({
    declarations: [
        IntroPage,
    ],
    imports: [
        IonicPageModule.forChild(IntroPage),
        WizardLayout1Module, WizardLayout2Module, WizardLayout3Module
    ],
    exports: [
        IntroPage
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class IntroPageModule { }
