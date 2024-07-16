import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/login.service";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from "@angular/fire/compat/firestore";

interface Imagen {
  id: string;
  url: string;
}

interface PuntoDeReferencia {
  x: number;
  y: number;
}

interface Test {
  pregunta: string;
  puntosDeReferencia: PuntoDeReferencia;
  imagenId: string;
}

@Component({
  selector: 'app-createTest',
  templateUrl: './createTest.component.html',
  styleUrls: ['./createTest.component.css']
})
export class CreateTestComponent implements OnInit {
  imagenes: Imagen[] = [];
  pregunta: string = '';
  puntosDeReferencia: { [imagenId: string]: PuntoDeReferencia } = {};

  constructor(private storage: AngularFireStorage,
              private authService: AuthService,
              private firestore: AngularFirestore) {}

  ngOnInit() {
    this.obtenerImagenes();
  }

  obtenerImagenes() {
    this.firestore.collection<Imagen>('images').valueChanges({ idField: 'id' }).subscribe(imagenes => {
      this.imagenes = imagenes;
      console.log(this.imagenes);
    });
  }

  marcarPuntoDeReferencia(event: MouseEvent, imagenId: string) {
    const rect = (event.target as HTMLImageElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const nuevoPuntoDeReferencia: PuntoDeReferencia = { x, y };
    this.puntosDeReferencia[imagenId] = nuevoPuntoDeReferencia;
  }

  guardarTest(pregunta: string, imagenId: string, puntoDeReferencia: PuntoDeReferencia) {
    if (!puntoDeReferencia) {
      alert('Por favor, marca un punto de referencia en la imagen antes de guardar el test.');
      return;
    }
    const test: Test = { pregunta, puntosDeReferencia: puntoDeReferencia, imagenId };
    this.firestore.collection('tests').add(test)
      .then(() => {
        alert('Test guardado exitosamente.');
        this.pregunta = '';
        delete this.puntosDeReferencia[imagenId];
      })
      .catch(error => {
        console.error('Error al guardar el test:', error);
        alert('Ocurrió un error al guardar el test. Por favor, inténtalo de nuevo.');
      });
  }
}
