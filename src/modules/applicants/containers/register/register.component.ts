import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {TablesService} from '../../services/applicant.service'
import swal from 'sweetalert2';
import { DateAdapter } from '@angular/material/core';

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
  uploadedFile:any
  togglePanel() {
    this.isRightPanelActive = !this.isRightPanelActive;
  }
  userData:any
  submitted = false
  formSubmitted = false
  assigneeList = []
  languages = new FormControl('');
  languagesList: string[] = ['Kannada', 'English', 'Hindi', 'Telugu', 'Spanish', 'French','Bengali','Russian','Urdu','Japanese','Marathi','German','Tamil','Gujarati','Malayalam','Oriya','Punjabi','Assamese','Maithili','Santali','Konkani','Nepali','Sindhi','Kashmiri','Dogri','Manipuri','Sanskrit','Bodo','Tibetan','Khasi','Mizo - Mizo'];
  maxDate = new Date();
  constructor( private  fb: FormBuilder,private router: Router, private tablesService: TablesService,private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.languagesList.sort()
  }
    ngOnInit(): void {
      var tempUser = localStorage.getItem('user') || ''
      this.userData = JSON.parse(tempUser)
      let formData = {
        orgId: this.userData[0].org_id
      }
      this.tablesService.getAssigneeList(formData).subscribe((res) => {
        this.assigneeList = res.results
      })

      this.LoginForm = this.fb.group({
        firstName:["", Validators.required],
        lastName:[""],
        applicantType:["", Validators.required],
        phoneNumber:["", [Validators.required,Validators.minLength(10)]],
        email:[""],
        skills:[""],
        dob:[""],
        qualification:[""],
        comment:[""],
        reference:[""],
        language:[""],
        lookingForJob:[""],
        assignee:[""],
        location:[""],
      })
    }

    onFileChanged(event: any){
      let af = ['application/pdf'];
        const file = event.target.files[0];
        if (file != undefined) {
            // if (!_.includes(af, file.type)) {
            //   this.fileError = true//show error
            // }else{
              this.uploadedFile = file
            // }
            
          }
    }

    signup() {
      let langValue = ""
      for(var a=0;a<this.languages.value.length;a++){
        langValue += this.languages.value[a]+","
      }
      this.LoginForm.controls['language'].setValue(langValue);
      this.submitted = true
      console.log(this.LoginForm)
      if(!this.LoginForm.valid) {
        this.LoginForm.markAllAsTouched();
        return
      }
      this.formSubmitted = true
      this.LoginForm.value.orgId = this.userData[0].org_id
      this.LoginForm.value.userId = this.userData[0]._id
      if(this.uploadedFile==undefined){
        // this.proceedFurtherSubmit('')
        console.log("===dfdd")
      } else {
        let formData:FormData = new FormData();
        formData.append('uploadFile', this.uploadedFile, this.uploadedFile.name)
        this.tablesService.uploadResume(formData).subscribe((res) => {
          this.proceedFurtherSubmit(res.fileName)
        })
      }
    }

    proceedFurtherSubmit(fileName:any){
      this.LoginForm.value.resume = fileName
      this.tablesService.signup(this.LoginForm.value).subscribe((res) => {
        this.submitted = false
        this.formSubmitted = false
        if(res.status=='success'){
          swal.fire({
            title: 'Success!',
            text: res.message,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })
          this.router.navigate(['/applicants']);
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
