import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from './../_services/alert/alert.service';
import { FirebaseService } from './../_services/firebase/firebase.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  returnUrl: string;
  // formulário
  loginForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firebase: FirebaseService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // reset login status
    this.firebase.signOut();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login(this.loginForm.value.email, this.loginForm.value.password);
    } else {
      this.alertService.error(
        'Email informado é inválido ou senha não possui no mínimo 6 caracteres.'
      );
    }
  }

  private login(email: string, password: string) {
    this.loading = true;
    this.firebase
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        const user = data; // .json();
        if (user && user.refreshToken) {
          this.firebase.saveCurrentUser(user);
          this.alertService.success('Login efetuado com sucesso', true);
          this.router.navigate(['/']);
        } else {
          // this.firebase.removeCurrentUser();
          this.alertService.error('Erro no processo de login');
          this.router.navigate(['/login']);
        }
      })
      .catch(error => {
        this.alertService.error(error);
        this.loading = false;
        this.router.navigate(['/login']);
      });
  }

  verificaCSS(campo) {
    return this.loginForm.get(campo).valid && this.loginForm.get(campo).touched;
  }
}

