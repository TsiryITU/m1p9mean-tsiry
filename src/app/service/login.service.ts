import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  erreur: string = '';
  private url: string = environment.url

  constructor(private http: HttpClient) { 
   
  }

  login(data: any) {
    var url=`${this.url}/user/login`;
    return this.http.post(url, data);
  }

}
