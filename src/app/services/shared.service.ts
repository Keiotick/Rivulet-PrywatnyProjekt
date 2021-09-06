import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const TOKEN_KEY = 'auth_token';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly fakeBack = "http://192.168.53.158:3000";

  constructor(private http: HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" }),
  };
  
  public saveToken(token: any): void{
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public deleteToken(): void{
    window.localStorage.removeItem(TOKEN_KEY);
  }

  public getToken(): null | any{
    return window.localStorage.getItem(TOKEN_KEY);
  }

  getMarkers(): Observable<any> {
    return this.http.get<any>(this.fakeBack + '/markers', this.httpOptions);
  }

  getCoord(val: any): Observable<any> {
    return this.http.get<any>('https://nominatim.openstreetmap.org/search.php?street='+val+'&city=Olsztyn&country=Poland&format=jsonv2', this.httpOptions);
  }

  newMarker(val: any): Observable<any> {
    return this.http.post<any>(this.fakeBack + '/markers',val, this.httpOptions);
  }

  deleteMarker(val: any): Observable<any> {
    return this.http.delete(this.fakeBack + '/markers/' + val, this.httpOptions);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.fakeBack + '/users', this.httpOptions);
  }
}
