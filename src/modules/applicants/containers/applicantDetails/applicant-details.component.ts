import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {TablesService} from '../../services/applicant.service'
import moment from 'moment';

export interface PeriodicElement2 {
  first_name: string;
}

@Component({
    selector: 'sb-applicant-details',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './applicant-details.component.html',
    styleUrls: ['applicant-details.component.scss'],
})
export class ApplicantsDetailsComponent implements OnInit {
    private userId="";
    ELEMENT_DATA: PeriodicElement2[] = [ ];
    userDetails: any = [];
    // userDetails:ArrayType[] = []
    formatDataLoading = false
    users: any;
    constructor(private router: Router,private customerService : TablesService,private route: ActivatedRoute) {}
    ngOnInit() {
      this.route.params.subscribe(params => {
        this.userId = params['id']
        var formData = {"userId":this.userId}
        this.formatDataLoading = true
        var tempThis = this
        this.customerService.getUserDetails(formData).subscribe((res) => {
          tempThis.formatDataLoading = false
          this.userDetails = res.results;
        })
      });
      
    }

    getData() {
        
      }
    
      downloadResume(resumeName:any){
        var formData = {"resume":resumeName}
        this.customerService.downloadResume(formData).subscribe((res) => {
          window.open(res.url, '_blank');
        })
      }

      dateFormat(){
        return moment().format('DD/MM/YYYY')
      }

        
}
