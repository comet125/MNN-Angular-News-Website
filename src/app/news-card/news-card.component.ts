import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-news-card',
  imports: [],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css'
})

export class NewsCardComponent {
  @Input() newsHeading!: string;
  @Input() imgURL!: string;
  @Input() newsDesc!: string;
  @Input() newsTag!: string;
  @Input() newsDate!: string;
}
