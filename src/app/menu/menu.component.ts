import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ModalsService } from '../services/modals.service';
import { MusicService } from '../services/music.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private modalsService: ModalsService, public userService: UserService, private musicService: MusicService, public menu: MenuController) { }

  music: number = this.musicService.musicVolume * 100;

  ngOnInit() {}

  signin(): void {
    this.modalsService.signin();
  }

  musicChange() {
    this.musicService.changeMusicVolume(this.music);
  }
}
