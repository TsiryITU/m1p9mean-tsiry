import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.scss']
})
export class ListeUserComponent implements OnInit {
  @Input() donnee:any;

  liste: Array<{ id: string, username: string, mail: string, types: number, type: string }> = [];
  constructor(private service: UserService,private router: Router) {
    const obs = {
      next: (x) => {
        if (x.reponse == "ok") {
          x.users.forEach(u => {
            switch (u.types) {
              case 1:
                u.type = "admin";
                break;
              case 2:
                u.type = "restaurant";
                break;
              case 3:
                u.type = "livreur";
                break;
              case 4:
                u.type = "client";
                break;
            }
            this.liste.push(u);
          },
          console.log(this.liste));
        } else {
          alert(x.message);
        }
      },
      error: (err: Error) => {
        console.log(err)
      }
    };
    this.service.findAll().subscribe(obs);

  }

  update(indice:number){
    this.donnee=this.liste[indice];
    this.router.navigate(["/user-profile/3"]);
  }

  ngOnInit(): void {
  }

}
