import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private url: string = environment.url

  constructor(private http: HttpClient) { }

  insertionLivraison(data:any){
    var url = this.url + "/livraison/insertion";
    console.log(url);
    return this.http.post(url,data);
  }

  commandeResto(id: number) {
    var url = this.url + "/resto/commande/find/" + id;
    return this.http.get(url);
  }

  aLivrer(data:any){
    var url = this.url + "/commande/update";
    console.log(url);
    return this.http.post(url,data);
  }

  commandeLivrer(){
    var url = this.url + "/commande/find/1";
    return this.http.get(url);
  }

  getLivraison(id:string){
    var url = this.url + "/livraison/"+id;
    return this.http.get(url);
  }

  updateLivraison(data:any){
    var url = this.url + "/livraison/update";
    return this.http.post(url,data);
  }
}
