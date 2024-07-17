import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Test {
  id: string;
  pregunta: string;
  puntosDeReferencia: { x: number, y: number };
  imagenId: string; // En lugar de ser el ID, ahora es la URL directamente
}

@Component({
  selector: 'app-realizar-test',
  templateUrl: './realizarTest.component.html',
  styleUrls: ['./realizarTest.component.css']
})
export class RealizarTestComponent implements OnInit {
  tests: Test[] = [];
  respuestas: { [testId: string]: { x: number, y: number } } = {}; // Un objeto que contendrá las respuestas para cada test
  aproximacion: number = 20; // Puedes ajustar la aproximación según tus necesidades
  mensajes: { [testId: string]: string } = {}; // Un objeto que contendrá los mensajes para cada test

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.obtenerTests();
  }

  obtenerTests() {
    this.firestore.collection<Test>('tests').valueChanges({ idField: 'id' }).subscribe(tests => {
      this.tests = tests;
      // Inicializar las respuestas y mensajes para cada test
      this.tests.forEach(test => {
        this.respuestas[test.id] = { x: 0, y: 0 };
        this.mensajes[test.id] = '';
      });
    });
  }

  marcarRespuesta(testId: string, event: MouseEvent) {
    const rect = (event.target as HTMLImageElement).getBoundingClientRect();
    this.respuestas[testId].x = event.clientX - rect.left;
    this.respuestas[testId].y = event.clientY - rect.top;
  }

  verificarRespuesta(test: Test) {
    const distancia = this.distanciaEntrePuntos(test.puntosDeReferencia, this.respuestas[test.id]);
    if (distancia <= this.aproximacion) {
      this.mensajes[test.id] = 'CORRECTO';
    } else {
      this.mensajes[test.id] = 'INCORRECTO';
    }
  }

  distanciaEntrePuntos(punto1: { x: number, y: number }, punto2: { x: number, y: number }) {
    const dx = punto2.x - punto1.x;
    const dy = punto2.y - punto1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
