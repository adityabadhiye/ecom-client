import { Component, OnInit } from '@angular/core';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  progressRef: NgProgressRef;
  constructor(
    private progress: NgProgress
  ) {
    this.progressRef = progress.ref('myProgress');
  }

  ngOnInit(): void {
    this.progressRef.start();
    setInterval(() => {
      this.progressRef.complete();
    }, 500);
  }
}
