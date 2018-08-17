import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter, map } from 'rxjs/operators';
import { Router, RoutesRecognized } from '@angular/router';
import { PhotoComponent } from './photo/photo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dress';
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  showToolbar = this.router.events.pipe(
    filter(val => val instanceof RoutesRecognized),
    map((val: RoutesRecognized) => val.state.root.firstChild.component !== PhotoComponent)
  );

  @HostListener('window.beforeinstallprompt')
  beforeinstallprompt(event) {
    console.log(event);
    event.preventDefault();
    return false;
  }

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}
}
