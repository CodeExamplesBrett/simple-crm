import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, getDoc, collectionData, docData, updateDoc, collection, doc, DocumentData, onSnapshot} from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { addDoc } from 'firebase/firestore';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  loading = false;
  userId: string;
  user = new User();
  birthDate: Date;
  
  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  ngOnInit(): void {
  }

  saveUser(){
    this.loading = true;
    // get date timestamp in UNIX format
    this.user.birthDate = this.birthDate.getTime();
    console.log('current user is', this.user)

    const coll = collection(this.firestore, 'users');
    const docRef = addDoc(coll, this.user.toJson()).then((result: any)=>{
      this.loading = false;
      console.log('User added', result);
      
    });
    this.closeDialog();
    
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
