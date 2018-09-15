import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Countries, Categories, Languages } from '../data';
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor (
    private http: HttpClient,
  ) { }

  find (id, item) {
    if (id === 'country') {
      return Countries.find(v => v.code === item).title;
    } else if (id === 'language') {
      return Languages.find(v => v.code === item) ? Languages.find(v => v.code === item).title : item;
    }
  }

  getTopHeadings (params: any) {
    return this.http.get(`${environment.apiurl}top-headlines?${params}apiKey=${environment.apikey}`);
  }

  getEverything (params: any) {
    return this.http.get(`${environment.apiurl}everything?${params}apiKey=${environment.apikey}`);
  }

  getSources (params: any) {
    return this.http.get(`${environment.apiurl}sources?${params}apiKey=${environment.apikey}`);
  }
}
