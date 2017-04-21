import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AccountComponent } from './account.component.js';
import { LoginComponent } from './forms/login.component.js';
import { RegisterComponent } from './forms/register.component.js';
import { UserService } from './forms/user.service.js';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];


@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        HttpModule,
        JsonpModule,
    ],
    declarations: [AccountComponent, LoginComponent, RegisterComponent],
    bootstrap: [AccountComponent],
    providers: [
        UserService
    ]
})
export class AccountModule {

}