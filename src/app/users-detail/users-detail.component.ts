import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, getDoc, collectionData, docData, updateDoc, collection, doc, DocumentData, onSnapshot} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnInit {

  constructor(private route:ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }
userId = ''
//This variable used to save the subsrcibed data as a class/model
user: User = new User();
//Observable variable
user_observed$: Observable<DocumentData>



  ngOnInit(): void {
    this.getDocumentID();
    this.getDocumentDetails();
  
  }

getDocumentID(){
    this.route.paramMap.subscribe( paramMap => {
      this.userId = paramMap.get('id');
      console.log('GOT ID', this.userId);
  });
}

getDocumentDetails(){
      const coll = collection(this.firestore, 'users');
      //doc selects the current game document via game id read above from the url
      const docRef = doc(coll, this.userId);
      //observable looks at the changes in this document with docData
      this.user_observed$ = docData(docRef);
      //data is subscribed
      this.user_observed$.subscribe( (user: any) => {
      this.user = new User(user);
      console.log('Retrieved user', this.user);
      });

}

editUserDetails(){
  const dialogUser = this.dialog.open(DialogEditUserComponent);
  // A copy!! from our instance of User is given to the DialogEditUser Component
  dialogUser.componentInstance.user = new User(this.user.toJson());
  dialogUser.componentInstance.userId = this.userId
  
}


editAddressDetails(){
  const dialogAddress = this.dialog.open(DialogEditAddressComponent);
  // A copy!! from our instance of User is given to the DialogEditAddress Component
  dialogAddress.componentInstance.user = new User(this.user.toJson());
  dialogAddress.componentInstance.userId = this.userId;
}




}
