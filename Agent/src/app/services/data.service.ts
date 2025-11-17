import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', isActive: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', isActive: true },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', isActive: false },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Developer', isActive: true },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Designer', isActive: true }
  ];

  private usersSubject = new BehaviorSubject<User[]>(this.users);
  public users$ = this.usersSubject.asObservable();

  constructor() {}

  /**
   * Get all users
   * @returns Observable of users array
   */
  getUsers(): Observable<User[]> {
    return this.users$;
  }

  /**
   * Get user by ID
   * @param id - User ID to search for
   * @returns User object or undefined if not found
   */
  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  /**
   * Get active users only
   * @returns Array of active users
   */
  getActiveUsers(): User[] {
    return this.users.filter(user => user.isActive);
  }

  /**
   * Get users by role
   * @param role - Role to filter by
   * @returns Array of users with specified role
   */
  getUsersByRole(role: string): User[] {
    return this.users.filter(user => user.role.toLowerCase() === role.toLowerCase());
  }

  /**
   * Add a new user
   * @param user - User object to add (without ID)
   * @returns The newly created user with ID
   */
  addUser(user: Omit<User, 'id'>): User {
    const newId = Math.max(...this.users.map(u => u.id)) + 1;
    const newUser: User = { ...user, id: newId };
    this.users.push(newUser);
    this.usersSubject.next(this.users);
    return newUser;
  }

  /**
   * Update existing user
   * @param id - User ID to update
   * @param updates - Partial user object with fields to update
   * @returns Updated user or undefined if not found
   */
  updateUser(id: number, updates: Partial<User>): User | undefined {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updates };
      this.usersSubject.next(this.users);
      return this.users[index];
    }
    return undefined;
  }

  /**
   * Delete user by ID
   * @param id - User ID to delete
   * @returns True if deleted, false if not found
   */
  deleteUser(id: number): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.usersSubject.next(this.users);
      return true;
    }
    return false;
  }

  /**
   * Toggle user active status
   * @param id - User ID to toggle
   */
  toggleUserStatus(id: number): void {
    const user = this.getUserById(id);
    if (user) {
      this.updateUser(id, { isActive: !user.isActive });
    }
  }

  /**
   * Search users by name or email
   * @param searchTerm - Term to search for
   * @returns Array of matching users
   */
  searchUsers(searchTerm: string): User[] {
    const term = searchTerm.toLowerCase();
    return this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }

  /**
   * Get user count by role
   * @returns Object with role counts
   */
  getUserCountByRole(): { [role: string]: number } {
    return this.users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as { [role: string]: number });
  }
}
