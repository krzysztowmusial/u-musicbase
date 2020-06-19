import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    url = 'http://localhost:3000/';

    session = new BehaviorSubject<string>(localStorage.getItem('token'));
    token = this.session.asObservable();

    loggedInSubject = new BehaviorSubject<boolean>(false);
    loggedIn = this.loggedInSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) { }

    public register(data) {
        this.http.post<{ message: string }>(this.url + "register", data).subscribe((data)=> {
            console.log(data.message)
            this.router.navigate(['/'])
        });
    }
    public login(data) {
        this.http.post<{ message: string, token: string }>(this.url + "login", data).subscribe((data)=> {
            console.log(data.message)
            this.addToken(data.token);
            this.auth();
            this.router.navigate(['/'])
        });
    }
    public logout() {
        this.http.post<{ users: Array<String> }>(this.url + "logout", { token: this.getToken()}).subscribe((data)=> {
            console.log(data.users)
        });
        this.removeToken();
        this.auth();
        this.router.navigate(['/'])
    }
    public auth() {
        this.http.post<{ auth: boolean, users: Array<String> }>(this.url + "auth", { token: this.getToken()}).subscribe((data)=> {
            console.log(data)
            if (data.auth === true) {
                this.loggedInSubject.next(true);
            } else {
                this.loggedInSubject.next(false);
            }
        });
    }

    // Session manager
    public addToken(token: string) {
        localStorage.setItem('token', token);
        this.updateToken();
    }
    public removeToken() {
        localStorage.removeItem('token');
        this.updateToken();
    }
    public updateToken() {
        this.session.next(localStorage.getItem('token'));
    }
    public getToken() {
        return localStorage.getItem('token');
    }

}
