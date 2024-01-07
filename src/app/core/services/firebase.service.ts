import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore'; // Importar Firestore desde el módulo correspondiente

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}
 
}
