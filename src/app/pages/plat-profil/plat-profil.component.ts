import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestoService } from 'src/app/service/resto.service';

@Component({
  selector: 'app-plat-profil',
  templateUrl: './plat-profil.component.html',
  styleUrls: ['./plat-profil.component.scss']
})
export class PlatProfilComponent implements OnInit {
  keywords:any={
    nom:"plat",
    desc:"desc",
    prixA:100,
    prixV:100,
    dispo:1
  }
  action:number;
  constructor(private service:RestoService,private route:ActivatedRoute,private router:Router) {
    this.initialisation();
   }

  ngOnInit(): void {
  }

  initialisation(){
    const routeParams = this.route.snapshot.paramMap;
    const act = routeParams.get('act');
    var resto=JSON.parse(sessionStorage.getItem('resto'));
    switch(act){
      case "insert":
        this.keywords={
          id_utilisation:resto._id,
          nom:"",
          desc:"",
          prixA:0,
          prixV:0,
          dispo:1
        }
        this.action= 1;
        break;
      case "update":
        var id=parseInt(routeParams.get('id'));
        this.keywords={
          id_utilisation:resto._id,
          id:id,
          nom:resto.plats[id].nom,
          desc:resto.plats[id].desc,
          prixA:resto.plats[id].prixA,
          prixV:resto.plats[id].prixV,
          dispo:resto.plats[id].dispo
        }
        this.action= 2;
        break;
    }
  }

  update(){
    const obs = {
      next: (x) =>{
        if(x.response=="ok"){
          this.router.navigate(['/liste-plat']);
        }else{
          alert(x.message);
        }
      },
      error: (err: Error) => alert(err.message),
    };
    this.service.update(this.keywords).subscribe(obs);
  }

  insert(){
    const obs = {
      next: (x) =>{
        if(x.response=="ok"){
          this.router.navigate(['/liste-plat']);
        }else{
          alert(x.message);
        }
      },
      error: (err: Error) => alert(err.message),
    };
    this.service.insertPlat(this.keywords).subscribe(obs);
  }
}
