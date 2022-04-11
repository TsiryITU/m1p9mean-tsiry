import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestoService } from 'src/app/service/resto.service';

@Component({
  selector: 'app-liste-resto',
  templateUrl: './liste-resto.component.html',
  styleUrls: ['./liste-resto.component.scss']
})
export class ListeRestoComponent implements OnInit {
  restos:any[];
  constructor(private router:Router,private service:RestoService) {
    this.initialisation();
   }

  ngOnInit(): void {
  }

  initialisation(){
    const obs = {
      next: (x) => {
        console.log(x);
        if (x.reponse == "ok") {
          this.restos=x.restos;
        } else {
          alert(x.message);
        }
      },
      error: (err: Error) => {
        alert(err.message);
      }
    };
    this.service.findAll().subscribe(obs);
  }

  voirPlat(id:number){
    this.router.navigate(['/liste-plat/'+this.restos[id]._id+'/'+this.restos[id].lieu]);
  }
}
