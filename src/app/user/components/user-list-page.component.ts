import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { filter, switchMap, tap } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { UserDeleteComponent } from './user-delete/user-delete.component';

@UntilDestroy()
@Component({
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.css'],
})
export class UserListPageComponent implements OnInit {
  displayedColumns: string[] = [
    'userName',
    'firstName',
    'lastName',
    'email',
    'userStatus',
    'department',
    'update',
    'delete',
  ];
  dataSource: User[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly notify: ToastrService,
    private readonly route: ActivatedRoute
  ) {
    route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      if (params['dialog']) {
        this.onDeleteUser(params['id'], params['userName']);
      }
    });
  }

  ngOnInit(): void {
    this.initDataSource();
  }

  public onUpdateUser(id: number) {
    this.router.navigate(['users/edit', id]);
  }

  public onDeleteUser(id: number, userName: string) {
    this.dialog
      .open(UserDeleteComponent, {
        data: {
          id,
          userName,
        },
      })
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        tap((value) => {
          if (!value) {
            this.router.navigate(['.'], { relativeTo: this.route });
          }
        }),
        filter(Boolean),
        switchMap(() => this.userService.deleteUser$(id))
      )
      .subscribe(() => {
        const index = this.dataSource.findIndex((u) => u.id === id);
        this.dataSource.splice(index, 1);
        this.dataSource = [...this.dataSource];
        this.notify.success('User deleted successfully.');
        this.router.navigate(['.'], { relativeTo: this.route });
      });
  }

  private initDataSource(): void {
    this.userService
      .getUsers$()
      .pipe(untilDestroyed(this))
      .subscribe((users) => {
        this.dataSource = users;
      });
  }
}
