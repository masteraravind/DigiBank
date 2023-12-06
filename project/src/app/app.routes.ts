import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountTransferComponent } from './account-transfer/account-transfer.component';

export const routes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'account-summary', component: AccountSummaryComponent },
    { path: 'account-details', component: AccountDetailsComponent },
    { path: 'account-transfer', component: AccountTransferComponent }


];
