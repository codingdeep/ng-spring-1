import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/service/server.service';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css'],
})
export class Comp2Component implements OnInit {
  constructor(private serverService: ServerService) {}
  username: string = '';
  ngOnInit(): void {
    console.log('Comp2 Component');
    this.serverService.username.subscribe((res) => {
      this.username = res;
    });
  }

  clicked(element: HTMLInputElement): void {
    const value = element.value;
    this.serverService.username.next(value);
  }
}
