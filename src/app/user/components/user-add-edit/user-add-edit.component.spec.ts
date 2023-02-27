import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/shared';
import { UserStatus } from '../../models/user-status.enum';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserAddEditComponent } from './user-add-edit.component';

describe('UserAddEditComponent', () => {
  let component: UserAddEditComponent;
  let fixture: ComponentFixture<UserAddEditComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const router = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1'),
        },
      },
    };
    const userService = jasmine.createSpyObj('UserService', [
      'getUser$',
      'createUser$',
      'updateUser$',
    ]);
    const toastrService = jasmine.createSpyObj('ToastrService', ['success']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
      declarations: [UserAddEditComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: UserService, useValue: userService },
        { provide: ToastrService, useValue: toastrService },
      ],
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userServiceSpy.getUser$.and.returnValue(of({} as User));
    fixture = TestBed.createComponent(UserAddEditComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);
    toastrServiceSpy = TestBed.inject(
      ToastrService
    ) as jasmine.SpyObj<ToastrService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize the form with empty fields when creating a new user', () => {
      component.ngOnInit();

      expect(component.form.value).toEqual({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        userStatus: '',
        department: '',
      });
    });

    it('should get the user by id and initialize the form with its values when editing an existing user', () => {
      const user: User = {
        id: 1,
        userName: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
        userStatus: UserStatus.Active,
        department: 'Testing',
      };
      const expectedUser = {
        userName: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
        userStatus: UserStatus.Active,
        department: 'Testing',
      } as User;
      userServiceSpy.getUser$.and.returnValue(of(user));
      component.ngOnInit();

      expect(userServiceSpy.getUser$).toHaveBeenCalledWith(1);
      console.log(component.form.value);
      expect(component.form.value).toEqual(expectedUser);
    });
  });
});
