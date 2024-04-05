import { Routes } from '@angular/router';
import { CantonsComponent } from './features/memory/pages/cantons/cantons.component';
import { HomeComponent } from './features/home/pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cantons', component: CantonsComponent },
];
