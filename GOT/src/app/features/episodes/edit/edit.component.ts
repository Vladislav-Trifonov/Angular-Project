import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { EpisodeInterface } from 'src/app/core/interfaces/Episode';
import { EpisodeService } from 'src/app/core/services/episodes.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy {
  episode!: EpisodeInterface;
  subscribe$!: Subscription;
  errorMessage!: string;

  constructor(
    private EpisodeService: EpisodeService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Edit');
    const episodeId = this.route.snapshot.params['episodeId'];
    this.subscribe$ = this.EpisodeService.getEpisodeById(episodeId).subscribe({
      next: (episodeInfo) => this.episode = episodeInfo,
      error: (error) => this.errorMessage = error.error.message
    });
  }

  onEditHandler(formData: NgForm) {
    const episodeId = this.route.snapshot.params['episodeId'];
    
    this.subscribe$ = this.EpisodeService.editEpisode(episodeId, formData.value).subscribe({
      error: (err) => this.errorMessage = err.error.message,
      complete: () => this.router.navigate([ '/episodes', 'details', `${episodeId}`])
    });
  }

  ngOnDestroy(): void {
    if (this.subscribe$ != undefined) {
      this.subscribe$.unsubscribe();
    }
  }
}
