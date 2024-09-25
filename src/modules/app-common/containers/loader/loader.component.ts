import { Component, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loaderObj:any = {}
  constructor() {
   }

  ngOnInit(): void {
      this.loaderObj = {id:'1',type:'Joke',content:'The past, the present, and the future walked into a bar. It was tense.'}
  }

}