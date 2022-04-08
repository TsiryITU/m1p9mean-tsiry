import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  keywords:any;
  erreur: string = '';
  constructor(private service: LoginService, private route: Router) {
    this.keywords = {mail:'admin@mail.com', mdp:'admin'};
    sessionStorage.clear();
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  login(){
    console.log(this.keywords);
    const obs = {
      next: (x) =>{
        if(x.reponse=="ok" && x.erreur=="" && x.user!=null){
          var user=x.user;
          sessionStorage.setItem("id",user.id);
          sessionStorage.setItem("username",user.username);
          sessionStorage.setItem("mail",user.mail);
          sessionStorage.setItem("types",user.types);
          switch(user.types){
          case 1:
            this.route.navigate(['/user-profile/1']);
            break;
          case 2:
            this.route.navigate(['/resto-profil']);
            break;
          case 3:
            alert("ok livreur");
            break;
          case 4:
            this.route.navigate(['/liste-resto']);
            break;
          default:
            alert("there is an error");
          }
        }
        else{
          alert("profil not found");
        }
      },
      error: (err: Error) => alert(err.message),
    };
    this.service.login(this.keywords).subscribe(obs);
  }
}
