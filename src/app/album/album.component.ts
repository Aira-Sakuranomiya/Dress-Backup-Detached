import { Component, OnInit } from '@angular/core';
import albums from '../../data/albums.json';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import * as marked from 'marked';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  album = this.route.paramMap.pipe(
    map(params => albums.find(album => album.name === params.get('album')))
  );
  marked = marked;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
