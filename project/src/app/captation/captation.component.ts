import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FirebaseService } from './../_services/firebase/firebase.service';

@Component({
  selector: 'app-captation',
  templateUrl: './captation.component.html',
  styleUrls: ['./captation.component.css']
})
export class CaptationComponent implements OnInit {

  private error = '';
  fileList: any[] = [];
  private reference = 'leads'; // hardcoded...modificar
  loading = false;
  reading = false;
  filter = '';
  filterForm: FormGroup;

  // paginação
  numOfDocs = 0;
  numOfPages: number[] = [];
  currentPage = 1;
  pageSize = 5; // hardcoded...modificar
  private firstItemKey: string;
  private lastItemKey: string;
  childKey = 'nome'; // orderByChild('childKey') hardcoded...modificar
  // END_OF paginação


  constructor(
    private service: FirebaseService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
    this.createRange('test');
    this.listFirstPage('test', 'field1', this.pageSize);
  }

  private createForm() {
    this.filterForm = this.formBuilder.group({
      /* nome: [null, Validators.required],
      idade: [null, Validators.required],
      email: [null, Validators.required],
      telefone: [null, Validators.required],
      operadora: [null, Validators.required],
      estado: [null, Validators.required],
      tempo: [null, Validators.required] */
    });
  }

  private createRange(collectionName: string) {
    let collectionSize: number;
    let pages: number;
    let hasLastPage = false;
    this.numOfPages = [];
    this.service.listCollection(collectionName).then(snapshot => {
      collectionSize = snapshot.size; // numChildren();
      pages = collectionSize / this.pageSize;
      hasLastPage = collectionSize % this.pageSize === 0 ? false : true;
      pages += hasLastPage ? 1 : 0;
      for (let i = 1; i <= pages; i++) {
        this.numOfPages.push(i);
      }
    });
  }

  private goToPage(targetPage: number) {
    if (targetPage !== this.currentPage) {
      if (targetPage < this.currentPage) {
        this.listPreviousPage();
      } else {
        this.listNextPage();
      }
      this.currentPage = targetPage;
    }
  }

  previousPage() {
    let targetPage: number;
    if (this.currentPage > 1) {
      targetPage = this.currentPage - 1;
      this.goToPage(targetPage);
    }
  }

  nextPage() {
    let targetPage: number;
    if (this.currentPage < this.numOfPages.length) {
      targetPage = this.currentPage + 1;
      this.goToPage(targetPage);
    }
  }

  listFirstPage(collectionName: string, orderByFilter: string, pageSize: number) {
    this.service.listFirstPage(collectionName, orderByFilter, pageSize)
    .then( documentSnapshots => {
      this.fileList = [];
      documentSnapshots.forEach( doc => {
          // doc.data() is never undefined for query doc snapshots
          const file = {
            key: doc.id,
            val: doc.data()
          };
          this.fileList.push(file);
      });
      this.firstItemKey = this.fileList[0]['key'];
      this.lastItemKey = this.fileList[this.fileList.length - 1]['key'];
      this.currentPage = 1;
    })
    .catch(function(error) {
      console.error('Error reading documents: ', error);
    });
  }

  listPreviousPage() {
    /* this.loading = true;
    this.collectionRef
      .orderByChild(this.childKey)
      .endAt(this.firstItemKey)
      .limitToLast(this.pageSize + 1)
      .once('value')
      .then(snapshot => {
        this.fileList = [];
        snapshot.forEach(childSnapshot => {
          // this.fileList.push(childSnapshot.val());
          this.pushVal(childSnapshot, this.fileList);
        });
        this.loading = false;
        this.fileList.pop(); // não há mais necessidade da referência
        this.firstItemKey = this.fileList[0]['val'][this.childKey];
        this.lastItemKey = this.fileList[this.fileList.length - 1]['val'][
          this.childKey
        ];
      }); */
  }

  listNextPage() {
    /* this.loading = true;
    this.collectionRef
      .orderByChild(this.childKey)
      .startAt(this.lastItemKey)
      .limitToFirst(this.pageSize + 1)
      .once('value')
      .then(snapshot => {
        this.fileList = [];
        snapshot.forEach(childSnapshot => {
          // this.fileList.push(childSnapshot.val());
          this.pushVal(childSnapshot, this.fileList);
        });
        this.loading = false;
        this.fileList.shift(); // não há mais necessidade da referência
        this.firstItemKey = this.fileList[0]['val'][this.childKey];
        this.lastItemKey = this.fileList[this.fileList.length - 1]['val'][
          this.childKey
        ];
      }); */
  }

  listFiles() {
    /* this.loading = true;
    this.collectionRef.once('value').then(snapshot => {
      this.fileList = [];
      snapshot.forEach(childSnapshot => {
        // this.fileList.push(childSnapshot.val());
        this.pushVal(childSnapshot, this.fileList);
      });
      this.loading = false;
    }); */
  }

  filterFileList() {
    if (
      this.fileList.length === 0 ||
      this.filter === undefined ||
      this.filter.trim() === ''
    ) {
      return this.fileList;
    }
    return this.fileList.filter(file => {
      if (file.nome.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0) {
        return true;
      }
      return false;
    });
  }
}
