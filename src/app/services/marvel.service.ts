import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ImageThumbnail, ImageVariant } from '../models/image';
import { Category, MarvelRequestOptions } from '../models/request';


import { MarvelCache, MarvelData, MarvelResponse } from '../models/response.model';

  const URL_API=environment.apiMarvel;
  const PUBLIC_KEY=environment.public_key;
  const HASH=environment.hash;

@Injectable({
  providedIn: 'root'
})
export class MarvelService {


  private cache: MarvelCache = {
    characters: undefined,
    comics: undefined,
    creators: undefined,
    events: undefined,
    series: undefined,
    stories: undefined,
  }

  constructor(private http: HttpClient) {
  }

  getImage(thumbnail: ImageThumbnail) {
    return thumbnail && `${thumbnail.path}.${thumbnail.extension}`;
  }

  getData(category: Category, options?: MarvelRequestOptions): Observable<MarvelData | undefined> {
    this.cache[category]=undefined;
    if (this.cache[category] && options?.offset === 0 && !(options?.nameStartsWith || options?.titleStartsWith)) {
      return of(this.cache[category]);
    }

    let url = `${URL_API}${category}?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`;

    if (options) {
      Object.entries(options).forEach(([key, value]) => url += `&${key}=${value}`);
    }
    return this.http.get<MarvelResponse>(url).pipe(map(responsex => {
      if (responsex.status === 'Ok') {

        if (!(options?.nameStartsWith || options?.titleStartsWith)) {
          if (this.cache[category]) {
            this.cache[category] = {
              ...responsex.data,
              results: [...(this.cache[category]?.results || []), ...responsex.data.results]
            };
          } else {
            this.cache[category] = responsex.data;
          }
        }

        return responsex.data;
      } else {
        throw new Error('Something went wrong');
      }
    }));
  }

  getDataOrder(category: Category, options?: MarvelRequestOptions, order?:string): Observable<MarvelData | undefined> {
    this.cache[category]=undefined;
    if (this.cache[category] && options?.offset === 0 && !(options?.nameStartsWith || options?.titleStartsWith)) {
      return of(this.cache[category]);
    }

    let url = `${URL_API}${category}?orderBy=${order}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`;
    if (options) {
      Object.entries(options).forEach(([key, value]) => url += `&${key}=${value}`);
    }
    return this.http.get<MarvelResponse>(url).pipe(map(response => {
      if (response.status === 'Ok') {

        if (!(options?.nameStartsWith || options?.titleStartsWith)) {
          if (this.cache[category]) {
            this.cache[category] = {
              ...response.data,
              results: [...(this.cache[category]?.results || []), ...response.data.results]
            };
          } else {
            this.cache[category] = response.data;
          }
        }

        return response.data;
      } else {
        throw new Error('Something went wrong');
      }
    }));
  }

  getcomic(urlcomic:string,category: Category, options?: MarvelRequestOptions):Observable<MarvelData | undefined>{
    let url = `${urlcomic}?&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`;
    if (options) {
      Object.entries(options).forEach(([key, value]) => url += `&${key}=${value}`);
    }
    return this.http.get<MarvelResponse>(url).pipe(map(response => {
      if (response.status === 'Ok') {

        if (!(options?.nameStartsWith || options?.titleStartsWith)) {
          if (this.cache[category]) {
            this.cache[category] = {
              ...response.data,
              results: [...(this.cache[category]?.results || []), ...response.data.results]
            };
          } else {
            this.cache[category] = response.data;
          }
        }

        return response.data;
      } else {
        throw new Error('Something went wrong');
      }
    }));
  }

  getInfo(category: Category, id: string): Observable<MarvelData | undefined> {
    this.cache[category]=undefined;
    if (this.cache[category]  ) {
      return of(this.cache[category]);
    }
    let url = `${URL_API}${category}/${id}?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`;

    return this.http.get<MarvelResponse>(url).pipe(map(responsex => {
      if (responsex.status === 'Ok') {
          if (this.cache[category]) {
            this.cache[category] = {
              ...responsex.data,
              results: [...(this.cache[category]?.results || []), ...responsex.data.results]
            };
          } else {
            this.cache[category] = responsex.data;
          }
        return responsex.data;
      } else {
        throw new Error('Something went wrong');
      }
    }));
  }
}
