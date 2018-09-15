import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AppService } from '../app.service';
import { NewsService } from './news.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnChanges {
  private subscribers: any = {
    getAllHeadlines$: null,
    getEverything$: null,
    getAllSources$: null,
    filtersUpdated$: null
  };

  isHandset$: Observable<boolean> = this.appService.isHandset$;

  /* toggle progress spinner */
  isLoading = true;
  searchError = false;
  sourceError = false;
  selectedHead = 'headlines';
  articles: Array<any> = [];
  sources: Array<any> = [];
  constructor (
    private appService: AppService,
    private newsService: NewsService
  ) { }

  ngOnChanges (changes: SimpleChanges) {
    console.log('changes ', changes);
  }

  ngOnInit () {
    this.subscribers.filtersUpdated$ = this.appService.isFilterUpdated$.subscribe(value => {
      if (this.selectedHead === 'headlines') {
        this.getAllHeadlines(value);
      } else if (this.selectedHead === 'sources') {
        this.getAllSources(value);
      }
    }, err => {
      console.log(err);
    });

    /* setting initially selcted country */
    this.appService.setFilters({ key: 'country', code: 'co', param: 'country=co&', title: 'Colombia' });
    this.appService.setFilters({ key: 'language', code: 'en', param: 'language=en&', title: 'English' });
    /* update filters for pre population */
    this.appService.updateFilters();
  }

  selectSource (source) {
    this.appService.setFilters({ key: 'source', code: 'source', param: `source=${source.id}&`, title: source.name });
  }

  /* find the title by code name */
  find = (key, code) => {
    return this.newsService.find(key, code);
  }

  populate () {
    if (this.selectedHead === 'headlines') {
      this.getAllHeadlines(this.appService.filters);
    } else if (this.selectedHead === 'sources') {
      this.getAllSources(this.appService.filters);
    }
  }

  getAllHeadlines (filters) {
    const params = filters.map(v => v.param).reduce((a, b) => a + b);
    this.articles = [];
    this.subscribers.getAllHeadlines = this.newsService.getTopHeadings(params).subscribe((value: any) => {
      if (value.status === 'error' || (value.articles && !value.articles.length)) {
        return this.searchError = true;
      }
      this.searchError = false;
      this.articles = value.articles;
    }, err => {
      console.log(err);
    });
  }

  getAllSources (filters) {
    const params = filters.filter(item => item.key !== 'q').map(v => v.param).reduce((a, b) => a + b);
    this.sources = [];
    this.subscribers.getAllSources$ = this.newsService.getSources(params).subscribe((value: any) => {
      if (value.status === 'error' || (value.sources && !value.sources.length)) {
        return this.sourceError = true;
      }
      this.sourceError = false;
      this.sources = value.sources;
    }, err => {
      console.log(err);
    });
  }
}
