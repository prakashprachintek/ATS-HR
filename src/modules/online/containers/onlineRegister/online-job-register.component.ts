import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OnlineService } from '@modules/online/services';
import { take } from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
    selector: 'sb-online-job-register',
    templateUrl: './online-job-register.component.html',
    styleUrls: ['online-job-register.component.scss'],
})
export class OnlineComponent implements OnInit {
    private transactionId="";
    transactionDetails:any
    formatDataLoading = false
    LoginForm!: FormGroup;
    submitted = false
    jobSubmitted = false
    uploadedFile:any
    fileError = false
    constructor(private onlineService: OnlineService,private route: ActivatedRoute,private  fb: FormBuilder) {}
    ngOnInit() {
        this.LoginForm = this.fb.group({
            firstName:["", Validators.required],
            lastName:[""],
            phoneNumber:["", Validators.required],
            email:["", Validators.required],
            applicantType:["",Validators.required],
            skills:["", Validators.required],
          })
          
        this.route.params.subscribe(params => {
            this.transactionId = params['id']
            var formData = {"jobId":this.transactionId}
            this.formatDataLoading = true
            var tempThis = this
            this.onlineService.getJobInfo(formData).subscribe((res) => {
              tempThis.formatDataLoading = false
              this.transactionDetails = res.results;
            })
          })
    }

    onFileChanged(event: any){
      let af = ['application/pdf'];
        const file = event.target.files[0];
        if (file != undefined) {
            // if (!_.includes(af, file.type)) {
            //   this.fileError = true//show error
            // }else{
              this.fileError = false
              this.uploadedFile = file
            // }
          }
    }

    signup() {
        this.submitted = true
        if(!this.LoginForm.valid) {
          this.LoginForm.markAllAsTouched();
          return
        }
        if(this.fileError){
          swal.fire({
            title: 'Error!',
            text: "Please upload valid pdf file",
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          return
        }
        this.LoginForm.value.jobId = this.transactionId
        this.LoginForm.value.orgId = this.transactionDetails[0].org_id
        let formData:FormData = new FormData();
        formData.append('uploadFile', this.uploadedFile, this.uploadedFile.name)
        this.onlineService.uploadResume(formData).subscribe((res) => {
        this.LoginForm.value.resume = res.fileName
          this.onlineService.signup(this.LoginForm.value).subscribe((res) => {
            this.submitted = false
            if(res.status=='success'){
              this.jobSubmitted = true
              swal.fire({
                title: 'Success!',
                text: res.message,
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              })
            }else {
              swal.fire({
                title: 'Error!',
                text: res.message,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            }
          })
        })
      }
}
