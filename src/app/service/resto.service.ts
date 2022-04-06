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
}