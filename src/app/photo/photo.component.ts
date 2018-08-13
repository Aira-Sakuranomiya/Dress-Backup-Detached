import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as EXIF from 'exif-js';
import commits from '../../data/photos.json';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  loadedmetadata = false;

  showInfo = !this.breakpointObserver.isMatched(Breakpoints.Handset);
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    public location: Location,
    private ref: ChangeDetectorRef
  ) {}

  async load() {
    this.ref.markForCheck();
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
