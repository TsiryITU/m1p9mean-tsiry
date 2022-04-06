import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
var r: RouteInfo[];
switch (parseInt(sessionStorage.getItem("types"))) {
  case 1:
    r = [
      { path: '/user-profile/1', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '' },
      { path: '/user-profile/2', title: 'Insert user', icon: 'ni-single-02 text-yellow', class: '' },
      { path: '/liste-user', title: 'User liste', icon: 'ni-single-02 text-yellow', class: '' },
    ];
    break;
  case 2:
    r=[
      { path: '/user-profile/1', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '' },
      { path: '/resto-profil', title: 'Restaurant profile', icon: 'ni-box-2  text-yellow', class: '' },
      { path: '/liste-plat', title: 'Liste plats', icon: 'ni-bullet-list-67  text-yellow', class: '' },
      { path: '/plat-profil', title: 'Plat', icon: 'ni-bullet-list-67  text-yellow', class: '' },
    ];
    break;
}

export const ROUTES: RouteInfo[] = r;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
