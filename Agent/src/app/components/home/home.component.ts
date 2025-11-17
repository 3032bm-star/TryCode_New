import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, User } from '../../services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h1>Welcome to Angular Sample App</h1>
      <p>This is the home page featuring a dynamic user list.</p>
    </div>

    <div class="card">
      <h2>User Management Dashboard</h2>
      <div class="stats">
        <p><strong>Total Users:</strong> {{ users.length }}</p>
        <p><strong>Active Users:</strong> {{ getActiveUserCount() }}</p>
      </div>

      <button (click)="refreshUsers()" [disabled]="loading">
        {{ loading ? 'Loading...' : 'Refresh Users' }}
      </button>

      <ul class="user-list" *ngIf="!loading && users.length > 0">
        <li class="user-item" *ngFor="let user of users">
          <strong>{{ user.name }}</strong> - {{ user.email }}
          <span class="badge" [ngClass]="user.isActive ? 'active' : 'inactive'">
            {{ user.isActive ? 'Active' : 'Inactive' }}
          </span>
          <br>
          <small>Role: {{ user.role }}</small>
        </li>
      </ul>

      <div class="loading" *ngIf="loading">
        Loading users...
      </div>
    </div>

    <div class="card">
      <h2>Quick Actions</h2>
      <button (click)="showActiveOnly = !showActiveOnly">
        {{ showActiveOnly ? 'Show All Users' : 'Show Active Users Only' }}
      </button>

      <ul class="user-list" *ngIf="showActiveOnly">
        <li class="user-item" *ngFor="let user of getActiveUsers()">
          <strong>{{ user.name }}</strong> - {{ user.role }}
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .stats {
      margin: 16px 0;
      padding: 16px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }

    .stats p {
      margin: 8px 0;
    }

    button {
      margin-right: 10px;
      margin-bottom: 16px;
    }
  `]
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  loading = false;
  showActiveOnly = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Load users from the data service
   */
  loadUsers(): void {
    this.loading = true;
    
    // Simulate async operation
    setTimeout(() => {
      this.dataService.getUsers().subscribe(users => {
        this.users = users;
        this.loading = false;
      });
    }, 500);
  }

  /**
   * Refresh the user list
   */
  refreshUsers(): void {
    this.loadUsers();
  }

  /**
   * Get count of active users
   * @returns Number of active users
   */
  getActiveUserCount(): number {
    return this.users.filter(user => user.isActive).length;
  }

  /**
   * Get only active users
   * @returns Array of active users
   */
  getActiveUsers(): User[] {
    return this.dataService.getActiveUsers();
  }

  /**
   * Calculate percentage of active users
   * @returns Percentage as number
   */
  calculateActivePercentage(): number {
    if (this.users.length === 0) return 0;
    return (this.getActiveUserCount() / this.users.length) * 100;
  }
}
