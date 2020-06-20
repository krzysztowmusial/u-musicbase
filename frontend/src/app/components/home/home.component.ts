import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    loggedIn;
    albums;
    genres = [];

    constructor(private api: ApiService, private auth: AuthService) { }

    ngOnInit(): void {
        this.auth.auth();
        this.auth.loggedIn.subscribe((data) => {
            this.loggedIn = data;
        })

        this.api.findAllAlbums().subscribe((data: any[])=>{
            let temp = Object.entries(data);
            let temp2 = temp[0][1];
            temp2.forEach(album => {
                if( this.genres.includes(album.genre) == false ) {
                    this.genres.push(album.genre);
                }
            });
            this.genres.sort();
            console.log(this.genres)
        })

        this.api.genre.subscribe((value)=>{
            if (value === "all") {
                this.api.findAllAlbums().subscribe((data)=>{
                    let temp = Object.entries(data);
                    this.albums = temp[0][1];
                })
            } else {
              this.api.findByGenre(value).subscribe((data)=>{
                    let temp = Object.entries(data);
                    this.albums = temp[0][1];
              })
            }
          })

// 
        // this.api.findAllAlbums().subscribe((data)=>{
        //     let temp = Object.entries(data);
        //     this.albums = temp[0][1];
        // })
    }

    authCheck() {
        this.auth.auth()
    }

    addToFavourites(album_id) {
        let token = this.getToken();
        console.log(token)
        this.api.addToFavourites(token, album_id);
    }

    getToken() {
        return this.auth.getToken();
    }

    changeGenre(category) {
        this.api.changeGenre(category)
    }

    soap() {
        let lol = this.api.getSoap();
        console.log(lol)
    }

}
