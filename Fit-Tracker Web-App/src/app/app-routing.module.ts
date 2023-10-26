import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FoodSearchComponent } from './food-search/food-search.component';
import { HistoryComponent } from './history/history.component';
import { HomePage } from './home/home.page';
import { SettingsComponent } from './settings/settings.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { AuthComponent } from './auth/auth.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);
const redirectLoggedToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'home',
    component: HomePage,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'meal_history',
    component: HistoryComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'food',
    component: FoodSearchComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'workouts',
    component: WorkoutsComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'settings',
    component: SettingsComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'setup',
    loadChildren: () => import('./setup/setup.module').then( m => m.SetupPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
