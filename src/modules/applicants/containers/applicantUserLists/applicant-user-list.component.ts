import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { Router } from '@angular/router';
import {TablesService} from '../../services/applicant.service'
import swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
// import {SpinnerOverlayService} from '../../../app-common/services/loader.service'

export interface PeriodicElement5 {
    first_name: string;
    last_name:  string ;
    phone: string;
    email: string ;
    applicant_type:string;
    dob:string;
    technical_skills:string
    location:string
  }
@Component({
    selector: 'sb-applicant-user-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './applicant-user-list.component.html',
    styleUrls: ['applicant-user-list.component.scss'],
})
export class ApplicantsUserListComponent implements OnInit {
    displayedColumns: string[] = ['first_name','last_name','phone','email','applicant_type','dob','technical_skills','location','action'];
    ELEMENT_DATA: PeriodicElement5[] = [ ];
    dataSource = new MatTableDataSource<PeriodicElement5>();
    formatDataLoading = false
    userData:any
    pageSize=10
    currentPage = 0
    totalRecords =100
    title = 'title';
    //Loader variable default true before page load
    loader = true;
    village_name: any;
    searchText = ""
    currentStep = 'one'
    csvDataValues:any = []
    apiSubmit = false
    uploadErrorMessage = ""
    uploadError = false
    constructor(private router: Router,private customerService : TablesService) {}
    ngOnInit() {
      // this.spinnerOverlayService.show();

        var tempUser = localStorage.getItem('user') || ''
        this.userData = JSON.parse(tempUser)
    }

    sortData(sort: Sort) {
      const data = this.dataSource.data.slice();
      if (!sort.active || sort.direction === '') {
        this.dataSource.data = data;
        return;
      }
    
      this.dataSource.data = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'first_name':
            return this.compare(a.first_name, b.first_name, isAsc);
          case 'last_name':
            return this.compare(a.last_name, b.last_name, isAsc);
          case 'email':
            return this.compare(a.email, b.email, isAsc);
          case 'phone':
            return this.compare(a.phone, b.phone, isAsc);
          case 'applicant_type':
            return this.compare(a.applicant_type, b.applicant_type, isAsc);
          case 'dob':
            return this.compare(a.dob, b.dob, isAsc);
          default:
            return 0;
        }
      });
    }
      compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
      }
      
      public handlePage(e: any) {
        this.currentPage = e.pageIndex
        this.pageSize = e.pageSize
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
            // var ind = this.dataSource.data.findIndex(a => a.email === element.email)
            // var tt = this.dataSource.data.splice(ind, 1)
            // this.dataSource.data = tt
            swal.fire('Successfully Deleted!', '', 'success')
          } else if (result.isDenied) {
            // swal.fire('Changes are not saved', '', 'info')
          }
        })
        
      }

      parseCsv(csvData: string): string[] {
        const lines: string[] = csvData.split('\n');
        const csvArray: any = lines.map(line => line.split(','));
        return csvArray;
      }

      fileBrowseHandler(files:any) {
        var size = files[0].size / (1024 * 1024)
        if(size>15){
          this.uploadErrorMessage = "The file exceeds the maximum file size limit, please note that the maximum size allowed is 15mb"
          this.uploadError = true
          return
        }else{
          console.log(files[0].type)
          let allowedExtesion = ['application/xls','application/csv','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-excel','text/csv']
          if(allowedExtesion.indexOf(files[0].type)>-1){
            this.uploadError = false
            this.uploadErrorMessage = ""
          }else{
            this.uploadErrorMessage = "Please upload file in csv and excel format"
            this.uploadError = true
            return
          }
        }
        this.currentStep = 'two'
        let reader: FileReader = new FileReader();
        reader.readAsText(files[0]);
        reader.onload = (e) => {
          let csvData: string = reader.result as string;
          const csvArray: string[] = this.parseCsv(csvData);
          for(var a=1;a<csvArray.length;a++){
            if(csvArray[a][0]!=''){
              this.csvDataValues.push({'first_name':csvArray[a][0],'last_name':csvArray[a][1],'phone':csvArray[a][2],'email':csvArray[a][3],'applicant_type':csvArray[a][4],'dob':csvArray[a][5],'technical_skills':csvArray[a][6],'location':csvArray[a][7]}) 
            }
          }
        this.totalRecords = this.csvDataValues.length
        this.dataSource.data = this.csvDataValues
        }
      }

      submitData(){
        var formData = {
          orgId : this.userData[0].org_id,
          data : this.dataSource.data
        }
        this.apiSubmit = true
        this.customerService.createApplicants(formData).subscribe((res) => {
          swal.fire(res.message, '', 'success')
          this.apiSubmit = false
          this.router.navigate(['/applicants']);
        })
      }

      downloadReport(){
        this.customerService.downloadSampleFile({}).subscribe((res) => {
          window.open(res.url, '_blank');
        })
      }
}
