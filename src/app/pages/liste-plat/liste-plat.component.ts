import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-plat',
  templateUrl: './liste-plat.component.html',
  styleUrls: ['./liste-plat.component.scss']
})
export class ListePlatComponent implements OnInit {
  plats:any[]=JSON.parse(localStorage.getItem('resto')).plats;
  constructor() { }

  ngOnInit(): void {
  }

}
