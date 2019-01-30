import { Component } from '@angular/core';
import photos from '../../data/photos.json';

interface Commit {
  commit: string;
  author: string;
  date: string;
  message: string;
  files?: string[];

  username: string;
  email: string;
}

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent {
  photos: Commit[];
  scrollTop: number;

  // I don't know what it used for, but it works fine.
  ngAfterContentChecked() {
    let scrollTop = sessionStorage.getItem('scrollTop');
    document.querySelector('body > app-root > mat-sidenav-container > mat-sidenav-content').scrollTop = Number(scrollTop) || 0
  }

  constructor() {
    this.photos = photos.map(this.parseAuthor);
    this.scrollTop = 0;
  }

  parseAuthor(commit: Commit) {
    const [author, username, email] = commit.author.match(/(.+?) <(.+?)>/);
    return { username, email, ...commit };
  }
  onPhotoClick() {
    this.scrollTop = document.querySelector('body > app-root > mat-sidenav-container > mat-sidenav-content').scrollTop;
    sessionStorage.setItem('scrollTop', String(this.scrollTop));
  }
}
