import { ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as EXIF from 'exif-js';
import commits from '../../data/photos.json';
import albums from '../../data/albums.json';
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

  group: string[] =
    this.route.snapshot.url[0].path === 'albums'
      ? albums.find(album => album.name === this.album).files.map(file => this.album + '/' + file)
      : this.commit.files;

  groupPrev = this.group[this.group.indexOf(this.album + '/' + this.filename) - 1];
  groupNext = this.group[this.group.indexOf(this.album + '/' + this.filename) + 1];

  @HostListener('window:keydown.ArrowLeft')
  prev() {
    if (this.groupPrev) {
      return this.router.navigate(['/' + this.route.snapshot.url[0].path, ...this.groupPrev.split('/')]);
    }
  }

  @HostListener('window:keydown.ArrowRight')
  next() {
    if (this.groupNext) {
      return this.router.navigate(['/' + this.route.snapshot.url[0].path, ...this.groupNext.split('/')]);
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
