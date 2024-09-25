/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as onlineComponents from './components';

/* Containers */
import * as onlineContainers from './containers';

/* Guards */
import * as onlineGuards from './guards';

/* Services */
import * as onlineServices from './services';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule
    ],
    providers: [...onlineServices.services, ...onlineGuards.guards],
    declarations: [...onlineContainers.containers, ...onlineComponents.components],
    exports: [...onlineContainers.containers, ...onlineComponents.components],
})
export class OnlineModule {}
