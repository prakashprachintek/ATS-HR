import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service'
import { ActivatedRoute, Router } from '@angular/router';

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
    constructor(private dashboardService : DashboardService,private cd:ChangeDetectorRef,private router: Router,private activatedRoute: ActivatedRoute) {
        
    }
    ngOnInit() {
        localStorage.removeItem('applicantType')
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
            this.dashboardData = res.results
            this.cd.detectChanges()
            this.dataLoading = false
        })
    }

    redirect(type:any){
        localStorage.setItem('applicantType',type)
        this.router.navigate(['/applicants'], { state: { prevPage: this.router.url },relativeTo: this.activatedRoute });
    }
}
