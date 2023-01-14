import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/service/server.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css'],
})
export class Comp1Component implements OnInit {
  username: string = '';

  constructor(private serverService: ServerService) {}

  ngOnInit(): void {
    this.serverService.username.subscribe((res) => {
      this.username = res;
    });
    console.log('Comp1 Component');
  }

  clicked(element: HTMLInputElement) {
    const value = element.value;
    this.serverService.username.next(value);
  }
}
