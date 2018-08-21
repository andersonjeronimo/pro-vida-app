import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FirebaseService } from './../../_services/firebase/firebase.service';
// import { FirestoreService } from './../../_services/firebase/firestore.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  private documentId = '';
  private subscription: any = null;
  captation = null;
  detailForm: FormGroup;

  constructor(
    private firebase: FirebaseService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.getDocument(params['id']);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getDocument(documentId) {
    this.firebase.getDocumentById('test', documentId).then(
      document => {
        this.captation = document.data();
      });
  }

  private createForm() {
    this.detailForm = this.formBuilder.group({
      campo1: [null, [Validators.required]],
      campo2: [null, [Validators.required]],
      campo3: [null, [Validators.required]]
    });
  }

  onSubmit() {

  }

  verificaCSS(campo) {
    return this.detailForm.get(campo).valid && this.detailForm.get(campo).touched;
  }

}
