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
  constructor(private service: RestoService,private router:Router) {
    this.initialisation();
    this.calculTotal();
  }

  annulerPanier(id: number) {
    this.plats.splice(id, 1);
    console.log(this.plats);
    sessionStorage.setItem("panier", JSON.stringify(this.plats));
    this.calculTotal();
  }

  validerPanier() {
    if (this.plats.length > 0) {
      var plat = Array<{ nom: String, quantite: Number, prixT: Number }>();
      this.plats.forEach(element => {
        let p = {
          nom: element.nom,
          quantite: element.nbre,
          prixT: element.prixT
        }
        plat.push(p);
      });
      var donnee = {
        lieu: this.lieu,
        id_restaurant: this.plats[0].id_restaurant,
        plats: plat
      };
      const obs = {
        next: (x) => {
          if (x.response == "ok") {
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
      this.prixT += element.prixT;
    });
  }
}
