import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import {TablesService} from '../../services/applicant.service'
import swal from 'sweetalert2';
import { DateAdapter } from '@angular/material/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'sb-applicant-update',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './applicant-update.component.html',
    styleUrls: ['applicant-update.component.scss'],
})
export class ApplicantsUpdateComponent implements OnInit {
  private farmerId="";
  update = []
  showAlert = false;
  errorMessage=""
  LoginForm!: FormGroup;
  selectedOptions: string[] = [];
  formatDataLoading = false
  userData:any
  assigneeList = []
  maxDate = new Date();
  languages = new FormControl('');
  languagesList: string[] = ['Kannada', 'English', 'Hindi', 'Telugu', 'Spanish', 'French','Bengali','Russian','Urdu','Japanese','Marathi','German','Tamil','Gujarati','Malayalam','Oriya','Punjabi','Assamese','Maithili','Santali','Konkani','Nepali','Sindhi','Kashmiri','Dogri','Manipuri','Sanskrit','Bodo','Tibetan','Khasi','Mizo - Mizo'];
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,private customerService : TablesService,private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.farmerId = params['id']
    });

    var tempUser = localStorage.getItem('user') || ''
      this.userData = JSON.parse(tempUser)
      let formData = {
        orgId: this.userData[0].org_id
      }
      this.customerService.getAssigneeList(formData).subscribe((res) => {
        this.assigneeList = res.results
      })

    this.LoginForm = this.fb.group({
      firstName:["", Validators.required],
      lastName:["", Validators.required],
      phoneNumber:["", Validators.required],
      applicantType:["", Validators.required],
      skills:[""],
      dob:[""],
      qualification:[""],
      comment:[""],
      reference:[""],
      language:[""],
      status:["", Validators.required],
      lookingForJob:[""],
      assignee:[""],
    })
    this.getData()
  }

  getData() { 
    var formData = {"userId":this.farmerId}
    this.formatDataLoading = true
    this.customerService.getInfo(formData).subscribe((res) => {
      this.update = res.results
      if(this.update.length>0){
        this.LoginForm.controls['firstName'].setValue(this.update[0]['first_name']);
        this.LoginForm.controls['lastName'].setValue(this.update[0]['last_name']);
        this.LoginForm.controls['phoneNumber'].setValue(this.update[0]['phone_number']);
        this.LoginForm.controls['applicantType'].setValue(this.update[0]['applicant_type']);
        this.LoginForm.controls['reference'].setValue(this.update[0]['reference_by']);
        // this.LoginForm.controls['language'].setValue(this.update[0]['language']);
        if(this.update[0]['qualification']!=undefined){
          this.LoginForm.controls['qualification'].setValue(this.update[0]['qualification']);
        }
        this.LoginForm.controls['lookingForJob'].setValue(this.update[0]['looking_for_job']);
        this.LoginForm.controls['dob'].setValue(this.update[0]['dob']);
        this.LoginForm.controls['status'].setValue(this.update[0]['status']);
        this.LoginForm.controls['skills'].setValue(this.update[0]['skills']);
        this.LoginForm.controls['assignee'].setValue(this.update[0]['assignee']);
        if(this.update[0]['comments'] && this.update[0]['comments']['length']>0){
          this.LoginForm.controls['comment'].setValue(this.update[0]['comments'][this.update[0]['comments']['length']-1]['comment']);
        }
      }
      this.formatDataLoading = false
      // this.dataSource = res.users
    })
  }

    userUpdate()  {
      console.log(this.languages.value)
    this.showAlert = true;
    if(!this.LoginForm.valid) {
      this.LoginForm.markAllAsTouched();
      return
    }
    this.LoginForm.value.orgId = this.userData[0].org_id
    this.LoginForm.value.userId = this.userData[0]._id
    this.LoginForm.value.farmerId = this.farmerId
    // this.customerService.userUpdate(this.LoginForm.value).subscribe((res) => {
    //   if(res.status=='success'){
    //     swal.fire('Successfully Updated!', '', 'success')
    //     this.router.navigate(['/applicants']);
    //   }else {
    //     this.errorMessage = res.message
    //     this.showAlert = true;
    //   }
    // })
  }
      
}
