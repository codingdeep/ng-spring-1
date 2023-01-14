import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerService } from 'src/app/service/server.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit, OnDestroy {
  constructor(private serverService: ServerService) {}
  username: string = '';
  ngOnInit(): void {
    console.log('ng oninit');
    this.serverService.exclusive.next(true);
    this.serverService.username.subscribe((res) => (this.username = res));
  }
  ngOnDestroy() {
    this.serverService.exclusive.next(false);
  }
}
