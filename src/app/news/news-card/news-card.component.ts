import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  @Input() data: any;
  expandMore = false;
  isHandset$: Observable<boolean> = this.appService.isHandset$;

  constructor (private appService: AppService) { }

  ngOnInit () {
  }

}
