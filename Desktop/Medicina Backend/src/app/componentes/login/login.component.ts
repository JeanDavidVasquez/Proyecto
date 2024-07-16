import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailChoose: string = '';
  passwordChoose: string = '';

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private loginService: AuthService
  ) {}

  ngOnInit() {

  }

  login(email: string, password: string) {
    return this.loginService.login(email.toString().trim(), password).then(() => {
      alert('Usuario logueado'+ email);
    }).catch(error => {
      alert('Error al loguear usuario: ' + error.message);
    });
  }

  logout(){
    return this.loginService.logout();
  }
}
