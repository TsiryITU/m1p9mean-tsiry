import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ListeUserComponent } from './pages/liste-user/liste-user.component';
import { RestoProfilComponent } from './pages/resto-profil/resto-profil.component';
import { ListePlatComponent } from './pages/liste-plat/liste-plat.component';
import { PlatProfilComponent } from './pages/plat-profil/plat-profil.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ListeUserComponent,
    RestoProfilComponent,
    ListePlatComponent,
    PlatProfilComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
