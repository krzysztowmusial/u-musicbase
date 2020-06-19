import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    url = 'http://localhost:3000/api/';
    genreSubject = new BehaviorSubject<string>("all");
    genre = this.genreSubject.asObservable();

    constructor(private http: HttpClient) { }

    public findAllAlbums() {
        return this.http.get(this.url + 'albums/all');
    }

    public findByGenre(genre: string) {
        return this.http.get(this.url + 'albums/' + genre);
    }

    public findAllFavourites(token) {
        return this.http.get(this.url + 'fav/' + token)
    }
    public addToFavourites(token, album_id) {
        return this.http.post<{message: string}>(this.url + 'fav/add/', { token: token, album_id: album_id }).subscribe((data) => {
            console.log(data.message);
        })
    }
    public removeFromFavourites(token, album_id) {
        return this.http.post<{message: string}>(this.url + 'fav/remove/', { token: token, album_id: album_id }).subscribe((data) => {
            console.log(data.message);
        })
    }

    public changeGenre (category: string) {
        this.genreSubject.next(category)
    }

}