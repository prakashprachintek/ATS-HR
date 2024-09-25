import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service'
import swal from 'sweetalert2';

@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {
  LoginForm!: FormGroup;
  selectedOptions: string[] = [];
  isRightPanelActive = false;
  togglePanel() {
    this.isRightPanelActive = !this.isRightPanelActive;
  }
  userData:any
  constructor( private  fb: FormBuilder,private router: Router, private authService: AuthService) {}
   
    ngOnInit(): void {
      this.LoginForm = this.fb.group({
        firstName:["", Validators.required],
        lastName:[""],
        phoneNumber:["", Validators.required],
        village:["", Validators.required],
        taluka:["", Validators.required],
        district:["", Validators.required]
      })
      }




      signup() {
        if(!this.LoginForm.valid) {
          this.LoginForm.markAllAsTouched();
          return
        }
        var tempUser = localStorage.getItem('user') || ''
        this.userData = JSON.parse(tempUser)
        this.LoginForm.value.orgId = this.userData[0].org_id
        this.LoginForm.value.userId = this.userData[0]._id
        console.log(this.LoginForm.value)
        this.authService.signup(this.LoginForm.value).subscribe((res) => {
          if(res.status=='success'){
            swal.fire({
              title: 'Success!',
              text: res.message,
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            })
            this.router.navigate(['/farmers']);
          }else {
            swal.fire({
              title: 'Error!',
              text: res.message,
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }
        })
      }
}
