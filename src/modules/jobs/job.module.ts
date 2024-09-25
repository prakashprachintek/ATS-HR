/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as JobListComponent from './components';

/* Containers */
import * as chartsContainers from './containers';

/* Guards */
import * as chartsGuards from './guards';

/* Services */
import * as chartsServices from './services';
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatTooltipModule,
        ClipboardModule,
        MatSelectModule,
        MatIconModule
    ],
    providers: [...chartsServices.services, ...chartsGuards.guards],
    declarations: [...chartsContainers.containers, ...JobListComponent.components],
    exports: [...chartsContainers.containers, ...JobListComponent.components],
})
export class JobsModule {}
