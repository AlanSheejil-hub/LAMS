import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from '../user/user.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface User {
  username: string;
  id: number;
  email: string;
  role: string;
  Department: string;
}

const element_data: User[] = [];

@Component({
  selector: 'app-usermanagement',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatFormField,
    MatInputModule,
    FormsModule,
    MatExpansionModule,
    MatTableModule,
    MatSelectModule,
    MatTabsModule,
    MatDatepickerModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './usermanagement.component.html',
  styleUrl: './usermanagement.component.css',
})
export class UsermanagementComponent {
  displayedColumns: string[] = [
    'id',
    'username',
    'email',
    'employeeRole.name',
    'employeeDepartment.name',
  ];

  dataSource = element_data;
  selected: any = 'id';
  selectedVal = 'id';
  value: any = '';
  selectedValue: any = '';
  selectedDepartment: any = '';
  selectedManager: any = '';
  selectedDesignation: any = '';
  selectedSort: any = '';

  panelOpenState = new BehaviorSubject<boolean>(false);

  search = { selected: [this.value] };

  employeeListObj: any = {
    searchFilters: {},
    sortBy: 'id',
    sortDirection: 'ASC',
    limit: 5,
    page: 0,
  };

  searchfilter = this.employeeListObj.searchFilters;

  pageLimit = this.employeeListObj.limit;
  pageIndex = this.employeeListObj.page;

  addRoleObj = {
    searchFilters: {
      name: ['adm'],
    },
    sortBy: 'id',
    sortDirection: 'ASC',
    limit: 5,
    page: 0,
  };

  userCount: number = 0;

  onClickSearch() {
    this.employeeListObj.searchFilters = {};

    this.employeeListObj.searchFilters[this.selected] = [this.value];

    this.searchfilter = this.search;

    this.getEmployeeList();
  }

  onSort() {
    this.employeeListObj.sortBy = this.selectedVal;
    this.getEmployeeList();
  }
  onRefresh() {
    this.value = '';
    this.employeeListObj.searchFilters = {};
    this.getEmployeeList();
  }

  onFilter() {
    this.employeeListObj.sortDirection =
      this.employeeListObj.sortDirection == 'ASC' ? 'DESC' : 'ASC';
    this.getEmployeeList();
  }

  handlePageEvent(event: PageEvent) {
    this.employeeListObj.limit = event.pageSize;
    this.employeeListObj.page = event.pageIndex;
    this.getEmployeeList();
  }

  userForm: any;

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private apiservice: ApiService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();

    this.getCount();
  }

  clickadduser() {
    const dialogRef = this.dialog.open(UserComponent, {
      width: '1000',
      panelClass: 'nameing',
      data: {
        title: 'Add User',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addUser(result);
        this.snackbar.open('Role created successfully!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  addUser(object: any) {
    this.apiservice.addEmployeeDetails(object).subscribe(
      (res: any) => {
        console.log(res, 'resdata');
        this.getEmployeeList();
      },
      (err: any) => {
        console.log(err);
      }
    );
    this.userForm.reset();
  }

  getEmployeeList() {
    this.apiservice.getEmployeeDetails(this.employeeListObj).subscribe(
      (response: any) => {
        this.dataSource = response.data;
        console.log(this.dataSource, 'data');
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getCount() {
    this.apiservice.userCount(this.employeeListObj).subscribe(
      (response: any) => {
        this.userCount = response.data;
        console.log(this.userCount, 'count');
      },
      (error) => {
        console.error('error fetching data', error);
      }
    );
  }

  onClickclear() {
    this.value = '';
    this.employeeListObj.searchFilters = {};
    this.getEmployeeList();
  }
}
