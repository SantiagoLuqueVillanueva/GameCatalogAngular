import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';

@Injectable ({
  providedIn: 'root'
})
export class GameService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/games';

  getGames(page: number, limit: number, genre: string, platform: string): Observable<HttpResponse<Game[]>> {
    let params = new HttpParams().set('_page', page).set('_limit', limit);

    if (genre) {
      params = params.set('genre', genre);
    }
    if (platform) {
      params = params.set('platform', platform);
    }

    return this.http.get<Game[]>(this.apiUrl, { params, observe: 'response' });
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`);
  }

  searchGames(text: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}?title_like=${text}`);
  }

  getGamesByPrice(min: string, max: string): Observable<Game[]> {
    let params = new HttpParams();

    if (min) {
      params = params.set('price_gte', min);
    }
    if (max) {
      params = params.set('price_lte', max);
    }

    return this.http.get<Game[]>(this.apiUrl, { params });
  }
}
