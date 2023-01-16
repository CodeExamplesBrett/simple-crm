import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, getDoc, collectionData, docData, updateDoc, collection, doc, DocumentData, onSnapshot} from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { addDoc } from 'firebase/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  userId: string;

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogEditUserComponent>) { }

  user: User;

  loading = false;
  birthDate: Date;


  ngOnInit(): void {
    console.log('me user', this.userId)
  }

  closeDialog(){
    this.dialogRef.close();
  }

  updateUser(){
    this.loading = true;
    const coll = collection(this.firestore, 'users');

    const docRef = doc(coll, this.userId);
    updateDoc(docRef, this.user.toJson()).then((result: any)=>{
      this.loading = false;
      console.log('User updated', result);
    });
    this.closeDialog();
  }

}
