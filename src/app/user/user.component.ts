import { Component, OnInit } from '@angular/core';
import { Firestore, getDoc, collectionData, docData, updateDoc, collection, doc, DocumentData, onSnapshot} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  //new user created from class
  //user = new User();
  

  constructor(public dialog: MatDialog, private firestore: Firestore) { }
  allUsers_observed$: Observable<any>
  allUsers = [];

  ngOnInit(): void {
    this.getUsers();
  }


  getUsers(){
    //collection selects the relevant firebase collection
    const coll = collection(this.firestore, 'users');
    //observable observes changes in all documents in the collection--- all selected with --- idField:'id'
    // idField:'id' ---  for details without the id field
    // idField:'customIdName' ---  for details with the id field & document ID
    this.allUsers_observed$ = collectionData(coll,{idField:'customIdName'});
    //subscribe the observed documentt
    this.allUsers_observed$.subscribe((user) => {
      //copy the documents to the array above "allUsers"
      this.allUsers = user;
      console.log(this.allUsers);
      });
    }


  openDialog(){
      this.dialog.open(DialogAddUserComponent);
  }
}



