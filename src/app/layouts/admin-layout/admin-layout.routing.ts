import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { ListeUserComponent } from 'src/app/pages/liste-user/liste-user.component';
import { RestoProfilComponent } from 'src/app/pages/resto-profil/resto-profil.component';
import { ListePlatComponent } from 'src/app/pages/liste-plat/liste-plat.component';
import { PlatProfilComponent } from 'src/app/pages/plat-profil/plat-profil.component';
import { ListeRestoComponent } from 'src/app/pages/liste-resto/liste-resto.component';
import { ListePlatVenteComponent } from 'src/app/pages/liste-plat-vente/liste-plat-vente.component';
import { PanierComponent } from 'src/app/pages/panier/panier.component';
import { ListeCommandeComponent } from 'src/app/pages/liste-commande/liste-commande.component';
import { ListeCommandeLivreComponent } from 'src/app/pages/liste-commande-livre/liste-commande-livre.component';
import { LivraisonComponent } from 'src/app/pages/livraison/livraison.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile/:act', component: UserProfileComponent },
    { path: 'liste-user', component: ListeUserComponent },
    { path: 'resto-profil', component: RestoProfilComponent },
    { path: 'liste-plat', component: ListePlatComponent },
    { path: 'plat-profil/:act', component: PlatProfilComponent },
    { path: 'plat-profil/:act/:id', component: PlatProfilComponent },
    { path: 'liste-resto', component: ListeRestoComponent },
    { path: 'liste-plat/:id/:lieu', component: ListePlatVenteComponent },
    { path: 'panier', component: PanierComponent },
    { path: 'commande/resto', component: ListeCommandeComponent },
    { path: 'commande/admin', component: ListeCommandeLivreComponent },
    { path: 'livraison', component: LivraisonComponent },
];
