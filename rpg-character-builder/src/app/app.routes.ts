import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';
import { AboutComponent } from './about/about.component';
import { AbilityRollerComponent } from './ability-roller/ability-roller.component';
import { CharacterBuilderComponent } from './character-builder/character-builder.component';
import { SigninComponent } from './signin/signin.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'classes/:id', component: ClassDetailComponent },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About RPG Character Builder' }
  },
  { path: 'roll/:sides', component: AbilityRollerComponent },
  { path: 'builder', component: CharacterBuilderComponent, canActivate: [authGuard] },
  { path: 'signin', component: SigninComponent }
];
