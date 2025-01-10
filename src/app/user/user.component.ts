import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ApiService } from '../api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  readonly dialogRef = inject(MatDialogRef<UserComponent>);

  selected: any = 'id';
  selectedVal = 'id';
  value: any = '';
  selectedValue: any = '';
  selectedDepartment: any = '';
  selectedManager: any = '';
  selectedDesignation: any = '';
  selectedSort: any = '';

  dropdownOptions: any[] = [];
  departmentOptions: any[] = [];
  managerOptions: any[] = [];
  designationOptions: any[] = [];

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(private apiservice: ApiService) {}
  ngOnInit(): void {
    this.initForm();
    this.getDept();
    this.getManage();
    this.getDesig();
    this.getRole();
  }
  Form: any;
  //
  initForm(): void {
    this.Form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl('', [Validators.required]),
      designation: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      manager: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      DOJ: new FormControl('', [Validators.required]),
      DOB: new FormControl('', [Validators.required]),
      empRole: new FormControl('', [Validators.required]),
    });
  }

  // addUser() {
  //   let obj = {
  //     username: this.Form.value.username,
  //     email: this.Form.value.email,

  //     department: this.Form.value.department,
  //     designation: this.Form.value.designation,
  //     DOB: this.Form.value.DOB,
  //     DOJ: this.Form.value.DOJ,
  //     mobile: this.Form.value.mobile,
  //     manager: this.Form.value.manager,
  //     password: this.Form.value.password,
  //     empRole: this.Form.value.empRole,
  //     firstName: this.Form.value.firstName,
  //     lastName: this.Form.value.lastName,
  //   };
  //   console.log(this.Form);
  // }

  submit() {
    if (this.Form.valid) {
      const userData = { ...this.Form.value };
      this.dialogRef.close(userData);
    } else {
      this.Form.markAllAsTouched();
    }
  }

  getRole() {
    this.apiservice.getRole({}).subscribe(
      (response: any) => {
        this.dropdownOptions = response.data;
        console.log(this.dropdownOptions, 'options');
        this.selectedValue = response.data.name;
        console.log(this.selectedValue, 'options');
        this.Form.value.role;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getDept() {
    this.apiservice.getDepartment({}).subscribe(
      (response: any) => {
        this.departmentOptions = response.data;
        console.log(this.departmentOptions, 'options');
        this.selectedDepartment = response.data.name;
        console.log(this.selectedDepartment, 'options');
      },
      (error) => {
        console.error('error fetching data', error);
      }
    );
  }
  getManage() {
    this.apiservice.getManager({}).subscribe(
      (response: any) => {
        this.managerOptions = response.data;
        console.log(this.managerOptions, 'options');
        this.selectedManager = response.data['employee.username'];
        console.log(this.selectedManager, 'options');
      },
      (error) => {
        console.error('error fetching data', error);
      }
    );
  }
  getDesig() {
    this.apiservice.getDesignation({}).subscribe(
      (response: any) => {
        this.designationOptions = response.data;
        console.log(this.designationOptions, 'options');
        this.selectedDesignation = response.data.name;
      },
      (error) => {
        console.error('error fetching data', error);
      }
    );
  }
}
