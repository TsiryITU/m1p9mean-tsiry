import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/service/commande.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-liste-commande-livre',
  templateUrl: './liste-commande-livre.component.html',
  styleUrls: ['./liste-commande-livre.component.scss']
})
export class ListeCommandeLivreComponent implements OnInit {
  commandes: any[];
  livreurs: any[];
  commandesLivrer: any[] = [];
  commandesALivrer: any[];
  indiceLivreur: number = 0;
  constructor(private serviceCommande: CommandeService, private serviceUser: UserService) {
    this.getCommandes();
    this.getLivreur();
  }

  ngOnInit(): void {
  }

  // annuler(id:number){
  //   this.commandesLivrer.splice(id,1);
  // }

  valider() {
    var c = [];
    console.log(this.commandesLivrer);
    this.commandesLivrer.forEach(e => {
      let p=[];
      e.plats.forEach(plat=>{
        let pl={
          nom:plat.nom,
          quantite:plat.quantite
        };
        p.push(pl);
      });
      var commande = {
        id_commande: e._id,
        lieu:e.lieu,
        etat:0,
        plats:p
      }
      c.push(commande);
    });
    var donnee = {
      id_utilisateur: this.livreurs[this.indiceLivreur]._id,
      commandes: c
    }
    const obs = {
      next: (x) => {
        if (x.reponse == "ok") {
          this.getCommandes();
          this.getLivreur();
        } else {
          alert(x.message);
        }
      },
      error: (err: Error) => {
        alert(err.message);
      }
    };
    this.serviceCommande.insertionLivraison(donnee).subscribe(obs);
  }

  livrer(id: number) {
    this.commandesLivrer.push(this.commandesALivrer[id]);
    this.commandesALivrer.splice(id, 1);
  }

  getCommandes() {
    const obs = {
      next: (x) => {
        if (x.reponse == "ok") {
          this.commandes = x.commandes;
          this.commandesALivrer = this.commandes;
          this.commandesLivrer=[];
        } else {
          alert(x.message);
        }
      },
      error: (err: Error) => {
        alert(err.message);
      }
    };
    this.serviceCommande.commandeLivrer().subscribe(obs);
  }

  getLivreur() {
    const obs = {
      next: (x) => {
        if (x.reponse == "ok") {
          this.livreurs = x.users;
        } else {
          alert(x.message);
        }
      },
      error: (err: Error) => {
        alert(err.message);
      }
    };
    this.serviceUser.findLivreur().subscribe(obs);
  }

  changeLivreur() {
    this.commandesLivrer = [];
    this.commandesALivrer = this.commandes;
  }
}
