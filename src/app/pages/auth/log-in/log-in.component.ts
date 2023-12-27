import { Component, inject } from '@angular/core';
import {FormBuilder, FormControl,FormGroup,FormsModule,ReactiveFormsModule,Validators,} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService, Credential } from '../../../core/services/auth.service';
import { ButtonProviders } from '../components/button-providers/button-providers.component';
import { MatRippleModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
interface LogInForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  standalone: true,
  imports: [
    MatCheckboxModule, 
    MatTabsModule,
    FormsModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    NgIf,
    MatSnackBarModule,
    ButtonProviders,
    
  ],
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'], // Agrega esta línea
  providers: [],
  
})
export default class LogInComponent {
  
  dynamicText: string = '';
  originalText: string = '@Fredy Serech';
  index: number = 0;
  interval: any;
  showLoginForm = false;
  hide = true;

  formBuilder = inject(FormBuilder);
 
  private authService = inject(AuthService);

  private router = inject(Router);

  private _snackBar = inject(MatSnackBar);
 
  form: FormGroup<LogInForm> = this.formBuilder.group({
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  get isEmailValid(): string | boolean {
    const control = this.form.get('email');

    const isInvalid = control?.invalid && control.touched;

    if (isInvalid) {
      return control.hasError('required')
        ? 'Campo obligatorio'
        : 'Introduce un Correo Valido';
    }

    return false;
  }

  async logIn(): Promise<void> {
    if (this.form.invalid) return;

    const credential: Credential = {
      email: this.form.value.email || '',
      password: this.form.value.password || '',
    };

    try {
      await this.authService.logInWithEmailAndPassword(credential);
      const snackBarRef = this.openSnackBar();

      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    } catch (error) {
      console.error(error);
    }
  }

  openSnackBar() {
    return this._snackBar.open('Ingresando 👨‍💻', 'Cerrar', {
      duration: 2000,
      panelClass: 'center-snackbar' // Clase CSS personalizada
    });
  }

 
  startTextAnimation() {
    this.dynamicText = ''; // Reinicia el texto dinámico
    this.index = 0; // Reinicia el índice
    clearInterval(this.interval); // Limpia cualquier intervalo previo

    this.interval = setInterval(() => {
      this.dynamicText += this.originalText[this.index];
      this.index++;
      if (this.index === this.originalText.length) {
        clearInterval(this.interval);
      }
    }, 100); // Ajusta la velocidad de escritura aquí
  }

  ngOnDestroy() {
    clearInterval(this.interval); // Limpia el intervalo al salir del componente
  }
  ngOnInit() {
    this.startTextAnimation(); 
  }

  scrollTo(sectionId: string) {
    if (sectionId === 'inicio') {
      this.startTextAnimation(); 
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
