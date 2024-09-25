/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { JobsModule } from './job.module';

/* Containers */
import * as chartsContainers from './containers';

/* Guards */
import * as chartsGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [chartsGuards.ChartsGuard],
        component: chartsContainers.JobListComponent,
        data: {
            title: 'Share Jobs',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Share Jobs',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'create',
        canActivate: [chartsGuards.ChartsGuard],
        component: chartsContainers.CreateJobComponent,
        data: {
            title: 'Create Job',
            breadcrumbs: [
                {
                    text: 'Jobs',
                    link: '/jobs',
                },
                {
                    text: 'Create Job',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'job-details/:id',
        canActivate: [chartsGuards.ChartsGuard],
        component: chartsContainers.JobDetailsComponent,
        data: {
            title: 'Jobs',
            breadcrumbs: [
                {
                    text: 'Jobs',
                    link: '/jobs',
                },
                {
                    text: 'Jobs Details',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    // {
    //     path: 'register_job/:id',
    //     canActivate: [],
    //     component: chartsContainers.TransactionUpdateComponent,
    //     data: {
    //         title: 'Jo',
    //         breadcrumbs: [
    //             {
    //                 text: 'Transactions',
    //                 link: '/transactions',
    //             },
    //             {
    //                 text: 'Update Transaction',
    //                 active: true,
    //             },
    //         ],
    //     } as SBRouteData,
    // },
];

@NgModule({
    imports: [JobsModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class JobsRoutingModule {}
