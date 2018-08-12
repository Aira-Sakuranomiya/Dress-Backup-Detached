import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as EXIF from 'exif-js';
import commits from '../../data/photos.json';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
  @ViewChild('image')
  image: ElementRef;

  album = this.route.snapshot.paramMap.get('album');
  filename = this.route.snapshot.paramMap.get('filename');

  commit = commits.find(commit => commit.files.includes(this.album + '/' + this.filename));
  exif;

  constructor(private route: ActivatedRoute) {}

  async load(event) {
    const self = this;
    EXIF.getData(this.image.nativeElement, function() {
      const exif = EXIF.getAllTags(this);
      if (Object.keys(exif).length === 0) {
        return;
      }
      self.exif = exif;
    });
  }
}
