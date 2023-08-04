import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { EpisodeInterface } from 'src/app/core/interfaces/Episode';
import { EpisodeService } from 'src/app/core/services/episodes.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit, OnDestroy {
  episodes!: EpisodeInterface[];
  subscribe$!: Subscription;
  errorMessage!: string;
  isLoading: boolean = false;

  constructor(
    private EpisodeService: EpisodeService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Episodes');
    this.isLoading = true;
    
    this.subscribe$ = this.EpisodeService.getAllEpisodes().subscribe({
      next: (episodes) => {
        this.episodes = episodes;
        this.isLoading = false;
      },
      error: (error) => this.errorMessage = error.error.message
    });
  }

  ngOnDestroy(): void {
    if (this.subscribe$ != undefined) {
      this.subscribe$.unsubscribe();
    }
  }
}
