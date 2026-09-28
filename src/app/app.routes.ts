import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PropertyDetailComponent } from './features/property-detail/property-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'properties/:slug', component: PropertyDetailComponent },
  { path: '**', redirectTo: '' },
];
