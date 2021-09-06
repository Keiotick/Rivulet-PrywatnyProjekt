import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: SharedService) { }

  isLogin:boolean;
  incorrectPassword:boolean;
  login:string;
  password:string;
  role:null|any;

  ngOnInit(): void {
    this.incorrectPassword = false;
    if(this.service.getToken() != null){
      this.isLogin = true;
    }
    else this.isLogin = false;
    this.role = this.service.getToken();
  }

  logout():void{
    this.service.deleteToken();
    this.role = null;
    this.isLogin = false;
  }

  checkUser(): void{
    if(this.login !=null && this.password !=null)
    {
      this.incorrectPassword = false;
      this.service.getUsers().subscribe((res: any) => {
        for (const c of res) {
          if(this.login == c.login){
            if(this.password == c.password){
              this.isLogin = true;
              this.service.saveToken(c.role);
              alert("Zalogowano");
              this.ngOnInit();
            }
            else{
              this.incorrectPassword = true;
            }
            break;
          }
        }
        if(this.incorrectPassword){
          alert("Podano nieprawidłowe hasło")
        }
        else if(this.isLogin == false){
          alert("Nie znaleziono podanego uzytkownika")
        }
      });
    }
    else{alert("Proszę wypełnić wszystkie pola")}
  }
    

}
