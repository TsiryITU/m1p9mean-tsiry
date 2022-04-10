import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/service/commande.service';

@Component({
  selector: 'app-liste-commande',
  templateUrl: './liste-commande.component.html',
  styleUrls: ['./liste-commande.component.scss']
})
export class ListeCommandeComponent implements OnInit {
  commandes:any[];
  constructor(private service:CommandeService) {
    this.initialisation();
   }

  ngOnInit(): void {
  }

  initialisation(){
    var data=JSON.parse(sessionStorage.getItem("resto"));
    const obs = {
      next: (x) => {
        console.log(x);
        if (x.reponse == "ok") {
          console.log(x.commandes);
          if (x.commandes != null) {
            this.commandes=x.commandes;
          }
        } else {
          alert(x.message);
        }
      },
      error: (err: Error) => {
        alert(err.message);
      }
    };
    this.service.commandeResto(data._id).subscribe(obs);
  }

  livrer(id:number){

  }

}
