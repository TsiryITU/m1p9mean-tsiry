import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plat-profil',
  templateUrl: './plat-profil.component.html',
  styleUrls: ['./plat-profil.component.scss']
})
export class PlatProfilComponent implements OnInit {
  keywords:any={
    nom:"plat",
    desc:"desc",
    prixA:100,
    prixV:100,
    dispo:1
  }
  constructor() { }

  ngOnInit(): void {
  }

  update(){}

  insert(){}
}
