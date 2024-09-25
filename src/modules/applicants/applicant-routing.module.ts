/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { ApplicantsModule } from './applicant.module';

/* Containers */
import * as tablesContainers from './containers';

/* Guards */
import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [tablesGuards.TablesGuard],
        component: tablesContainers.ApplicantsListComponent,
        data: {
            title: 'Applicants',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Applicants',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'register',
        canActivate: [tablesGuards.TablesGuard],
        component: tablesContainers.RegisterComponent,
        data: {
            title: 'Applicants',
            breadcrumbs: [
                {
                    text: 'Applicants',
                    link: '/applicants',
                },
                {
                    text: 'Add Applicants',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'applicant-details/:id',
        canActivate: [tablesGuards.TablesGuard],
        component: tablesContainers.ApplicantsDetailsComponent,
        data: {
            title: 'Applicants',
            breadcrumbs: [
                {
                    text: 'Applicants',
                    link: '/applicants',
                },
                {
                    text: 'Applicants Details',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'applicant-update/:id',
        canActivate: [tablesGuards.TablesGuard],
        component: tablesContainers.ApplicantsUpdateComponent,
        data: {
            title: 'Applicants',
            breadcrumbs: [
                {
                    text: 'Applicants',
                    link: '/applicants',
                },
                {
                    text: 'Update Applicants',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'applicant-user-data',
        canActivate: [tablesGuards.TablesGuard],
        component: tablesContainers.ApplicantsUserListComponent,
        data: {
            title: 'Applicants',
            breadcrumbs: [
                {
                    text: 'Applicants',
                    link: '/applicants',
                },
                {
                    text: 'Applicants Data',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
    imports: [ApplicantsModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ApplicantsRoutingModule {}
