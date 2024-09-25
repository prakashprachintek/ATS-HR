import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service'

@Component({
    selector: 'sb-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    userData:any
    dashboardData = {}
    dataLoading = false
    constructor(private dashboardService : DashboardService,private cd:ChangeDetectorRef) {
        
    }
    ngOnInit() {
        this.getDashboardCount()
    }

    getDashboardCount(){
        var tempUser = localStorage.getItem('user') || ''
        this.userData = JSON.parse(tempUser)
        let formData = {
          orgId: this.userData[0].org_id
        }
        this.dataLoading = true
        this.dashboardService.getDashboard(formData).subscribe(res => {
            console.log("=====res",res)
            this.dashboardData = res.results
            this.cd.detectChanges()
            this.dataLoading = false
            console.log(this.dataLoading,'====',this.dashboardData)
        })
    }
}
