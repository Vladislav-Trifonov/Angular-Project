import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit, OnDestroy {
  subscribe$!: Subscription;
  errorMessage!: string;

  constructor(
    private titleService: Title,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Login Page');
  }

  loginMethod(formData: NgForm): void {
    const { email, password } = formData.value;
    
    this.subscribe$ = this.userService.login(email, password).subscribe({
      next: (userData) => {
        this.authService.saveUserData(userData);
        this.router.navigate(['/']);
      },
      error: (error) => {
        
        if (error.message.includes('Unknown Error')) {
          this.errorMessage = 'Server not connected!'
        } else {
          this.errorMessage = error.error.message;
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscribe$ != undefined) {
      this.subscribe$.unsubscribe();
    }
  }
}
