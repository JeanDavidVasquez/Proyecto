import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pizarra',
  templateUrl: './pizarra.component.html',
  styleUrls: ['./pizarra.component.css']
})
export class PizarraComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  private drawingMode: 'pencil' | 'eraser' = 'pencil';
  volumen: string = '';
  tipo: string = '';
  imagenes$: Observable<any[]> | undefined;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.volumen = params['volumen'];
      this.tipo = params['tipo'];

      console.log('Volumen:', this.volumen);
      console.log('Tipo:', this.tipo);

      this.imagenes$ = this.firestore.collection('images', ref =>
        ref.where('volumen', '==', this.volumen)
          .where('tipo', '==', this.tipo)
      ).valueChanges();

      this.imagenes$.subscribe(data => {
        console.log('Imágenes:', data);
      });
    });

    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.setupCanvas();
  }

  setupCanvas() {
    const canvasEl = this.canvas.nativeElement;

    // Vincular los eventos del canvas a los métodos de la clase
    canvasEl.addEventListener('mousedown', this.startPosition.bind(this));
    canvasEl.addEventListener('mouseup', this.endPosition.bind(this));
    canvasEl.addEventListener('mousemove', this.draw.bind(this));
  }

  // Método para iniciar el dibujo
  startPosition(e: MouseEvent) {
    this.isDrawing = true;
    this.draw(e);
  }

  // Método para terminar el dibujo
  endPosition() {
    this.isDrawing = false;
    this.ctx.beginPath(); // Comenzar un nuevo camino para evitar líneas conectadas
  }

  // Método de dibujo
  draw(e: MouseEvent) {
    if (!this.isDrawing) return;

    // Configurar las propiedades de dibujo
    this.ctx.lineWidth = this.drawingMode === 'eraser' ? 20 : 5;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = this.drawingMode === 'eraser' ? '#e0e0e0' : 'black';

    // Obtener la posición relativa del cursor en el canvas
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  }

  // Método para cambiar el modo de dibujo
  setDrawingMode(mode: 'pencil' | 'eraser') {
    this.drawingMode = mode;
  }

  // Método para limpiar el canvas
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  // Método para filtrar las imágenes
  filtrarImagenes(tipo: string) {
    this.imagenes$ = this.firestore.collection('images', ref =>
      ref.where('volumen', '==', this.volumen)
        .where('tipo', '==', this.tipo)
        .where('tipoImagen', '==', tipo)
    ).valueChanges();

    this.imagenes$.subscribe(data => {
      console.log('Imágenes filtradas por tipo:', data);
    });
  }
}
