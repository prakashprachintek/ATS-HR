import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartsService } from '../../services/job.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'sb-transaction-update',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './transaction-update.component.html',
    styleUrls: ['transaction-update.component.scss'],
})
export class TransactionUpdateComponent implements OnInit {
  private transactionId="";
  update = []
  showAlert = false;
  errorMessage=""
  upadateTransactionForm!: FormGroup;
  selectedOptions: string[] = [];
   formatDataLoading = false
   soldOut = ''
   userData:any
    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,private customerService : ChartsService) {}
    ngOnInit() {
      this.route.params.subscribe(params => {
        this.transactionId = params['id']
      });
      this.upadateTransactionForm = this.fb.group({
        cropName:["", Validators.required],
        amount:["", Validators.required],
         quantity:["", Validators.required], 
         soldOut:["", Validators.required], 
      })
      this.getData()
    }

    getData() { 
      var formData = {"transcationId":this.transactionId}
      this.formatDataLoading = true
      this.customerService.getTransactionsInfo(formData).subscribe((res) => {
        this.update = res.results
          if(this.update.length>0){
            this.upadateTransactionForm.controls['cropName'].setValue(this.update[0]['crop_name']);
          }
          if(this.update.length>0){
            this.upadateTransactionForm.controls['quantity'].setValue(this.update[0]['quantity']);
          }
          if(this.update.length>0){
            this.upadateTransactionForm.controls['amount'].setValue(this.update[0]['amount']);
          }
          if(this.update.length>0){
            var soldOut = ''
            if(this.update[0]['status'] == 'Completed'){
              soldOut='yes'
            }else{
            soldOut='no'
          }
            this.upadateTransactionForm.controls['soldOut'].setValue(soldOut);
          }
          this.formatDataLoading = false
      })
     }

     userUpdate()  {
      this.showAlert = true;
      if(!this.upadateTransactionForm.valid) {
        this.upadateTransactionForm.markAllAsTouched();
        return
      }
      var tempUser = localStorage.getItem('user') || ''
      this.userData = JSON.parse(tempUser)
      this.upadateTransactionForm.value.orgId = this.userData[0].org_id
      this.upadateTransactionForm.value.userId = this.userData[0]._id
      this.upadateTransactionForm.value.transcationId = this.userData[0].transcationId
      this.customerService.updateTransaction(this.upadateTransactionForm.value).subscribe((res) => {
        if(res.status=='success'){
          this.router.navigate(['/transactions']);
        }else {
          this.errorMessage = res.message
          this.showAlert = true;
        }
      })
    }
      
}
