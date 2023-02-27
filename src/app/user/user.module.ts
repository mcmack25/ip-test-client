import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { UserAddEditComponent } from './components/user-add-edit/user-add-edit.component';
import { UserListPageComponent } from './components/user-list-page.component';
import { MaterialModule } from '../shared/material.module';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';

@NgModule({
  declarations: [
    UserListPageComponent,
    UserAddEditComponent,
    UserDeleteComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: UserListPageComponent },
      { path: 'add', component: UserAddEditComponent },
      { path: 'edit/:id', component: UserAddEditComponent },
    ]),
  ],
  providers: [UserService],
})
export class UserModule {}
