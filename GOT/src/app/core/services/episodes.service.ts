import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EpisodeInterface } from '../interfaces/Episode';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  constructor(private http: HttpClient) {}

  getAllEpisodes(): Observable<EpisodeInterface[]> {
    const url = 'http://localhost:3030/data/episodes?distinct=name&sortBy=name';
    return this.http.get<EpisodeInterface[]>(url);
  }

  getEpisodeById(episodeId: string): Observable<EpisodeInterface> {
    const url = `http://localhost:3030/data/episodes/${episodeId}`;
    return this.http.get<EpisodeInterface>(url);
  }

  addEpisode(episodeData: EpisodeInterface): Observable<EpisodeInterface> {
    const url = 'http://localhost:3030/data/episodes';
    return this.http.post<EpisodeInterface>(url, episodeData);
  }

  editEpisode(episodeId: string, episodeData: EpisodeInterface): Observable<EpisodeInterface> {
    const url = `http://localhost:3030/data/episodes/${episodeId}`;
    return this.http.put<EpisodeInterface>(url, episodeData);
  }

  deleteEpisodeById(episodeId: string): Observable<unknown> {
    const url = `http://localhost:3030/data/episodes/${episodeId}`;
    return this.http.delete<unknown>(url);
  }

  likeEpisodeById(episodeId: string): Observable<unknown> {
    const url = 'http://localhost:3030/data/likes';
    return this.http.post<unknown>(url, {episodeId});
  }

  canLike(episodeId: string, userId: string): Observable<number> {
    const url = `http://localhost:3030/data/likes?where=episodeId%3D%22${episodeId}%22%20and%20_ownerId%3D%22${userId}%22&count`;
    return this.http.get<number>(url);
  }

  episodeTotalLikes(episodeId: string): Observable<number> {
    const url = `http://localhost:3030/data/likes?where=episodeId%3D%22${episodeId}%22&distinct=_ownerId&count`;
    return this.http.get<number>(url);
  }

  search(search: string): Observable<EpisodeInterface[]> {
    const url = `http://localhost:3030/data/episodes?where=name%20LIKE%20%22${search}%22`;
    return this.http.get<EpisodeInterface[]>(url);
  }

  personalEpisodes(userId: string): Observable<EpisodeInterface[]> {
    const url = `http://localhost:3030/data/episodes?where=_ownerId%3D%22${userId}%22&sortBy=name`;
    return this.http.get<EpisodeInterface[]>(url);
  }

}
