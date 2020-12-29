import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutpageComponent } from './components/aboutpage/aboutpage.component';
import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
  { path: 'home', component: HomepageComponent},
  { path: 'about', component: AboutpageComponent},
  { path: '', redirectTo:'/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
