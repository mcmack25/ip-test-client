import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  getUsers$(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.baseURL}/users`);
  }

  getUser$(id: number): Observable<User> {
    return this.httpClient.get<User>(`${environment.baseURL}/users/${id}`);
  }

  updateUser$(id: number, user: User): Observable<void> {
    return this.httpClient.put<void>(
      `${environment.baseURL}/users/${id}`,
      user
    );
  }

  createUser$(user: User): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseURL}/users`, user);
  }

  deleteUser$(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.baseURL}/users/${id}`);
  }
}
