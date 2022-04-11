import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestoService } from 'src/app/service/resto.service';
import { UserService } from 'src/app/service/user.service';
import { ListeUserComponent } from '../liste-user/liste-user.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  username: string = sessionStorage.getItem("username");
  roles: any[] = [{
    "v": 1,
    "d": "admin"
  }, {
    "v": 2,
    "d": "restaurant"
  }, {
    "v": 3,
    "d": "livreur"
  }, {
    "v": 4,
    "d": "client"
  }];
  act:number=1;
  types: number = parseInt(sessionStorage.getItem("types"));
  keywords: any = {
    username: this.username,
    mail: sessionStorage.getItem("mail"),
    mdp: "",
    types: this.types
  };

  initialisation() {
    if (this.types == 1) {
      const routeParams = this.route.snapshot.paramMap;
      const act = Number(routeParams.get('act'));
      switch (act) {
        case 1:
          this.keywords = {
            username: this.username,
            mail: sessionStorage.getItem("mail"),
            mdp: "",
            types: this.types
          };
          break;
        case 2:
          this.keywords = {
            username: "",
            mail: "",
            mdp: "",
            types: 1
          };
          break;
        case 3:
          var u = JSON.parse(sessionStorage.getItem("updateUser"));
          this.keywords = {
            username: u.username,
            mail: u.mail,
            mdp: "",
            types: u.types
          }
          break;
      }
      this.act=act;
    }
  }

  constructor(private route: ActivatedRoute, private service: UserService, private router: Router,private serviceResto:RestoService) {
    this.initialisation();
  }

  ngOnInit() {

  }

  modif() {
    var userUpdate = JSON.parse(sessionStorage.getItem("updateUser"));
    var donnee = {
      id: userUpdate._id,
      username: this.keywords.username,
      mail: this.keywords.mail,
      mdp: this.keywords.mdp,
      types: this.keywords.types
    }
    console.log(donnee);
    const obs = {
      next: (x) => {
        if (x.reponse == "ok") {
          this.router.navigate(['/liste-user']);
        } else {
          alert(x.message);
        }
      },
      error: (err: Error) => alert(err.message),
    };
    this.service.update(donnee).subscribe(obs);
  }

  update() {
    var donnee = {
      id: sessionStorage.getItem("id"),
      username: this.keywords.username,
      mail: this.keywords.mail,
      mdp: this.keywords.mdp,
      types: this.keywords.types
    }
    const obs = {
      next: (x) => {
        if (x.reponse == "ok") {
          sessionStorage.setItem("id", donnee.id);
          sessionStorage.setItem("username", donnee.username);
          sessionStorage.setItem("mail", donnee.mail);
          sessionStorage.setItem("types", donnee.types);
        } else {
          alert(x.message);
        }
      },
      error: (err: Error) => alert(err.message),
    };
    this.service.update(donnee).subscribe(obs);
  }

  insert() {
    if(this.keywords.types!=2){
      const obs = {
        next: (x) => {
          if (x.reponse == "ok") {
            this.router.navigate(['/liste-user']);
          } else {
            alert(x.message);
          }
        },
        error: (err: Error) => alert(err.message),
      };
      this.service.insert(this.keywords).subscribe(obs);
    }
    else{
      const obs = {
        next: (x) => {
          if (x.reponse == "ok") {
            this.router.navigate(['/liste-user']);
          } else {
            alert(x.message);
          }
        },
        error: (err: Error) => alert(err.message),
      };
      this.serviceResto.insert(this.keywords).subscribe(obs);
    }
  }
}
