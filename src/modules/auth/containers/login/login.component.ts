import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    showAlert = false;
    SignIn!: FormGroup;
    errorMessage=""
    LoginForm!: FormGroup;
    public enabled_modules={
      "applicantsAllowed":false,
      "jobsAllowed":false,
      "dashboardAllowed":false
    }
    constructor(private router: Router, private  fb: FormBuilder,private authService: AuthService) {}
    

    ngOnInit(): void {
      this.LoginForm = this.fb.group({
        userName:["", Validators.required],
        password:["", Validators.required],
      })
      }


      login() {
        if(!this.LoginForm.valid) {
        this.LoginForm.markAllAsTouched();
        this.errorMessage = 'Please enter user name and password'
        return
      }
      this.authService.loginapi(this.LoginForm.value).subscribe((res) => {
        // swal.fire(res.message);
        if(res.status=='success'){
          swal.fire({
            title: 'Success!',
            text: res.message,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })
          localStorage.setItem('user',JSON.stringify(res.results))
          var applicantsAllowed = false
          var jobsAllowed = false
          var dashboardAllowed = false
          var thisTemp = this
          console.log(res.results[0].allowedModules)
          if (res.results && res.results[0].allowedModules) {
              if (res.results[0].allowedModules.dashboard) {
                dashboardAllowed=true;
                thisTemp.enabled_modules.dashboardAllowed= true;
              }
              if (res.results[0].allowedModules.applicants) {
                applicantsAllowed=true;
                thisTemp.enabled_modules.applicantsAllowed= true;
              }
              if (res.results[0].allowedModules.jobs) {
                jobsAllowed=true;
                thisTemp.enabled_modules.jobsAllowed= true;
              }
          }
          localStorage.setItem('enabled_modules',JSON.stringify(thisTemp.enabled_modules))

          if(dashboardAllowed) {
            this.router.navigate(['/dashboard']);
          } else if (applicantsAllowed) {
            this.router.navigate(['/applicants']);
          } else if(jobsAllowed){
            this.router.navigate(['/jobs']);
          }
        }else{
          swal.fire({
            title: 'Error!',
            text: res.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
      })
    }
    signup() {
      this.router.navigate(['/signup']);
    }
}
