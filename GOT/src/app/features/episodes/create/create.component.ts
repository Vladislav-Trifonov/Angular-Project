import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EpisodeInterface } from 'src/app/core/interfaces/Episode';

import { AuthService } from 'src/app/core/services/auth.service';
import { EpisodeService } from 'src/app/core/services/episodes.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit, OnDestroy {
  subscribe$!: Subscription;
  errorMessage!: string;

  constructor(
    private EpisodeService: EpisodeService,
    private titleService: Title,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Create');
  }

  createMethod(formData: NgForm) {
    const userId = this.authService.getUserData()?._id;
    const userInput = formData.value;
    userInput._ownerId = userId;

    this.EpisodeService.getAllEpisodes().subscribe({
      next: (episodes: EpisodeInterface[]) => {
        
        const episodeExists = episodes.some(episode => episode.name === userInput.name);
        if (episodeExists) {
          this.errorMessage = 'Episode with this name already exists.';
        } else {
          this.subscribe$ = this.EpisodeService.addEpisode(userInput).subscribe({
            next: () => this.router.navigate(['/episodes']),
            error: (error) => this.errorMessage = error.error.message,
          });
        }
      },
      error: (error) => {
        if (error.message.includes('Unknown Error')) {
          this.errorMessage = 'Server not connected!'
        } else {
          this.errorMessage = error.error.message;
        }
      }
    });
  }
  ngOnDestroy(): void {
    if (this.subscribe$ != undefined) {
      this.subscribe$.unsubscribe();
    }
  }
}
