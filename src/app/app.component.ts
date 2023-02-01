import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'simple-crm';

  openSidenav: boolean;

  public href: string = ""

  myadd: string;

  constructor(private route:ActivatedRoute, public router: Router, public ls: LoginService) { }

  ngOnInit(): void {
    this.ls.openSidenav = true;



    // this.href = this.router.url;
    // console.log("the router", this.router.url);

    // this.route.url.subscribe(url =>{
    //   if(url.toString().includes("login") || url.toString().includes("signin")){
    //     this.openSidenav = false; 
    //     console.log('yes', this.openSidenav);
    //   }
    //   else {
    //     this.openSidenav = true;
    //     console.log('no', this.openSidenav);
    //   }
    // });

    // this.route.url.subscribe(url => {
    //   this.myadd = url.toString()
    //   console.log("myAdd", this.myadd)
    // });
  
  }


}
