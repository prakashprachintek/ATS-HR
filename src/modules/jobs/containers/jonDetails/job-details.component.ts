import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service'
import moment from 'moment';

@Component({
    selector: 'sb-job-details',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './job-details.component.html',
    styleUrls: ['job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
    private transactionId="";
    transactionDetails:any
    formatDataLoading = false
    constructor(private router: Router,private jobService : JobService,private route: ActivatedRoute) {}
    ngOnInit() {
      this.route.params.subscribe(params => {
        this.transactionId = params['id']
        var formData = {"jobId":this.transactionId}
        this.formatDataLoading = true
        var tempThis = this
        this.jobService.getJobInfo(formData).subscribe((res) => {
          tempThis.formatDataLoading = false
          this.transactionDetails = res.results;
        })
      });
    }

    downloadReport(){
      var formData = {
        jobId:this.transactionId
       }
      this.jobService.downloadJobDetails(formData).subscribe((res) => {
        var byteArray = new Uint8Array(res.result.file_info.buffer.data);
        var blob = new Blob([byteArray], { type: 'application/' + res.result.file_info.fileType });
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);;
        a.target = '_blank';
        a.download =  'Job Details Report'+'.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
     })
    }

    shortName(fileName:any){ 
      if (fileName && fileName.length > 40){
        return fileName.substring(0, 50) + '...' 
      } else {
        return fileName
      } 
    }

    dateFormat(dtValue:any){
      return moment(dtValue).format('DD/MM/YYYY')
    }
}
