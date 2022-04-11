import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/service/commande.service';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.scss']
})
export class LivraisonComponent implements OnInit {
  livraisons:any[];
  constructor(private service:CommandeService) {
    this.initialisation();
   }

  ngOnInit(): void {
  }

  initialisation(){
    const obs = {
      next: (x) => {
        if (x.reponse == "ok") {
         this.livraisons=x.livraisons;
         console.log(this.livraisons);
        } else {
          alert(x.message);
        }
      },
      error: (err: Error) => {
        alert(err.message);
      }
    };
    this.service.getLivraison(sessionStorage.getItem("id")).subscribe(obs);
  }

  livrer(id:number,idc:number){
    const obs = {
      next: (x) => {
        if (x.reponse == "ok") {
         this.initialisation();
        } else {
          alert(x.message);
        }
      },
      error: (err: Error) => {
        alert(err.message);
      }
    };
    var donnee={
      id:this.livraisons[id]._id,
      id_commande:this.initialisation[id].commandes[idc].id_commande
    }
    this.service.updateLivraison(donnee).subscribe(obs);
  }

}
