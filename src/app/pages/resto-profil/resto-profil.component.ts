import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestoService } from 'src/app/service/resto.service';

@Component({
  selector: 'app-resto-profil',
  templateUrl: './resto-profil.component.html',
  styleUrls: ['./resto-profil.component.scss']
})
export class RestoProfilComponent implements OnInit {
  keywords: any = {
    id: 1,
    nom: '',
    lieu: ''
  };
  constructor(private service: RestoService, private router: Router) {
    this.initialisation();
  }

  ngOnInit(): void {
  }

  initialisation() {
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
            this.keywords.id = resto._id;
            this.keywords.nom = resto.nom;
            this.keywords.lieu = resto.lieu;
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

  update() {
    const obs = {
      next: (x) => {
        if (x.reponse == "ok") {
          this.router.navigate(['/resto-profil']);
        } else {
          alert(x.message);
        }
      },
      error: (err: Error) => alert(err.message),
    };
    this.service.update(this.keywords).subscribe(obs);
  }
}
