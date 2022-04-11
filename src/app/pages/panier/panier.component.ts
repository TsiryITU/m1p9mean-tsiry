import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestoService } from 'src/app/service/resto.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  plats: any[];
  nbreT: 0;
  prixT: 0;
  lieu: '';
  frais:number=5000;
  constructor(private service: RestoService,private router:Router) {
    this.initialisation();
    this.calculTotal();
  }

  annulerPanier(id: number) {
    this.plats.splice(id, 1);
    sessionStorage.setItem("panier", JSON.stringify(this.plats));
    this.calculTotal();
  }

  validerPanier() {
    if (this.plats.length > 0) {
      var plat = Array<{ nom: String, quantite: Number,prixA:Number, prixT: Number }>();
      this.plats.forEach(element => {
        let p = {
          nom: element.nom,
          quantite: element.quantite,
          prixA:element.prixA,
          prixT: element.prixT
        }
        plat.push(p);
      });
      var donnee = {
        lieu: this.lieu,
        id_utilisateur:parseInt(sessionStorage.getItem("id")),
        id_restaurant: this.plats[0].id_resto,
        lieu_resto:this.plats[0].lieu_resto,
        frais:this.frais,
        prixT:this.prixT,
        plats: plat
      };
      console.log(donnee);
      const obs = {
        next: (x) => {
          if (x.reponse == "ok") {
            sessionStorage.removeItem("panier");
            this.router.navigate(['/liste-resto']);
          } else {
            alert(x.message);
          }
        },
        error: (err: Error) => alert(err.message),
      };
      this.service.insertPanier(donnee).subscribe(obs);
    }
  }

  ngOnInit(): void {
  }

  initialisation() {
    this.plats = JSON.parse(sessionStorage.getItem('panier'));
  }

  change(id: number) {
    this.plats[id].prixT = this.plats[id].prixU * this.plats[id].quantite;
    sessionStorage.setItem("panier", JSON.stringify(this.plats));
    this.calculTotal();

  }

  calculTotal() {
    this.nbreT = 0;
    this.prixT = 0;
    this.plats.forEach(element => {
      this.nbreT += element.quantite;
      this.prixT += element.prixT+this.frais;
    });
  }
}
