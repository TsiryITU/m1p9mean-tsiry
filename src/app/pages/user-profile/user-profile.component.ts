import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ListeUserComponent } from '../liste-user/liste-user.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @ViewChild(ListeUserComponent) listeUser;
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
  types: number = parseInt(sessionStorage.getItem("types"));
  keywords: any={
    username: this.username,
    mail: sessionStorage.getItem("mail"),
    mdp: "",
    types: this.types
  };

  initialisation(){
    if (this.types == 1) {
      const routeParams = this.route.snapshot.paramMap;
      const act = Number(routeParams.get('act'));
      switch(act){
        case 1:
          this.keywords= {
            username: this.username,
            mail: sessionStorage.getItem("mail"),
            mdp: "",
            types: this.types
          };
        break;
        case 2:
          this.keywords= {
            username: "",
            mail: "",
            mdp: "",
            types: 1
          };
        break;
        case 3:
          const u=this.listeUser;
          this.keywords={
            username: u.donnee.username,
            mail: u.donnee.mail,
            mdp: "",
            types: u.donnee.types
          }
          break;
      }
      return act;
    }
  }

  constructor(private route: ActivatedRoute,private service:UserService,private router: Router) {
   
  }

  ngOnInit() {
    this.initialisation();
  }

  modif(){
    var donnee={
      id:this.listeUser.donnee._id,
      username:this.keywords.username,
      mail:this.keywords.mail,
      mdp:this.keywords.mdp,
      types:this.keywords.types
    }
    const obs = {
      next: (x) =>{
        if(x.response=="ok"){
          this.router.navigate(['/liste-user']);
        }else{
          alert(x.message);
        }
      },
      error: (err: Error) => alert(err.message),
    };
    this.service.update(donnee).subscribe(obs);
  }

  update() {
    var donnee={
      id:sessionStorage.getItem("id"),
      username:this.keywords.username,
      mail:this.keywords.mail,
      mdp:this.keywords.mdp,
      types:this.keywords.types
    }
    const obs = {
      next: (x) =>{
        if(x.response=="ok"){
          sessionStorage.setItem("id",donnee.id);
          sessionStorage.setItem("username",donnee.username);
          sessionStorage.setItem("mail",donnee.mail);
          sessionStorage.setItem("types",donnee.types);
        }else{
          alert(x.message);
        }
      },
      error: (err: Error) => alert(err.message),
    };
    this.service.update(donnee).subscribe(obs);
  }

  insert(){
    const obs = {
      next: (x) =>{
        if(x.response=="ok"){
          this.router.navigate(['/liste-user']);
        }else{
          alert(x.message);
        }
      },
      error: (err: Error) => alert(err.message),
    };
    this.service.insert(this.keywords).subscribe(obs);
  }
}
