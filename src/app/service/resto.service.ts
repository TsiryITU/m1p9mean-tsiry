import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestoService {
  private url: string = environment.url
  constructor(private http: HttpClient) { }

  update(data:any){
    var url=this.url+"/resto/update";
    return this.http.post(url, data);
  }

  find(data:any){
    console.log(data);
    var url=this.url+"/resto/find/"+data.id_utilisateur;
    return this.http.get(url);
  }

  insertPlat(data:any){
    var url=this.url+"/resto/plat/insert";
    return this.http.post(url,data);
  }

  updatePlat(data:any){
    var url=this.url+"/resto/plat/update";
    return this.http.post(url,data);
  }

  findPlats(id:number){
    var url=this.url+"/resto/plat/findAll/"+id;
    return this.http.get(url);
  }

  findAll(){
    var url=this.url+"/resto/findAll";
    return this.http.get(url);
  }
}
