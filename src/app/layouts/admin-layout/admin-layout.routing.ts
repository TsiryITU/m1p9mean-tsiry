import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { ListeUserComponent } from 'src/app/pages/liste-user/liste-user.component';
import { RestoProfilComponent } from 'src/app/pages/resto-profil/resto-profil.component';
import { ListePlatComponent } from 'src/app/pages/liste-plat/liste-plat.component';
import { PlatProfilComponent } from 'src/app/pages/plat-profil/plat-profil.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile/:act', component: UserProfileComponent },
    { path: 'liste-user', component: ListeUserComponent },
    { path: 'resto-profil', component: RestoProfilComponent },
    { path: 'liste-plat', component: ListePlatComponent },
    { path: 'plat-profil/:act', component: PlatProfilComponent },
    { path: 'plat-profil/:act/:id', component: PlatProfilComponent }
];
