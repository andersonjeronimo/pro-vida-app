import { Injectable } from '@angular/core';

declare var firestore: any;

@Injectable()
export class FirestoreService {
  private firestoreDb: any;

  private config = {
    apiKey: 'AIzaSyCtCe80cEDs3nkSSXxQOTE20TMgj821m8I',
    authDomain: 'login-app-c236c.firebaseapp.com',
    databaseURL: 'https://login-app-c236c.firebaseio.com',
    projectId: 'login-app-c236c',
    storageBucket: 'login-app-c236c.appspot.com',
    messagingSenderId: '668624930690'
  };

  constructor() {
    firestore.initializeApp(this.config);
    this.firestoreDb = firestore.firestore();
  }


}
