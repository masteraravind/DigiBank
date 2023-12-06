import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import { Transaction } from '../transaction'
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
@Component({
    standalone: true,
    selector: 'app-account-details',
    templateUrl: './account-details.component.html',
    styleUrls: ['./account-details.component.css'],
    imports: [HttpClientModule, RouterOutlet, CommonModule, NavbarComponent,MatPaginatorModule,MatTableModule]
})
export class AccountDetailsComponent implements OnInit {
  public users:any;
  public txn2:any;
  public dataSource = new MatTableDataSource<Transaction>();
  customerAcc: any;
  userDetails:any;
  public userData:any;
  transactionList: any=[];
  transaction: any;
  public showTable: boolean = false;
displayedColumns: Iterable<string> | undefined;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router,private location: Location){

  }
  // constructor(private route: ActivatedRoute) {}
  getTransaction() {
    this.http.get('http://localhost:3000/transactions').subscribe(res=> {
      
      this.transaction=res;
      console.log(this.transaction)
      for (let i = 0; i < this.transaction.length; i++) {
        if(this.customerAcc === this.transaction[i].accountNumber){
          this.transactionList.push(this.transaction[i]) 
        }
      }
      if(this.transactionList){
        this.showTable = !this.showTable
        console.log(this.transactionList)
      }
      
    })
  }
  getUser(){
    this.http.get('http://localhost:3000/accounts').subscribe(res=> {
      this.userDetails=res;
      this.getUserList()
    }) 
     
  }
  getUserList(){
    for (let i = 0; i < this.userDetails.length; i++) {
      if(this.customerAcc === this.userDetails[i].accountNumber){
        this.userData= this.userDetails[i];
      }
    }
    console.log(this.userData)
  }
  logOut(){
    this.router.navigate(['login'])
  }
  showTransactions(){
    this.http.get('http://localhost:3000/transactions?accountId=2').subscribe(resp=> {
      this.txn2=resp;
      this.dataSource.data = resp as Transaction[];
       //console.log(this.data);
    })
  }
  goBack(): void {
    this.location;
  }
  transferFunds2(){
    this.router.navigateByUrl('/transfer-funds2');
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.customerAcc=JSON.parse(params['account'])
    });
    this.getUser()
  }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //@ViewChild(MatTable) table!: MatTable<DataTableItem>;
ngAfterViewInit(): void {
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
}
filterData(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
