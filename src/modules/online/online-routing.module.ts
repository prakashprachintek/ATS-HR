/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { OnlineModule } from './online.module';

/* Containers */
import * as onlineContainers from './containers';

/* Guards */
import * as utilityGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: 'register-job/:id',
        canActivate: [],
        component: onlineContainers.OnlineComponent,
    },
];

@NgModule({
    imports: [OnlineModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class OnlineRoutingModule {}
