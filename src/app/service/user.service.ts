import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = environment.url
  constructor(private http: HttpClient) { }

  update(data: any) {
    var url = this.url + "/user/update";
    return this.http.post(url, data);
  }

  insert(data: any) {
    var url='';
    if (data.types != 2) {
      url = this.url + "/user/insert";
      
    } else {
      url=this.url+"resto/insert";
    }
    return this.http.post(url, data);
  }

  findAll() {
    var url = this.url + "/user/findAll";
    return this.http.get(url);
  }

  findLivreur(){
    var url = this.url + "/user/find/livreur";
    return this.http.get(url);
  }
}
