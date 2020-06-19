import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    favs;

    constructor(private api: ApiService, private auth: AuthService) { }

    ngOnInit(): void {
        this.api.findAllFavourites(this.getToken()).subscribe((albums) => {
            let temp = Object.entries(albums);
            this.favs = temp[0][1];
        })
    }

    getToken() {
        return this.auth.getToken();
    }

    removeFromFavourites(albumid) {
        this.api.removeFromFavourites(this.getToken(), albumid);
        window.location.reload();
    }

}
