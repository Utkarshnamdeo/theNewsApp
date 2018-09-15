import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { NewsRoutingModule } from './news-routing.module';
import { NewsCardComponent } from './news-card/news-card.component';
import { NewsComponent } from './news.component';
import { NewsService } from './news.service';
@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    MaterialModule
  ],
  declarations: [NewsComponent, NewsCardComponent],
  exports: [NewsComponent, NewsCardComponent],
  providers: [NewsService]
})
export class NewsModule { }
