import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@Component({
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule,MatFormFieldModule, MatInputModule, MatIconModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], 

})
export default class HomeComponent {
  private _router = inject(Router);
  private authservice = inject(AuthService);
 

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      this._router.navigateByUrl('/auth/log-in');
    } catch (error) {
      console.log(error);
    }
  }

}
