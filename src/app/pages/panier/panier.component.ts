import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  plats:any[];
  nbreT:0;
  prixT:0;
  constructor() {
    this.initialisation();
    this.calculTotal();
   }

   annulerPanier(id:number){
     this.plats.splice(id,1);
     console.log(this.plats);
   }

   validerPanier(){

   }

  ngOnInit(): void {
  }

  initialisation(){
    this.plats=JSON.parse(sessionStorage.getItem('panier'));
  }

  calculTotal(){
    this.nbreT=0;
    this.prixT=0;
    this.plats.forEach(element => {
      this.nbreT+=element.quantite;
      this.prixT+=element.prixT;
    });
  }
}
