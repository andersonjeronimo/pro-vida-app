import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// formulário
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from './../_services/alert/alert.service';
import { FirebaseService } from './../_services/firebase/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = false;
  testForm: FormGroup;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService
  ) { }

  public logout () {
    this.alertService.success('Logout efetuado com sucesso!', true);
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.testForm = this.formBuilder.group({
      campo1: [null, [Validators.required]],
      campo2: [null, [Validators.required]],
      campo3: [null, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.testForm.valid) {
      this.cadastrar(
        this.testForm.value.campo1,
        this.testForm.value.campo2,
        this.testForm.value.campo3
      );
      this.alertService.success('Cadastro no Firestore efetuado com sucesso.', true);
    } else {
      this.alertService.error('Preencher todos os campos.');
    }
  }

  private cadastrar(c1: String, c2: String, c3: String) {
    const registro = {
      field1: c1,
      field2: c2,
      field3: c3
    };
    this.firebase.saveDocument(registro, 'test')
    .then(docRef => {
      this.alertService.success('Document written with ID: ' + docRef.id);
    })
    .catch( error => {
      this.alertService.error('Error adding document: ' + error);
    });
  }

  verificaCSS(campo) {
    return this.testForm.get(campo).valid && this.testForm.get(campo).touched;
  }
}

