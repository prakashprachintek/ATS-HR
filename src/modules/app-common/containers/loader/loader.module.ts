import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { Route, RouterModule } from '@angular/router';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CommonpipeModule } from 'app/commonpipe/commonpipe.module';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoaderComponent } from './loader.component';

const LoaderComponentRoutes: Route[] = [
  {
    path: '',
    component: LoaderComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    FuseCardModule,
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule,
    MatExpansionModule,
    RouterModule.forChild(LoaderComponentRoutes),
    FuseAlertModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatMomentDateModule,
    CommonpipeModule,
    MatTableModule,
    MatSortModule,
    CommonModule
  ]
})
export class LoaderModule { }
