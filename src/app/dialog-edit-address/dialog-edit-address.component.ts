import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, getDoc, collectionData, docData, updateDoc, collection, doc, DocumentData, onSnapshot} from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { addDoc } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
    userId: string;
    user: User;

    loading = false;


  constructor(private route:ActivatedRoute, private firestore: Firestore, public dialogRef: MatDialogRef<DialogEditAddressComponent>) { }

  ngOnInit(): void {
    console.log('the id', this.userId)
  }

  updateUserAddress(){
    //this.getDocumentID();


    this.loading = true;
    const coll = collection(this.firestore, 'users');

    const docRef = doc(coll, this.userId);
    updateDoc(docRef, this.user.toJson()).then((result: any)=>{
      this.loading = false;
      console.log('User updated', result);
    });
    this.closeDialog();
  }


  closeDialog(){
    this.dialogRef.close();
  }

}
