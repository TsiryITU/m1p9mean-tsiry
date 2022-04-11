import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestoService } from 'src/app/service/resto.service';

@Component({
  selector: 'app-liste-plat-vente',
  templateUrl: './liste-plat-vente.component.html',
  styleUrls: ['./liste-plat-vente.component.scss']
})
export class ListePlatVenteComponent implements OnInit {
  plats: any[];
  displayStyle = "none";
  nomPlat = '';
  prixV = 0;
  prixT = 0;
  prixA=0;
  prixAT=0;
  nbre = 0;
  id = -1;
  lieu_resto:string='';
  constructor(private route: ActivatedRoute, private service: RestoService) {
    this.initialisation();
  }

  ngOnInit(): void {
  }

  initialisation() {
    const routeParams = this.route.snapshot.paramMap;
    var id = parseInt(routeParams.get('id'));
    this.lieu_resto=routeParams.get('lieu');
    const obs = {
      next: (x) => {
        console.log(x);
        if (x.reponse == "ok") {
          this.plats = x.plats;
        } else {
          alert(x.message);
        }
      },
      error: (err: Error) => alert(err.message),
    };
    this.service.findPlats(id).subscribe(obs);
  }
  openPopup(data: number) {
    this.nomPlat = this.plats[data].nom;
    this.prixV = this.plats[data].prixV;
    this.prixA=this.plats[data].prixA;
    this.id = data;
    this.displayStyle = "block";
    console.log(data);
  }
  closePopup() {
    let donnee = JSON.parse(sessionStorage.getItem("panier"));
    donnee.forEach((element, i) => {
      if (element.id == this.id) {
        donnee.splice(i, 1);
      }
    });
    sessionStorage.setItem("panier", JSON.stringify(donnee));
    this.displayStyle = "none";
  }

  valideCommande() {
    if (this.nbre > 0) {
      const routeParams = this.route.snapshot.paramMap;
      var id = parseInt(routeParams.get('id'));
      if (sessionStorage.getItem("panier") == null) {
        let donnee = [{
          id_resto: id,
          lieu_resto:this.lieu_resto,
          id: this.id,
          nom: this.nomPlat,
          prixU:this.prixV,
          quantite: this.nbre,
          prixT: this.prixT,
          prixA:this.prixAT
        }]
        sessionStorage.setItem("panier", JSON.stringify(donnee));
      } else {
        let donnee = JSON.parse(sessionStorage.getItem("panier"));
        if (donnee[0].id_resto == id) {
          donnee.forEach(element => {
            if (element.id == this.id) {
              element.quantite = this.nbre;
              element.prixT = this.prixT;
              element.prixA=this.prixAT
              sessionStorage.setItem("panier", JSON.stringify(donnee));
              return true;
            }
          });
          donnee.push({
            id_resto: id,
            lieu_resto:this.lieu_resto,
            id: this.id,
            nom: this.nomPlat,
            prixU:this.prixV,
            quantite: this.nbre,
            prixT: this.prixT,
            prixA:this.prixAT
          });
          sessionStorage.setItem("panier", JSON.stringify(donnee));
        } else {
          let donnee = [{
            id_resto: id,
            lieu_resto:this.lieu_resto,
            id: this.id,
            nom: this.nomPlat,
            prixU:this.prixV,
            quantite: this.nbre,
            prixT: this.prixT,
            prixA:this.prixAT
          }]
          sessionStorage.setItem("panier", JSON.stringify(donnee));
        }
      }
    }

    this.displayStyle = "none";
  }

  calculPrix() {
    this.prixT = this.prixV * this.nbre;
    this.prixAT=this.prixA*this.nbre;
  }
}
