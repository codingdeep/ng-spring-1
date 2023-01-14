import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/service/server.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isCollapsed: boolean = false;
  exclusive: boolean = false;
  constructor(private serverService: ServerService) {
    this.serverService.exclusive.subscribe((res) => {
      this.exclusive = res;
    });
  }
  ngOnInit() {}
}
