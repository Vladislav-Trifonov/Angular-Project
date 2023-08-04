import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { EpisodeInterface } from 'src/app/core/interfaces/Episode';
import { AuthService } from 'src/app/core/services/auth.service';
import { EpisodeService } from 'src/app/core/services/episodes.service';
import { Modal, initTE } from 'tw-elements';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  episode!: EpisodeInterface;
  subscribe$!: Subscription;
  errorMessage!: string;
  isOwner!: boolean;
  isLogged!: boolean;
  userId!: string;
  canLike$!: Observable<number>;
  likes$!: Observable<number>;
  showModal: boolean = false;

  constructor(
    private EpisodeService: EpisodeService,
    private authService: AuthService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Details');
    this.isLogged = this.authService.isLogged;
    const episodeId: string = this.route.snapshot.params['episodeId'];
    this.userId = this.authService.getUserData()?._id as string;
    this.likes$ = this.EpisodeService.episodeTotalLikes(episodeId);
    this.canLike$ = this.EpisodeService.canLike(episodeId, this.userId);
    initTE({ Modal });
    
    this.subscribe$ = this.EpisodeService.getEpisodeById(episodeId).subscribe({
      next: (playerData) => {
        this.episode = playerData;
        this.titleService.setTitle(this.episode.name);
        this.isOwner = playerData._ownerId == this.userId;
      },
      error: (error) => this.errorMessage = error.error.message
    });
  }

  deletePlayer(episodeId: string) {
      this.subscribe$ = this.EpisodeService.deleteEpisodeById(episodeId).subscribe({
        error: (error) => this.errorMessage = error.error.message,
        complete: () => this.router.navigate(['episodes'])
      });
  }
  
  showModalFn(): void {
    this.showModal = true;
  }

  closeModalFn(): void {
    this.showModal = false;
  }


  likePlayer(episodeId: string) {
    this.subscribe$ = this.EpisodeService.likeEpisodeById(episodeId).subscribe({
      error: (error) => this.errorMessage = error.error.message,
      complete: () => {
        this.canLike$ = this.EpisodeService.canLike(episodeId, this.userId);
        this.likes$ = this.EpisodeService.episodeTotalLikes(episodeId);
        this.router.navigate(['/players', 'details', episodeId])
        
      },
    });
    
  }

  ngOnDestroy(): void {
    if (this.subscribe$ != undefined) {
      this.subscribe$.unsubscribe();
    }
  }
}
