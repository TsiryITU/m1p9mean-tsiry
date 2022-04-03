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
    console.log(this.keywords);
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  login(){
    const obs = {
      next: (x) =>{
        if(x.user!=null){
          var user=x.user;
          sessionStorage.setItem("user",user);
          switch(user.types){
          case 1:
            this.route.navigate(['/user-profile']);
            break;
          case 2:
            alert("ok resto");
            break;
          case 3:
            alert("ok livreur");
            break;
          case 4:
            alert("ok client");
            break;
          default:
            alert("there is an error");
          }
        }else{
          alert("profil not found");
        }
      },
      error: (err: Error) => alert(err),
    };
    this.service.login(this.keywords).subscribe(obs);
  }
}
