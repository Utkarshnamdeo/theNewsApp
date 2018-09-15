import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Countries } from '../data';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { AppService } from '../app.service';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  showSearchField = false;

  selectedFilters = this.appService.filters;


  /* data models */
  searchQuery = '';
  selectedCountry = { title: 'Colombia', code: 'co', image: 'https://newsapi.org/images/flags/co.svg' };
  selectedLanguage = '';
  selectedSource = '';
  selectedCategory = '';
  /*  */
  filterButtons = [
    {
      title: 'country',
      key: 'country',
      items: Countries
    },
    {
      title: 'source',
      key: 'source',
      items: []
    }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([
    Breakpoints.HandsetPortrait,
    Breakpoints.HandsetLandscape,
    Breakpoints.TabletPortrait,
    Breakpoints.TabletLandscape
  ]).pipe(map(result => result.matches));

  constructor (
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private appService: AppService
  ) { }

  ngOnInit () {
  }

  openDialog (): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '500px',
      data: this.filterButtons[0]
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (result.key === 'country') {
        this.selectedCountry = result.item;
      } else if (result.key === 'source') {
        this.selectedSource = result.item;
      } else if (result.key === 'language') {
        this.selectedLanguage = result.item;
      } else if (result.key === 'category') {
        this.selectedCategory = result.item;
      }
      this.setFilters(result.key, result.item.code, result.item.title);
    });
  }

  setFilters (key, code, title?) {
    this.appService.setFilters({ key: key, code: code, param: `${key}=${code}&`, title });
    this.appService.updateFilters();
  }

  search () {
    this.setFilters('q', this.searchQuery);
  }

  getSearchBarWidth () {
    if (this.isHandset$ && this.showSearchField) {
      return { 'width': '100%' };
    } else {
      return { 'width': '60%' };
    }
  }
}
