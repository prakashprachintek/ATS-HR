/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as JobListComponent from './components';

/* Containers */
import * as tablesContainers from './containers';

/* Directives */
import * as tablesDirectives from './directives';

/* Guards */
import * as tablesGuards from './guards';

/* Services */
import * as tablesServices from './services';
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';

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
        MatSelectModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
    ],
    
    declarations: [
        ...tablesContainers.containers,
        ...JobListComponent.components,
        ...tablesDirectives.directives,
    ],
    exports: [...tablesContainers.containers, ...JobListComponent.components],
    providers: [
        DecimalPipe,
        ...tablesServices.services,
        ...tablesGuards.guards,
        ...tablesDirectives.directives,
    ],
})
export class ApplicantsModule {}
