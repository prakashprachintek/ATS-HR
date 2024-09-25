import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {JobService} from '../../services/job.service'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
    selector: 'sb-createJob',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './createJob.component.html',
    styleUrls: ['createJob.component.scss'],
})
export class CreateJobComponent implements OnInit {
  LoginForm!: FormGroup;
  isRightPanelActive = false;
  togglePanel() {
    this.isRightPanelActive = !this.isRightPanelActive;
  }
  userData:any
  submitted = false
    constructor(private fb: FormBuilder,private router: Router, private jobService: JobService) {}
    ngOnInit() {
      this.LoginForm = this.fb.group({
        companyName:["", Validators.required],
        logo:[""],
        shortCode:["", Validators.required],
        jobDescriptions:[""],
        jobRole:["", Validators.required],
        experienceLevel:["", Validators.required]
      })
    }

    createJob() {
      this.submitted = true;
      console.log(this.LoginForm)
      if(!this.LoginForm.valid) {
        this.LoginForm.markAllAsTouched();
        return
      }
      var tempUser = localStorage.getItem('user') || ''
      this.userData = JSON.parse(tempUser)
      this.LoginForm.value.orgId = this.userData[0].org_id
      this.LoginForm.value.userId = this.userData[0]._id
      this.jobService.createJob(this.LoginForm.value).subscribe((res) => {
        if(res.status=='success'){
          swal.fire({
            title: 'Success!',
            text: res.message,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })
          this.router.navigate(['/jobs']);
        }else {
          swal.fire({
            title: 'Failed',
            text: res.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          })
        }
      })
    }

    cancelJob(){
      this.submitted = false;
      this.LoginForm.reset()
    }
    
}
