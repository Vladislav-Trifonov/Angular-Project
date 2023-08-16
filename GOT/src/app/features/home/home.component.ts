import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EpisodeService } from 'src/app/core/services/episodes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  currentQuote!: string;
  currentImage!: string;
  
  quotes: { text: string, image: string }[] = [
    { text: "When you play the game of thrones, you win or you die. There is no middle ground.", image: '/assets/cersei.jpg' },
    { text: "Chaos is not a pit. Chaos is a ladder.", image: '/assets/littleFinger.jpg'}, 
    { text: "Any man who must say 'I am the king' is no true king.", image: '/assets/tywin.JPG' }
  ];
  quoteIndex: number = 0;


  constructor(private titleService: Title,) {}


  ngOnInit(): void {
    this.titleService.setTitle('Home Page');
    this.currentQuote = this.quotes[this.quoteIndex].text;
    this.currentImage = this.quotes[this.quoteIndex].image;

  
    setInterval(() => {
      this.quoteIndex = (this.quoteIndex + 1) % this.quotes.length;
      this.currentQuote = this.quotes[this.quoteIndex].text;
      this.currentImage = this.quotes[this.quoteIndex].image;
    }, 5000);
  }
}
