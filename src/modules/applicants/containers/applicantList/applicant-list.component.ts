import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { Router } from '@angular/router';
import {TablesService} from '../../services/applicant.service'
import swal from 'sweetalert2';
import moment from 'moment';

export interface PeriodicElement {
    first_name: string;
    last_name:  string ;
    email: string ;
    phone_number: number;
    applicant_type:string;
    assignee:string;
    status:string;
  }
@Component({
    selector: 'sb-applicant-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './applicant-list.component.html',
    styleUrls: ['applicant-list.component.scss'],
})
export class ApplicantsListComponent implements OnInit {
    displayedColumns: string[] = ['first_name','email','phone_number','applicant_type','assignee','status','action'];
    ELEMENT_DATA: PeriodicElement[] = [ ];
    dataSource = this.ELEMENT_DATA;
    userList: any= []
    formatDataLoading = false
    userData:any
    pageSize=10
    currentPage = 0
    totalRecords =100
    title = 'title';
    //Loader variable default true before page load
    loader = true;
    statusFilter="";
    searchText = ""
    selectuserPhNumber = ""
    messageValue = ""
    popUp = false
    assigneeFilter=""
    assigneeList = []
    qualification=""
    applicantType=""
    startDate = ""
    endDate = ""
    maxDate = new Date();
    constructor(private router: Router,private customerService : TablesService,private cd:ChangeDetectorRef) {
    }
    ngOnInit() {
      // this.maxDate = new Date;
        var tempUser = localStorage.getItem('user') || ''
        this.userData = JSON.parse(tempUser)
        let formData = {
          orgId: this.userData[0].org_id
        }
        this.customerService.getAssigneeList(formData).subscribe((res) => {
          this.assigneeList = res.results
        })
        this.getData()
    }

    getData() {
      this.userList = []
      this.dataSource = []
      var formData = {
        orgId:this.userData[0].org_id,
        search:this.searchText,
        pageSize:this.pageSize,
        currentPage:this.currentPage+1,
        assigneeFilter:this.assigneeFilter,
        statusFilter:this.statusFilter,
        qualification:this.qualification,
        applicantType: this.applicantType,
        startDate:this.startDate,
        endDate:this.endDate
      }
      this.formatDataLoading = true
      this.customerService.getDashboard(formData).subscribe((res) => {
        this.userList = res.results
        this.totalRecords = res.total_count
        this.dataSource = res.results
        this.cd.detectChanges()
        this.formatDataLoading = false
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
          case 'first_name':
            return this.compare(a.first_name, b.first_name, isAsc);
          case 'email':
            return this.compare(a.email, b.email, isAsc);
          case 'phone_number':
            return this.compare(a.phone_number, b.phone_number, isAsc);
          case 'applicant_type':
            return this.compare(a.applicant_type, b.applicant_type, isAsc);
          case 'assignee':
            return this.compare(a.assignee, b.assignee, isAsc);
          case 'status':
            return this.compare(a.status, b.status, isAsc);
          default:
            return 0;
        }
      });
    }
      compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
      }
      
      addNewApplicant(){
        this.router.navigate(['/applicants/register']);
      }
        
      apply(){
        this.getData()
        this.iconDropdown()
      }    
      
      public handlePage(e: any) {
        this.currentPage = e.pageIndex
        this.pageSize = e.pageSize
        this.getData()
      }


      filterData() {
        this.getData()
        
      }

      deleteApplicant(element:any){
        swal.fire({
          title: 'Do you want to delete the applicant?',
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
              _id: element._id,
            }
            this.customerService.deleteApplicant(formData).subscribe((res) => {
              swal.fire('Successfully Deleted!', '', 'success')
              this.getData()
            })
          } else if (result.isDenied) {
            // swal.fire('Changes are not saved', '', 'info')
          }
        })
        
      }

      getComments(comments:any){
        if(comments!=undefined){
          return  comments[comments.length-1]['comment']
        } else{
          return "NA"
        }
      }

      selectMessageData(selectMessageData:any){
        this.selectuserPhNumber = selectMessageData;
      }

      sendMessage(){
        if(this.messageValue!=""){
          var formData = {
            phoneNumber: this.selectuserPhNumber,
            messageValue: this.messageValue,
          }
          this.customerService.sendMessage(formData).subscribe((res) => {
            swal.fire('Message sent successfully!', '', 'success')
          })
        }
      }

      iconDropdown() {
        this.popUp = !this.popUp;
      }

      startDatedd(event:any){
        this.startDate = event.target.value
      }

      endDatedd(event:any){
        this.endDate = event.target.value
      }

      downloadReport(){
        var formData = {
          orgId:this.userData[0].org_id,
          search:this.searchText,
          pageSize:this.pageSize,
          currentPage:this.currentPage+1,
          assigneeFilter:this.assigneeFilter,
          statusFilter:this.statusFilter,
          qualification:this.qualification,
          applicantType: this.applicantType,
          startDate:this.startDate,
          endDate:this.endDate
        }
        this.customerService.downloadApplicants(formData).subscribe((res) => {
          var byteArray = new Uint8Array(res.result.file_info.buffer.data);
          var blob = new Blob([byteArray], { type: 'application/' + res.result.file_info.fileType });
          var a = document.createElement('a');
          a.href = window.URL.createObjectURL(blob);;
          a.target = '_blank';
          a.download =  'Applicant List Report'+'.csv';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
      }
      
}
