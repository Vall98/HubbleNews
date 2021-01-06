import { Component, OnInit } from '@angular/core';
import { ModalsService } from '../services/modals.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  
  constructor(public userService: UserService, private modalsService: ModalsService) { }

  ngOnInit() {
    
  }

  signin(): void {
    this.modalsService.signin();
  }

}
