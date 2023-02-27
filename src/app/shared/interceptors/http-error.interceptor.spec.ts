import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';

import { HttpErrorInterceptor } from './http-error.interceptor';

describe('HttpErrorInterceptor', () => {
  let interceptor: HttpErrorInterceptor;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['error']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpErrorInterceptor,
        { provide: ToastrService, useValue: toastrSpy },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true,
        },
      ],
    });

    interceptor = TestBed.inject(HttpErrorInterceptor);
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    toastrServiceSpy = TestBed.inject(
      ToastrService
    ) as jasmine.SpyObj<ToastrService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should open toastr with correct message', () => {
    const errorMessage = 'Connection refused';
    http.get('/api/test').subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(jasmine.any(Error));
      },
    });

    const req = httpMock.expectOne('/api/test');
    expect(req.request.method).toBe('GET');

    req.flush(
      { title: errorMessage },
      {
        status: 500,
        statusText: 'Internal Server Error',
      }
    );

    expect(toastrServiceSpy.error).toHaveBeenCalledWith(errorMessage);
  });

  it('should return correct message', () => {
    const errorMessage = 'Connection refused';
    http.get('/api/test').subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(jasmine.any(Error));
        expect(error.message).toEqual(errorMessage);
      },
    });

    const req = httpMock.expectOne('/api/test');
    expect(req.request.method).toBe('GET');

    req.flush(errorMessage, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
