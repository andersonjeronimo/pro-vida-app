import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from './../_services/alert/alert.service';
import { FirebaseService } from './../_services/firebase/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;
  returnUrl: string;
  // formulário
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password1: [null, [Validators.required, Validators.minLength(6)]],
      password2: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password1 === this.registerForm.value.password2) {
        this.register(this.registerForm.value.email, this.registerForm.value.password1);
      } else {
        this.alertService.error('Senhas informadas não são iguais.');
      }
    } else {
      this.alertService.error('Email informado é inválido ou senha não possui no mínimo 6 caracteres.');
    }
  }

  private register(email: string, password: string) {
    this.loading = true;
    this.firebase
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.alertService.success('Cadastro efetuado com sucesso', true);
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.alertService.error(error);
        this.loading = false;
        this.router.navigate(['/login']);
      });
  }

  verificaCSS(campo) {
    return this.registerForm.get(campo).valid && this.registerForm.get(campo).touched;
  }



}

