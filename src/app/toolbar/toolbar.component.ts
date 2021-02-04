import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  
  constructor(private router: Router) { }

  atHome: boolean = (this.router.url == "/home" || this.router.url == "/");

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.atHome = (val.url == "/home" || val.url == "/");
      }
    });
  }
}
