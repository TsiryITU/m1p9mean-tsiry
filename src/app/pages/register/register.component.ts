import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username:string='';
  mail:string='';
  mdp:string='';
  constructor(private service:UserService,private router:Router) { }

  ngOnInit() {
  }

  insertClient(){
    var donnee={
      username:this.username,
      mail:this.mail,
      mdp:this.mdp,
      types:4
    };
    const obs = {
      next: (x) => {
        if (x.reponse == "ok") {
          this.router.navigate(['/login']);
        } else {
          alert(x.message);
        }
      },
      error: (err: Error) => alert(err.message),
    };
    this.service.insert(donnee).subscribe(obs);

  }
}
