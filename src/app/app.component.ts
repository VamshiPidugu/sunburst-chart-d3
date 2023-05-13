import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  msg: string;
  getMessagePassed(event) {
    this.msg = event;
  }
  data = {
    name: 'Process',
    children: [
      {
        name: 'Energy',
        children: [
          {
            name: 'Electricity',
            children: [
              {
                name: 'Paintlines',
                size: 30,
              },
              {
                name: 'Cutting',
                size: 30,
              },
              {
                name: 'Welding',
                size: 30,
              },
              {
                name: 'Assembly',
                size: 30,
              },
            ],
          },
        ],
      },
      {
        name: 'Resource',
        children: [
          {
            name: 'Diesel',
            children: [
              {
                name: 'Assembly',
                size: 30,
              },
            ],
          },
          {
            name: 'Steam',
            children: [
              {
                name: 'Welding',
                size: 20,
              },
              {
                name: 'Cutting',
                size: 20,
              },
            ],
          },
          {
            name: 'Natural Gas',
            children: [
              {
                name: 'Cutting',
                size: 20,
              },
              {
                name: 'PaintLines',
                size: 30,
              },
            ],
          },
        ],
      },
    ],
  };
}
