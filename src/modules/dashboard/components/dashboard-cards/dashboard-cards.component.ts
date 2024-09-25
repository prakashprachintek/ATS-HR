import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service'

@Component({
    selector: 'sb-dashboard-cards',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-cards.component.html',
    styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnInit {
    userData:any
    dashboardData = {}
    dataLoading = false
    constructor(private dashboardService : DashboardService) {
        var tempUser = localStorage.getItem('user') || ''
        this.userData = JSON.parse(tempUser)
        let formData = {
          orgId: this.userData[0].org_id
        }
        // this.dataLoading = true
        this.dashboardService.getDashboard(formData).subscribe((res) => {
            this.dashboardData = res.results
            this.dataLoading = true
        })
    }
    ngOnInit() {}
}
