import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestoService } from 'src/app/service/resto.service';

@Component({
  selector: 'app-liste-plat',
  templateUrl: './liste-plat.component.html',
  styleUrls: ['./liste-plat.component.scss']
})
export class ListePlatComponent implements OnInit {
  plats:any[];
  constructor(private service:RestoService,private route:Router) { 
    this.initialisation();
  }

  ngOnInit(): void {
  }

  update(id:number){
    this.route.navigate(['/plat-profil/update/'+id]);
  }

  initialisation(){
    sessionStorage.removeItem("resto");
    var donnee = {
      id_utilisateur: parseInt(sessionStorage.getItem("id"))
    };
    const obs = {
      next: (x) => {
        console.log(x);
        if (x.reponse == "ok") {
          if (x.resto != null) {
            var resto = x.resto;
            this.plats=resto.plats;
            sessionStorage.setItem("resto",JSON.stringify(resto));
            return true;
          }
          return false;
        } else {
          console.log(x);
          alert(x.message);
          return false;
        }
      },
      error: (err: Error) => {
        alert(err.message);
        return false;
      }
    };
    this.service.find(donnee).subscribe(obs);
  }
}
