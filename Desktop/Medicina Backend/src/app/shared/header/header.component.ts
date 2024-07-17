import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  iscontPage = false;
  isglosarioPage = false;
  isHomePage = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Configurar el estado inicial según la URL actual
    this.updateActiveLink(this.router.url);

    // Suscribirse a los eventos de navegación del enrutador
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveLink(event.urlAfterRedirects);
      }
    });
  }

  private updateActiveLink(url: string) {
    this.isHomePage = url === '/';
    this.iscontPage = url.includes('/cont');
    this.isglosarioPage = url.includes('/glosario');
  }
}
