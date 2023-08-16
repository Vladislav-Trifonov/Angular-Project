import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { EpisodeInterface } from 'src/app/core/interfaces/Episode';
import { EpisodeService } from 'src/app/core/services/episodes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  episodes!: EpisodeInterface[];
  subscribe$!: Subscription;
  errorMessage!: string;
  searchTerm!: string;
  isLoading: boolean = false

  constructor(
    private episodeService: EpisodeService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Search');
  }

  searchHandler(formData: NgForm) {
    const { search } = formData.value;

    console.log(search);
    

    this.isLoading = true;
    
    this.subscribe$ = this.episodeService.search(search).subscribe({
      next: (episodes) => {
        this.episodes = episodes;
        this.isLoading = false;
      },
      error: (error) => {
        if (error.message.includes('Unknown Error')) {
          this.errorMessage = 'Server not connected!'
        } else {
          this.errorMessage = error.error.message;
        }
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscribe$ != undefined) {
      this.subscribe$.unsubscribe();
    }
  }
}
