import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink, RouterModule,Routes} from "@angular/router";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {environment} from "../environments/environment";
import {UploadImageComponent} from "./componentes/uploadImage/uploadImage.component";
import {AngularFireModule} from "@angular/fire/compat";
import {HomeComponent2} from "./componentes/home2/home2.component";
import {TipoComponent} from "./componentes/tipo/tipo.component";
import {PizarraComponent} from "./componentes/pizarra/pizarra.component";
import {CreateTestComponent} from "./componentes/createTest/createTest.component";
import {RealizarTestComponent} from "./componentes/realizarTest/realizarTest.component";
import { LoginComponent } from './componentes/login/login.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContenidoComponent } from './componentes/home2/componentes/contenido/contenido.component';
import { IntroComponent } from './componentes/home2/componentes/intro/intro.component';
import { ListComponent } from './componentes/home2/componentes/list/list.component';
import { ContComponent } from './componentes/cont/cont.component';
import { Contenido2Component } from './componentes/contenido2/contenido2.component';



const appRoutes:Routes=[
  { path: '', redirectTo: '/home2', pathMatch: 'full' },
  { path: 'home2', component: HomeComponent2 },
  { path: 'cont', component: ContComponent},
  { path: 'conten2', component: Contenido2Component},
  { path: 'tipo/:volumen', component:TipoComponent},
  { path: 'pizarra/:volumen/:tipo', component:PizarraComponent},
  { path: 'upload', component:UploadImageComponent},
  { path: 'createTest', component:CreateTestComponent},
  { path: 'realizarTest', component:RealizarTestComponent},
  {path: 'login', component: LoginComponent}
];
@NgModule({
  declarations: [
    AppComponent, UploadImageComponent, HomeComponent2, TipoComponent, PizarraComponent,
    CreateTestComponent, RealizarTestComponent,LoginComponent,FooterComponent,HeaderComponent,ContenidoComponent,IntroComponent,ListComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    RouterModule,
    RouterLink
  ],
  providers: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
