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

  constructor() {
    this.photos = photos.map(this.parseAuthor);
  }

  parseAuthor(commit: Commit) {
    const [author, username, email] = commit.author.match(/(.+?) <(.+?)>/);
    return { username, email, ...commit };
  }
}
