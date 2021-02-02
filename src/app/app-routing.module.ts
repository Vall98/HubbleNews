import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { IssComponent } from './iss/iss.component';
import { NewsdetailsComponent } from './newsdetails/newsdetails.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'newsdetails', component: NewsdetailsComponent },
  { path: 'iss', component: IssComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, anchorScrolling: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
