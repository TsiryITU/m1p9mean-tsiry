import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private url: string = environment.url

  constructor(private http: HttpClient) { }

  commandeResto(id: number) {
    var url = this.url + "/resto/commande/find/" + id;
    console.log(url);
    return this.http.get(url);
  }
}
