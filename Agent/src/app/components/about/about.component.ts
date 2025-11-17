import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, User } from '../../services/data.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h1>About This Application</h1>
      <p>
        This is a sample Angular application built to demonstrate basic Angular concepts
        and serve as a test repository for code search functionality.
      </p>
    </div>

    <div class="card">
      <h2>Features</h2>
      <ul>
        <li>Component-based architecture</li>
        <li>Routing with Angular Router</li>
        <li>Dependency injection with services</li>
        <li>RxJS Observables for reactive programming</li>
        <li>TypeScript for type safety</li>
        <li>Standalone components (Angular 17+)</li>
      </ul>
    </div>

    <div class="card">
      <h2>User Statistics</h2>
      <div class="stats-grid">
        <div class="stat-item">
          <h3>{{ getTotalUsers() }}</h3>
          <p>Total Users</p>
        </div>
        <div class="stat-item">
          <h3>{{ getActiveUsers() }}</h3>
          <p>Active Users</p>
        </div>
        <div class="stat-item">
          <h3>{{ getInactiveUsers() }}</h3>
          <p>Inactive Users</p>
        </div>
        <div class="stat-item">
          <h3>{{ getRoleCount() }}</h3>
          <p>Different Roles</p>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>User Distribution by Role</h2>
      <div class="role-list">
        <div class="role-item" *ngFor="let role of getRoles()">
          <span class="role-name">{{ role.name }}:</span>
          <span class="role-count">{{ role.count }} user(s)</span>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>Technology Stack</h2>
      <div class="tech-stack">
        <div class="tech-item">
          <strong>Framework:</strong> Angular 17
        </div>
        <div class="tech-item">
          <strong>Language:</strong> TypeScript 5.2
        </div>
        <div class="tech-item">
          <strong>State Management:</strong> RxJS
        </div>
        <div class="tech-item">
          <strong>Build Tool:</strong> Angular CLI
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
      margin: 20px 0;
    }

    .stat-item {
      background-color: #e3f2fd;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      border: 2px solid #1976d2;
    }

    .stat-item h3 {
      font-size: 32px;
      color: #1976d2;
      margin: 0 0 8px 0;
    }

    .stat-item p {
      margin: 0;
      color: #666;
      font-size: 14px;
    }

    .role-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .role-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 16px;
      background-color: #f5f5f5;
      border-radius: 4px;
      border-left: 4px solid #1976d2;
    }

    .role-name {
      font-weight: 600;
      color: #333;
    }

    .role-count {
      color: #666;
    }

    .tech-stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .tech-item {
      padding: 12px;
      background-color: #f9f9f9;
      border-radius: 4px;
    }

    ul {
      list-style-position: inside;
      line-height: 2;
    }

    li {
      padding: 4px 0;
    }
  `]
})
export class AboutComponent implements OnInit {
  private allUsers: User[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  /**
   * Load user data from service
   */
  private loadUserData(): void {
    this.dataService.getUsers().subscribe(users => {
      this.allUsers = users;
    });
  }

  /**
   * Get total number of users
   * @returns Total user count
   */
  getTotalUsers(): number {
    return this.allUsers.length;
  }

  /**
   * Get number of active users
   * @returns Active user count
   */
  getActiveUsers(): number {
    return this.allUsers.filter(user => user.isActive).length;
  }

  /**
   * Get number of inactive users
   * @returns Inactive user count
   */
  getInactiveUsers(): number {
    return this.allUsers.filter(user => !user.isActive).length;
  }

  /**
   * Get number of unique roles
   * @returns Unique role count
   */
  getRoleCount(): number {
    const uniqueRoles = new Set(this.allUsers.map(user => user.role));
    return uniqueRoles.size;
  }

  /**
   * Get role distribution
   * @returns Array of roles with counts
   */
  getRoles(): Array<{ name: string; count: number }> {
    const roleCounts = this.dataService.getUserCountByRole();
    return Object.entries(roleCounts).map(([name, count]) => ({
      name,
      count
    }));
  }

  /**
   * Calculate active user percentage
   * @returns Percentage of active users
   */
  getActivePercentage(): number {
    if (this.allUsers.length === 0) return 0;
    return Math.round((this.getActiveUsers() / this.allUsers.length) * 100);
  }

  /**
   * Find most common role
   * @returns Role name with highest count
   */
  getMostCommonRole(): string {
    const roles = this.getRoles();
    if (roles.length === 0) return 'N/A';
    
    return roles.reduce((max, role) => 
      role.count > max.count ? role : max
    , roles[0]).name;
  }
}
