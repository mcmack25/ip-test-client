import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserStatus } from '../../models/user-status.enum';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ValidationConstants } from 'src/app/shared';

@UntilDestroy()
@Component({
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css'],
})
export class UserAddEditComponent {
  readonly userNameTextLimit = 50;
  readonly firstNameTextLimit = 255;
  readonly lastNameTextLimit = 255;
  readonly emailTextLimit = 255;
  readonly departmentTextLimit = 255;
  readonly validationConstants = ValidationConstants;
  statuses = [UserStatus.Active, UserStatus.Inactive, UserStatus.Terminated];
  userId: number | null;
  form: FormGroup;

  get userNameControl(): AbstractControl {
    return this.form.get('userName') as AbstractControl;
  }

  get emailControl(): AbstractControl {
    return this.form.get('email') as AbstractControl;
  }

  get firstNameControl(): AbstractControl {
    return this.form.get('firstName') as AbstractControl;
  }

  get lastNameControl(): AbstractControl {
    return this.form.get('lastName') as AbstractControl;
  }

  get departmentControl(): AbstractControl {
    return this.form.get('department') as AbstractControl;
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly notify: ToastrService
  ) {
    const userId = this.route.snapshot.paramMap.get('id');
    this.userId = userId ? Number(userId) : null;

    this.form = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.userNameTextLimit),
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.firstNameTextLimit),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.lastNameTextLimit),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(this.emailTextLimit),
      ]),
      userStatus: new FormControl(''),
      department: new FormControl('', [
        Validators.maxLength(this.departmentTextLimit),
      ]),
    });
  }

  ngOnInit() {
    if (this.userId) {
      this.userService
        .getUser$(this.userId as number)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (user) => {
            this.form.patchValue(user);
          },
          error: () => this.navigateToUsersListPage(),
        });
    }
  }

  onSubmit() {
    (this.userId
      ? this.userService.updateUser$(
          this.userId as number,
          {
            ...this.form.value,
            id: this.userId,
          } as User
        )
      : this.userService.createUser$(this.form.value as User)
    )
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.notify.success(
          `User ${this.userId ? 'updated' : 'created'} successfully.`
        );
        this.navigateToUsersListPage();
      });
  }

  private navigateToUsersListPage(): void {
    this.router.navigate(['users']);
  }
}
