import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  filters: any = [];
  SourcesArray: any = [];

  private filtersUpdatedSource = new Subject<any>();
  public isFilterUpdated$ = this.filtersUpdatedSource.asObservable();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([
    Breakpoints.HandsetPortrait,
    Breakpoints.HandsetLandscape,
  ]).pipe(map(result => result.matches));

  constructor (
    private breakpointObserver: BreakpointObserver
  ) { }

  setFilters (req) {
    if (req.key === 'source') {
      const toRemove = this.filters.filter(item => {
        return item.key === 'country' || item.key === 'category';
      });
      if (toRemove.length) {
        toRemove.forEach(item => {
          this.filters.splice(this.filters.indexOf(item), 1);
        });
      }
      this.filters.push(req);
    } else {
      const exists = this.filters.find(item => {
        return item.key === req.key;
      });
      if (exists) {
        this.filters.splice(this.filters.indexOf(exists), 1);
      }
      this.filters.push(req);
    }
  }

  public updateFilters () {
    this.filtersUpdatedSource.next(this.filters);
  }
}
