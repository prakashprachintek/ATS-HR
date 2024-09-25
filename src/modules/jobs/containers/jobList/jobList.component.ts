import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnInit } from '@angular/core';
import {JobService} from '../../services/job.service'
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
import {Clipboard} from '@angular/cdk/clipboard';
import swal from 'sweetalert2';

export interface PeriodicElement {
  company_name: string;
  experience_level: string ;
  job_id: string;
  job_link: string;
  job_role: string;
  status: string;

}
@Component({
    selector: 'sb-jobList',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './jobList.component.html',
    styleUrls: ['jobList.component.scss'],
})
export class JobListComponent implements OnInit {
    pageSize=10
    currentPage = 0
    totalRecords =100
    searchText = ''; // The filter input text
    displayedColumns: string[] = ['job_id', 'company_name', 'experience_level', 'job_link','job_role','status','action'];
    ELEMENT_DATA: PeriodicElement[] = [ ];
    dataSource = this.ELEMENT_DATA;
    transactionList: any= []
    formatDataLoading = false
    userData:any
    @Input() public copyText = '';
    constructor(private router: Router, private jobService: JobService,private clipboard: Clipboard,private cd:ChangeDetectorRef) {}
    ngOnInit() {
        this.getJobs()
    }

    getJobs() {
        this.transactionList = []
        this.dataSource = []
        var tempUser = localStorage.getItem('user') || ''
        this.userData = JSON.parse(tempUser)
        var formData = {
          orgId:this.userData[0].org_id,
          search:this.searchText,
          pageSize:this.pageSize,
          currentPage:this.currentPage+1,
         }
        this.formatDataLoading = true
        this.jobService.getDashboard(formData).subscribe((res) => {
            this.formatDataLoading = false
            if(res.results.length>0){
                this.transactionList = res.results
                this.totalRecords = res.total_count
                this.dataSource = res.results
                this.cd.detectChanges()
            }
        })
      }

      sortData(sort: Sort) {
        const data = this.dataSource.slice();
        if (!sort.active || sort.direction === '') {
          this.dataSource = data;
          return;
        }
    
        this.dataSource = data.sort((a, b) => {
          const isAsc = sort.direction === 'asc';
          switch (sort.active) {
            case 'company_name':
              return this.compare(a.company_name, b.company_name, isAsc);
            case 'quantity':
                return this.compare(a.job_id, b.job_id, isAsc);
            default:
              return 0;
          }
        });
      }
    
    compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    filterData() {
      this.getJobs()
    }
    
    addNewJob(){
      this.router.navigate(['/jobs/create']);
    }

    public handlePage(e: any) {
      this.currentPage = e.pageIndex
      this.pageSize = e.pageSize
      this.getJobs()
    }

    shortName(fileName:any){ 
      if (fileName && fileName.length > 12){
        return fileName.substring(0, 25) + '...' 
      } else {
        return fileName
      } 
    }

    closeJob(id:any){
      swal.fire({
        title: 'Do you want to close the job?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
          actions: 'my-actions',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          var formData = {
            _id: id,
          }
          this.jobService.closeJob(formData).subscribe((res) => {
            swal.fire('Successfully Closed!', '', 'success')
            this.getJobs()
          })
        } else if (result.isDenied) {
          // swal.fire('Changes are not saved', '', 'info')
        }
      })
    }
}
