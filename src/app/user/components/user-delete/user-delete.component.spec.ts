import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/shared';
import { UserDeleteComponent } from './user-delete.component';

describe('UserDeleteComponent', () => {
  let component: UserDeleteComponent;
  let fixture: ComponentFixture<UserDeleteComponent>;
  let dialogRef: MatDialogRef<UserDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule],
      declarations: [UserDeleteComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { id: 1, userName: 'John' } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the data property', () => {
    expect(component.data).toEqual({ id: 1, userName: 'John' });
  });

  it('should call the onNoClick method when the cancel button is clicked', () => {
    spyOn(component, 'onNoClick');
    const cancelButton = fixture.nativeElement.querySelector(
      'button[color="primary"]'
    );
    cancelButton.click();
    expect(component.onNoClick).toHaveBeenCalled();
  });
});
