import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cont',
  templateUrl: './cont.component.html',
  styleUrls: ['./cont.component.css'],
})
export class ContComponent {
  constructor(private router: Router) {}

  aRouter2() {
    this.router.navigate(['/conten2']);
  }

  redirectToTipoPage(volumen: string) {
    this.router.navigate(['tipo', volumen]);
  }
}
