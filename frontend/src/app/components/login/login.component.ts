import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form = new FormGroup({
        username: new FormControl(),
        password: new FormControl()
    });

    constructor(private auth: AuthService) { }

    ngOnInit(): void {
    }

    submit() {
        this.auth.login(this.form.value);
    }

}
