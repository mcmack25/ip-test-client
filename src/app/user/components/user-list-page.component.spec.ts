import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule, By } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserListPageComponent } from './user-list-page.component';
import { UserStatus } from '../models/user-status.enum';
import { MaterialModule } from 'src/app/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserListPageComponent', () => {
  let component: UserListPageComponent;
  let fixture: ComponentFixture<UserListPageComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', [
      'getUsers$',
      'deleteUser$',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success']);
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      queryParams: of({ dialog: true, id: 1, userName: 'testUser' }),
    });

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      declarations: [UserListPageComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockDialog },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data source on init', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        userName: 'user1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        userStatus: UserStatus.Active,
        department: 'IT',
      },
      {
        id: 2,
        userName: 'user2',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        userStatus: UserStatus.Inactive,
        department: 'HR',
      },
    ];
    mockUserService.getUsers$.and.returnValue(of(mockUsers));

    fixture.detectChanges();

    expect(component.dataSource).toEqual(mockUsers);
    expect(mockUserService.getUsers$).toHaveBeenCalled();
  });
});
