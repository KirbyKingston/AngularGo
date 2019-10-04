import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

export interface NavItem {
  name: string;
  routerLink: string;
  subItems: NavItem[];
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  title = 'Welcome';
  loading = false;

  mobileQuery: MediaQueryList;

  items: NavItem[] = [
    {
      name: 'Home',
      routerLink: 'home',
      subItems: null
    },
    {
      name: 'Sample',
      routerLink: 'sample',
      subItems: [
        { name: 'Sample1', routerLink: 'sample/sample1', subItems: null },
        { name: 'Sample2', routerLink: 'sample/sample2', subItems: null }
      ]
    },
    {
      name: 'Help',
      routerLink: 'help',
      subItems: null
    },
    {
      name: 'Account',
      routerLink: 'account',
      subItems: [
        {
          name: 'Register',
          routerLink: 'account/registration',
          subItems: null
        },
        { name: 'Login', routerLink: 'account/login', subItems: null }
      ]
    }
  ];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
    ,private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  navigate(title: string, routeLink: string, sidenav: MatSidenav) {
    this.title = title;
    this.router.navigate([routeLink]);
    if (this.mobileQuery.matches) {
      sidenav.toggle();
    }
  }
}
