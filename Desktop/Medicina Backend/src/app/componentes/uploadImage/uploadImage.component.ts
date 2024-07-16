import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../servicios/login.service";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-uploadImage',
  templateUrl: './uploadImage.component.html',
  styleUrls: ['./uploadImage.component.css']
})
export class UploadImageComponent implements OnInit {
  nombre: string = "";
  volumen: string = "";
  tipo: string = "";
  tipoImagen: string = "";
  selectedFile: File | undefined;
  volumenOptions: string[] = ['Volumen1', 'Volumen2', 'Volumen3', 'Volumen4'];
  tipoOptions: string[] = ['Brazo', 'Hombro', 'Clavícula', 'Antebrazo'];
  tipoImagenOptions: string[] = ['Radiografias', 'Muestras 2D', 'Videos Anatomia', 'Imagenes 2D'];
  constructor(private storage: AngularFireStorage,
              private authService: AuthService,
              private firestore: AngularFirestore) {}

  ngOnInit() {}

  onSubmit() {
    if (this.selectedFile && this.nombre && this.volumen && this.tipo && this.tipoImagen) {
      this.uploadImage(this.selectedFile, this.nombre, this.volumen, this.tipo, this.tipoImagen)
        .then(() => {
          this.nombre = '';
          this.volumen = '';
          this.tipo = '';
          this.tipoImagen = '';
        })
        .catch(error => {
          console.error('Error al subir la imagen:', error);
        });
    } else {
      console.error('Por favor, complete todos los campos antes de subir la imagen.');
    }
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }


  uploadImage(file: File, nombre: string, volumen: string, tipo: string, tipoImagen:string) {
    const filePath = `images/${Date.now()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    return fileRef.put(file).then(() => {
      return fileRef.getDownloadURL().toPromise().then(url => {
        const imageData = { url, nombre, volumen, tipo, tipoImagen };
        return this.firestore.collection('images').add(imageData);
      });
    });
  }

  getImages() {
    return this.firestore.collection('images').valueChanges({ idField: 'id' });
  }
}
