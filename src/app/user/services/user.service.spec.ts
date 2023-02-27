import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers$', () => {
    it('should return an observable of users', () => {
      const mockUsers = [
        { id: 1, userName: 'John Doe', email: 'johndoe@example.com' },
        { id: 2, userName: 'Jane Doe', email: 'janedoe@example.com' },
      ] as User[];

      service.getUsers$().subscribe((users) => {
        expect(users).toEqual(mockUsers);
      });

      const req = httpTestingController.expectOne(
        `${environment.baseURL}/users`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockUsers);
    });
  });

  describe('getUser$', () => {
    it('should return an observable of a user with the given id', () => {
      const mockUser = {
        id: 1,
        userName: 'John Doe',
        email: 'johndoe@example.com',
      } as User;

      service.getUser$(1).subscribe((user) => {
        expect(user).toEqual(mockUser);
      });

      const req = httpTestingController.expectOne(
        `${environment.baseURL}/users/1`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockUser);
    });
  });

  describe('updateUser$', () => {
    it('should update a user with the given id and data', () => {
      const mockUser = {
        id: 1,
        userName: 'John Doe',
        email: 'johndoe@example.com',
      } as User;
      const updatedMockUser = {
        id: 1,
        userName: 'Jane Doe',
        email: 'janedoe@example.com',
      } as User;

      service.updateUser$(1, updatedMockUser).subscribe(() => {
        expect().nothing();
      });

      const req = httpTestingController.expectOne(
        `${environment.baseURL}/users/1`
      );
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updatedMockUser);
      req.flush(null);
    });
  });

  describe('createUser$', () => {
    it('should create a new user with the given data', () => {
      const newUser = {
        userName: 'John Doe',
        email: 'johndoe@example.com',
      } as User;

      service.createUser$(newUser).subscribe(() => {
        expect().nothing();
      });

      const req = httpTestingController.expectOne(
        `${environment.baseURL}/users`
      );
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newUser);
      req.flush(null);
    });
  });

  describe('deleteUser$', () => {
    it('should delete an existing user', () => {
      const userId = 1;

      service.deleteUser$(userId).subscribe(() => {
        expect(true).toBeTrue();
      });

      const req = httpTestingController.expectOne(
        `${environment.baseURL}/users/${userId}`
      );
      expect(req.request.method).toEqual('DELETE');
      req.flush(null);
    });
  });
});
