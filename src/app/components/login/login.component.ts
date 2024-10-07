import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para ngModel
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // Agregar FormsModule aquí
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(response => {
      if (response.token) {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      } else {
        alert('Login failed');
      }
    });
  }
}
