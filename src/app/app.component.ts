import { Component,inject, OnInit } from '@angular/core';
import { Game } from './models/game';
import { GameService } from './services/gameService';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private gameService = inject(GameService);
  games: Game[] = [];
  selectedGame: Game | null = null;
  selectedGenre = '';
  selectedPlatform = '';
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;

  ngOnInit(): void {
    this.loadGames();
  }

  searchById(id: string): void {
    this.gameService.getGame(Number(id)).subscribe(data => {
      this.selectedGame = data;
    });
  }

  loadGames(): void {
    this.gameService.getGames(this.currentPage, this.pageSize, this.selectedGenre, this.selectedPlatform).subscribe(response => {
      this.games = response.body ?? [];
      this.totalItems = Number(response.headers.get('X-Total-Count') ?? 0);
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadGames();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadGames();
    }
  }

  onGenreChange(genre: string): void {
    this.selectedGenre = genre;
    this.currentPage = 1;
    this.loadGames();
  }

  onPlatformChange(platform: string): void {
    this.selectedPlatform = platform;
    this.currentPage = 1;
    this.loadGames();
  }

  onPageSizeChange(pageSizeChange: string): void {
    let pageSizeNumber = Number(pageSizeChange);
    this.pageSize = pageSizeNumber;
    this.loadGames();
  }

  searchByTitle(text: string): void {
    this.gameService.searchGames(text).subscribe(data => {
      this.games = data;
    });
  }

  filterByPrice(min: string, max: string): void {
    this.gameService.getGamesByPrice(min, max).subscribe(data => {
      this.games = data;
    });
  }
}
