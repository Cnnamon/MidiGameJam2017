import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IUser } from "../../../models/user.model.js";

@Injectable()
export class UserService {

    private readonly registerUserUrl = "/api/user/";
    private readonly authenticateUrl = "/api/authenticate";

    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    public registerUser(user: IUser): Observable<void> {
        return this.http.post(this.registerUserUrl, { user }, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public loginUser(email: string, password: string): Observable<{ token: string, user: IUser }> {
        return this.http.post(this.authenticateUrl, { email: email, password: password }, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log("response", body.data || {});
        return body.data || {};
    }

    private handleError(error: Response | any): Observable<any> {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}