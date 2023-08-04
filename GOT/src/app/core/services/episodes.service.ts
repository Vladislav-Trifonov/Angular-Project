import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EpisodeInterface } from '../interfaces/Episode';
import { CONSTANTS } from '../environments/constants';
import { ENDPOINTS } from '../environments/endpoints';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  constructor(private http: HttpClient) {}

  getAllEpisodes(): Observable<EpisodeInterface[]> {
    const url = CONSTANTS.host + ENDPOINTS.catalog;
    return this.http.get<EpisodeInterface[]>(url);
  }

  getEpisodeById(episodeId: string): Observable<EpisodeInterface> {
    const url = CONSTANTS.host + ENDPOINTS.details(episodeId);
    return this.http.get<EpisodeInterface>(url);
  }

  addEpisode(episodeData: EpisodeInterface): Observable<EpisodeInterface> {
    const url = CONSTANTS.host + ENDPOINTS.addEpisode;
    return this.http.post<EpisodeInterface>(url, episodeData);
  }

  editEpisode(episodeId: string, episodeData: EpisodeInterface): Observable<EpisodeInterface> {
    const url = CONSTANTS.host + ENDPOINTS.edit(episodeId);
    return this.http.put<EpisodeInterface>(url, episodeData);
  }

  deleteEpisodeById(episodeId: string): Observable<unknown> {
    const url = CONSTANTS.host + ENDPOINTS.delete(episodeId);
    return this.http.delete<unknown>(url);
  }

  likeEpisodeById(episodeId: string): Observable<unknown> {
    const url = CONSTANTS.host + ENDPOINTS.likeEpisode;
    return this.http.post<unknown>(url, {episodeId});
  }

  canLike(episodeId: string, userId: string): Observable<number> {
    const url = CONSTANTS.host + ENDPOINTS.canLike(episodeId, userId);
    return this.http.get<number>(url);
  }

  episodeTotalLikes(episodeId: string): Observable<number> {
    const url = CONSTANTS.host + ENDPOINTS.episodeTotalLikes(episodeId);
    return this.http.get<number>(url);
  }

  search(search: string): Observable<EpisodeInterface[]> {
    const url = CONSTANTS.host + ENDPOINTS.search(search);
    return this.http.get<EpisodeInterface[]>(url);
  }

  personalEpisodes(userId: string): Observable<EpisodeInterface[]> {
    const url = CONSTANTS.host + ENDPOINTS.personalEpisodes(userId);
    return this.http.get<EpisodeInterface[]>(url);
  }

}
