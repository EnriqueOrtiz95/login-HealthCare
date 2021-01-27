// firebase.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'Doctors';

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_doctors(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  read_doctor() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  update_doctor(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_doctor(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }
}
