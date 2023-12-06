import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: 'app-account-summary',
    standalone: true,
    templateUrl: './account-summary.component.html',
    styleUrl: './account-summary.component.css',
    imports: [HttpClientModule, RouterOutlet, CommonModule, NavbarComponent]
})
export class AccountSummaryComponent implements OnInit{

  public users:any;
  public customerAcc: any;
  public userList: any=[] ;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router){

  }
  onClickButton(data: any) {
    this.router.navigate(['account-details'],{queryParams:{ account: JSON.stringify(data.accountNumber)}})
  }
  makeTransfer() {
    this.router.navigate(['account-transfer'],{queryParams:{ userId: JSON.stringify(this.customerAcc)}})
  }
  getUser(){
    this.http.get('http://localhost:3000/accounts').subscribe(res=> {
      this.users=res;
      this.getUserList()
    })  
  }
  getUserList(){
    for (let i = 0; i < this.users.length; i++) {
      if(this.customerAcc === this.users[i].userId){
        this.userList.push(this.users[i])
      }
    }
  }
  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.customerAcc=JSON.parse(params['userId']) 
      this.getUser()
    });
    
  }

}
