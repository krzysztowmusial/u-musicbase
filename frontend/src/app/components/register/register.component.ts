import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    form = new FormGroup({
        username: new FormControl(),
        password: new FormControl()
    });

    constructor(private auth: AuthService) { }

    ngOnInit(): void {
    }

    submit() {
        this.auth.register(this.form.value);
    }

}
