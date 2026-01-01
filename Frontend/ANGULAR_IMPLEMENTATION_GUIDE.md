# Angular Material Implementation Guide

## Overview
This guide provides step-by-step instructions to implement the Task Manager design system using Angular and Angular Material.

---

## Table of Contents
1. [Project Setup](#project-setup)
2. [Component Mapping](#component-mapping)
3. [Services](#services)
4. [Routing](#routing)
5. [Theming](#theming)
6. [Code Examples](#code-examples)

---

## Project Setup

### 1. Create Angular Project
```bash
ng new task-manager
cd task-manager
```

### 2. Add Angular Material
```bash
ng add @angular/material
```
**Select**: Indigo/Pink theme, Set up typography, Include animations

### 3. Install Additional Dependencies
```bash
npm install @angular/cdk
npm install ngx-charts d3
npm install date-fns
```

### 4. Project Structure
```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── task.service.ts
│   │   │   └── theme.service.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts
│   │   └── models/
│   │       ├── user.model.ts
│   │       └── task.model.ts
│   ├── shared/
│   │   ├── components/
│   │   └── directives/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/
│   │   ├── tasks/
│   │   ├── users/
│   │   └── settings/
│   └── layout/
│       ├── top-nav/
│       └── sidebar/
└── styles/
    ├── _variables.scss
    ├── _themes.scss
    └── styles.scss
```

---

## Component Mapping

### Login Component

**login.component.ts**
```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open(error.message || 'Login failed', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}
```

**login.component.html**
```html
<div class="login-container">
  <mat-card class="login-card">
    <mat-card-header>
      <div class="logo-container">
        <div class="logo">TM</div>
      </div>
      <mat-card-title>Welcome back</mat-card-title>
      <mat-card-subtitle>Sign in to your account to continue</mat-card-subtitle>
    </mat-card-header>

    <mat-card-content>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput 
                 type="email" 
                 formControlName="email"
                 placeholder="you@company.com">
          <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
            Email is required
          </mat-error>
          <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
            Invalid email address
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Password</mat-label>
          <input matInput 
                 [type]="hide ? 'password' : 'text'"
                 formControlName="password"
                 placeholder="Enter your password">
          <button mat-icon-button 
                  matSuffix 
                  (click)="hide = !hide" 
                  type="button">
            <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
          </button>
          <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
            Password is required
          </mat-error>
        </mat-form-field>

        <div class="form-footer">
          <mat-checkbox formControlName="rememberMe">Remember me</mat-checkbox>
          <a routerLink="/forgot-password" class="link">Forgot password?</a>
        </div>

        <button mat-raised-button 
                color="primary" 
                type="submit"
                class="full-width submit-btn"
                [disabled]="loginForm.invalid || isLoading">
          <mat-spinner *ngIf="isLoading" diameter="20"></mat-spinner>
          <span *ngIf="!isLoading">Sign in</span>
        </button>

        <p class="signup-link">
          Don't have an account? 
          <a routerLink="/register" class="link">Sign up</a>
        </p>
      </form>
    </mat-card-content>
  </mat-card>
</div>
```

**login.component.scss**
```scss
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
  padding: 1rem;
}

.login-card {
  width: 100%;
  max-width: 450px;
  padding: 2rem;
}

.logo-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.logo {
  width: 48px;
  height: 48px;
  background: #4f46e5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: 700;
  font-size: 20px;
}

mat-card-header {
  display: block;
  text-align: center;
  margin-bottom: 1.5rem;
}

.full-width {
  width: 100%;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.submit-btn {
  height: 44px;
  margin-bottom: 1rem;
}

.signup-link {
  text-align: center;
  font-size: 14px;
  color: #64748b;
}

.link {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}
```

---

### Dashboard Component

**dashboard.component.ts**
```typescript
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { AuthService } from '../../core/services/auth.service';

interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: TaskStats = {
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  };

  userName: string = '';
  completionRate: number = 0;

  // Chart data
  weeklyData: any[] = [
    { name: 'Mon', completed: 12, created: 15 },
    { name: 'Tue', completed: 19, created: 20 },
    { name: 'Wed', completed: 15, created: 18 },
    { name: 'Thu', completed: 25, created: 22 },
    { name: 'Fri', completed: 22, created: 25 },
    { name: 'Sat', completed: 8, created: 10 },
    { name: 'Sun', completed: 5, created: 8 }
  ];

  pieChartData: any[] = [];
  colorScheme = {
    domain: ['#f59e0b', '#3b82f6', '#10b981']
  };

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.userName = this.authService.currentUser?.name || 'User';
  }

  loadDashboardData(): void {
    this.taskService.getTaskStats().subscribe(stats => {
      this.stats = stats;
      this.completionRate = stats.total > 0 
        ? (stats.completed / stats.total) * 100 
        : 0;

      this.pieChartData = [
        { name: 'Pending', value: stats.pending },
        { name: 'In Progress', value: stats.inProgress },
        { name: 'Completed', value: stats.completed }
      ];
    });
  }
}
```

**dashboard.component.html**
```html
<div class="dashboard-container">
  <!-- Welcome Banner -->
  <div class="welcome-banner">
    <div class="banner-content">
      <h2>Welcome back, {{userName}}! 👋</h2>
      <p>Here's your productivity overview for today</p>
    </div>
    <div class="banner-stats">
      <div class="stat-item">
        <div class="stat-value">{{stats.total}}</div>
        <div class="stat-label">Total Tasks</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">{{completionRate | number:'1.0-0'}}%</div>
        <div class="stat-label">Productivity</div>
      </div>
    </div>
  </div>

  <!-- KPI Cards -->
  <div class="kpi-grid">
    <mat-card class="kpi-card border-indigo">
      <mat-card-content>
        <div class="kpi-header">
          <span class="kpi-label">Total Tasks</span>
          <mat-icon color="primary">list</mat-icon>
        </div>
        <div class="kpi-value">{{stats.total}}</div>
        <div class="kpi-change positive">
          <mat-icon>trending_up</mat-icon>
          <span>+12.5% vs last week</span>
        </div>
      </mat-card-content>
    </mat-card>

    <mat-card class="kpi-card border-orange">
      <mat-card-content>
        <div class="kpi-header">
          <span class="kpi-label">Pending</span>
          <mat-icon style="color: #f59e0b">schedule</mat-icon>
        </div>
        <div class="kpi-value orange">{{stats.pending}}</div>
        <div class="kpi-change">
          <mat-icon>warning</mat-icon>
          <span>Needs attention</span>
        </div>
      </mat-card-content>
    </mat-card>

    <mat-card class="kpi-card border-blue">
      <mat-card-content>
        <div class="kpi-header">
          <span class="kpi-label">In Progress</span>
          <mat-icon style="color: #3b82f6">autorenew</mat-icon>
        </div>
        <div class="kpi-value blue">{{stats.inProgress}}</div>
        <div class="kpi-change">
          <mat-icon>trending_up</mat-icon>
          <span>Active work</span>
        </div>
      </mat-card-content>
    </mat-card>

    <mat-card class="kpi-card border-green">
      <mat-card-content>
        <div class="kpi-header">
          <span class="kpi-label">Completed</span>
          <mat-icon style="color: #10b981">check_circle</mat-icon>
        </div>
        <div class="kpi-value green">{{stats.completed}}</div>
        <div class="kpi-change positive">
          <mat-icon>target</mat-icon>
          <span>{{completionRate | number:'1.0-0'}}% completion rate</span>
        </div>
      </mat-card-content>
    </mat-card>
  </div>

  <!-- Charts -->
  <div class="chart-grid">
    <mat-card>
      <mat-card-header>
        <mat-card-title>Weekly Activity</mat-card-title>
        <mat-card-subtitle>Tasks completed vs created</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <ngx-charts-bar-vertical-2d
          [results]="weeklyData"
          [xAxis]="true"
          [yAxis]="true"
          [legend]="true"
          [showXAxisLabel]="false"
          [showYAxisLabel]="false">
        </ngx-charts-bar-vertical-2d>
      </mat-card-content>
    </mat-card>

    <mat-card>
      <mat-card-header>
        <mat-card-title>Task Distribution</mat-card-title>
        <mat-card-subtitle>Status breakdown</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <ngx-charts-pie-chart
          [results]="pieChartData"
          [legend]="true"
          [labels]="true"
          [scheme]="colorScheme">
        </ngx-charts-pie-chart>
      </mat-card-content>
    </mat-card>
  </div>

  <!-- Progress Section -->
  <mat-card>
    <mat-card-header>
      <mat-card-title>Overall Progress</mat-card-title>
      <mat-card-subtitle>Your performance metrics</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <div class="progress-item">
        <div class="progress-label">
          <span>Completion Rate</span>
          <span class="progress-value">{{completionRate | number:'1.1-1'}}%</span>
        </div>
        <mat-progress-bar 
          mode="determinate" 
          [value]="completionRate">
        </mat-progress-bar>
      </div>

      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-icon completed">
            <mat-icon>check_circle</mat-icon>
          </div>
          <div>
            <p class="stat-label">Tasks Completed</p>
            <p class="stat-number">{{stats.completed}}</p>
          </div>
        </div>

        <div class="stat-box">
          <div class="stat-icon progress">
            <mat-icon>autorenew</mat-icon>
          </div>
          <div>
            <p class="stat-label">In Progress</p>
            <p class="stat-number">{{stats.inProgress}}</p>
          </div>
        </div>

        <div class="stat-box">
          <div class="stat-icon pending">
            <mat-icon>schedule</mat-icon>
          </div>
          <div>
            <p class="stat-label">Pending</p>
            <p class="stat-number">{{stats.pending}}</p>
          </div>
        </div>
      </div>
    </mat-card-content>
  </mat-card>
</div>
```

---

## Services

### Auth Service

**auth.service.ts**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    // Simulated API call - replace with actual backend
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => 
      u.email === email && u.password === password
    );

    if (user) {
      const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      this.currentUserSubject.next(userWithoutPassword);
      return new Observable(observer => {
        setTimeout(() => {
          observer.next(userWithoutPassword);
          observer.complete();
        }, 500);
      });
    }

    return throwError(() => new Error('Invalid credentials'));
  }

  register(name: string, email: string, password: string): Observable<User> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find((u: any) => u.email === email)) {
      return throwError(() => new Error('Email already registered'));
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: users.length === 0 ? 'admin' : 'user'
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };

    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    this.currentUserSubject.next(userWithoutPassword);

    return new Observable(observer => {
      setTimeout(() => {
        observer.next(userWithoutPassword);
        observer.complete();
      }, 500);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
```

### Theme Service

**theme.service.ts**
```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  public darkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    this.setDarkMode(isDark);
  }

  setDarkMode(isDark: boolean): void {
    this.darkModeSubject.next(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  toggleDarkMode(): void {
    this.setDarkMode(!this.darkModeSubject.value);
  }

  get isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }
}
```

---

## Routing

**app-routing.module.ts**
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'login', 
    loadChildren: () => import('./features/auth/auth.module')
      .then(m => m.AuthModule) 
  },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./features/dashboard/dashboard.module')
      .then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'tasks', 
    loadChildren: () => import('./features/tasks/tasks.module')
      .then(m => m.TasksModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'users', 
    loadChildren: () => import('./features/users/users.module')
      .then(m => m.UsersModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'settings', 
    loadChildren: () => import('./features/settings/settings.module')
      .then(m => m.SettingsModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

---

## Theming

**_themes.scss**
```scss
@use '@angular/material' as mat;

$primary-palette: (
  50: #eef2ff,
  100: #e0e7ff,
  200: #c7d2fe,
  300: #a5b4fc,
  400: #818cf8,
  500: #6366f1,
  600: #4f46e5,
  700: #4338ca,
  800: #3730a3,
  900: #312e81,
  contrast: (
    50: rgba(black, 0.87),
    100: rgba(black, 0.87),
    200: rgba(black, 0.87),
    300: white,
    400: white,
    500: white,
    600: white,
    700: white,
    800: white,
    900: white,
  )
);

$task-primary: mat.define-palette($primary-palette, 600);
$task-accent: mat.define-palette(mat.$pink-palette, A200, A100, A400);
$task-warn: mat.define-palette(mat.$red-palette);

$task-theme: mat.define-light-theme((
  color: (
    primary: $task-primary,
    accent: $task-accent,
    warn: $task-warn,
  ),
  typography: mat.define-typography-config(),
  density: 0,
));

@include mat.all-component-themes($task-theme);

// Dark theme
.dark-theme {
  $dark-primary: mat.define-palette($primary-palette, 500);
  $dark-accent: mat.define-palette(mat.$pink-palette, A200, A100, A400);
  $dark-warn: mat.define-palette(mat.$red-palette);

  $dark-theme: mat.define-dark-theme((
    color: (
      primary: $dark-primary,
      accent: $dark-accent,
      warn: $dark-warn,
    )
  ));

  @include mat.all-component-colors($dark-theme);
}
```

---

## Summary

This Angular implementation provides:
- ✅ Complete component structure
- ✅ Service-based architecture
- ✅ Reactive forms
- ✅ Route guards
- ✅ Material theming
- ✅ Dark mode support
- ✅ Lazy-loaded modules
- ✅ TypeScript types

All React components have direct Angular Material equivalents with similar functionality and appearance.
