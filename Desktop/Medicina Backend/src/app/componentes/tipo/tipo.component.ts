import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css']
})
export class TipoComponent implements OnInit {
  volumen: string = '';
  tipos: string[] = [];
  opciones: string[] = ['Radiografías', 'Muestras 2D', 'Videos Anatomía', 'Imágenes 2D'];
  tipoSeleccionado: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.volumen = params['volumen'];
      this.tipos = this.obtenerTiposPorVolumen(this.volumen);
    });
  }


  obtenerTiposPorVolumen(volumen: string): string[] {
    switch (volumen) {
      case 'Volumen1':
        return ['Hombro', 'Brazo', 'Clavicula', 'Antebrazo'];
      case 'Volumen2':
        return ['Cadera', 'Rodilla', 'Femur'];
      case 'Volumen3':
        return ['Craneo', 'Traquea', 'Vertebras'];
      case 'Volumen4':
        return ['Corazon', 'Pulmones', 'Estomago'];
      case 'Volumen5':
        return ['Caja Toracica', 'Pelvis', 'Abdomen'];
      default:
        return [];
    }
  }

  redireccionarAPizarra(opcion: string) {
    this.router.navigate(['pizarra', this.volumen, opcion]);
  }
}
