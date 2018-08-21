import { Injectable } from '@angular/core';

declare var firebase: any;

@Injectable()
export class FirebaseService {
  private firestoreDb: any = null;

  private config = {
    apiKey: 'AIzaSyCtCe80cEDs3nkSSXxQOTE20TMgj821m8I',
    authDomain: 'login-app-c236c.firebaseapp.com',
    databaseURL: 'https://login-app-c236c.firebaseio.com',
    projectId: 'login-app-c236c',
    storageBucket: 'login-app-c236c.appspot.com',
    messagingSenderId: '668624930690'
  };
  // private provider: any;
  constructor() {
    firebase.initializeApp(this.config);
    this.firestoreDb = firebase.firestore();
  }

  saveCurrentUser(user: any) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }

  removeCurrentUser() {
    sessionStorage.removeItem('currentUser');
  }

  signOut() {
    firebase.auth().signOut();
    this.removeCurrentUser();
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  }

  // FirestoreDB
  // firestore database
  saveDocument(document: any, collectionName) {
    return this.firestoreDb.collection(collectionName).add(document);
  }

  listCollection(collectionName) {
    return this.firestoreDb
      .collection(collectionName)
      .get(); /* .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
    }); */
  }

  listFirstPage(collectionName: string, orderByFilter: string, pageSize: number) {
    const first = this.firestoreDb
      .collection(collectionName)
      .orderBy(orderByFilter)
      .limit(pageSize);

    return first.get(); /* .then(function(documentSnapshots) {
      // Get the last visible document
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      // console.log('last', lastVisible);

      // Construct a new query starting at this document,
      // get the next 25 cities.
      const next = this.firestoreDb
        .collection(collectionName)
        .orderBy(orderByFilter)
        .startAfter(lastVisible)
        .limit(pageSize);
    }); */
  }

  listCollectionByField(collectionName, docField, operator, value) {
    return (
      this.firestoreDb
        .collection(collectionName)
        // .where("capital", "==", true)
        .where(docField, operator, value)
        .get()
    );
    /* .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    }); */
  }

  getDocumentById(collectionName, id) {
    return this.firestoreDb
      .collection(collectionName)
      .doc(id)
      .get();
  }

  updateDocument(collectionName, id, document: any) {
    const docRef = this.firestoreDb.collection(collectionName).doc(id);
    return docRef.update(document);
  }

  deleteDocument(collectionName, id) {
    return this.firestoreDb
      .collection(collectionName)
      .doc(id)
      .delete();
  }
}
