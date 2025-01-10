import { Component, createComponent, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';
import { EditDepartmentComponent } from '../edit-department/edit-department.component';
import { DeleteComponent } from '../delete/delete.component';
import { CreateComponent } from '../create/create.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Data {
  id: number;
  department: string;
  createdby: string;
  actions: string;
}

const element_data: Data[] = [];

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
  ],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'createdByUser.username',
    'actions',
  ];

  actions = [{ icon: '' }];

  dataSource = element_data;

  value: any = '';
  search = { selected: [this.value] };
  selected: any = 'id';
  selectedVal: any = 'id';

  searchObj: any = {
    searchFilters: {},
    sortBy: 'id',
    sortDirection: 'ASC',
    limit: 5,
    page: 0,
  };
  totalCount: number = 0;
  pageLimit = this.searchObj.limit;
  pageIndex = this.searchObj.page;
  pageSort = this.searchObj.sortBy;
  searchfilter = this.searchObj.searchFilters;
  panelOpenState = new BehaviorSubject<boolean>(false);

  onSort() {
    this.searchObj.sortBy = this.selected;
    this.getDept();
  }

  onFilter() {
    this.searchObj.sortDirection =
      this.searchObj.sortDirection == 'ASC' ? 'DESC' : 'ASC';
    this.getDept();
  }

  onClickSearch() {
    this.searchObj.searchFilters = {};
    this.searchObj.searchFilters[this.selected] = [this.value];
    this.searchfilter = this.search;
    this.pageSort = this.selected;
    this.getDept();
  }

  handlePage(event: PageEvent) {
    this.searchObj.limit = event.pageSize;
    this.searchObj.page = event.pageIndex;
    this.getDept();
  }

  constructor(
    private service: ApiService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getDept();
    this.countDept();
  }

  obj = { id: 2, name: '' };

  clickaddDept() {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '500px',
      data: {
        obj: this.obj,
        title: 'Department',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addDept(result);
        this.snackbar.open('Department created successfully!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  addDept(obj: any) {
    this.service.addDepartment({ name: obj }).subscribe(
      (res) => {
        console.log(res.data, 'this is the response');
        this.getDept();
        this.obj.name = '';
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getDept() {
    this.service.getDepartment(this.searchObj).subscribe(
      (res) => {
        this.dataSource = res.data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  countDept() {
    this.service.departmentCount().subscribe(
      (res) => {
        this.totalCount = res.data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  editdepartmentclick(element: any) {
    const dialogRef = this.dialog.open(EditDepartmentComponent, {
      width: '500px',
      data: {
        element: element,
        name: element.name,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.editDept(result, element.id);
        this.snackbar.open('Department edited successfully!', 'Close', {
          duration: 3000,
        });
      }
    });
  }
  editDept(result: any, id: any) {
    this.service
      .editDepartment({
        id: id,
        name: result,
      })
      .subscribe(
        (res) => {
          console.log(res.data, 'this is the response');
          this.getDept();
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  deleteDept(id: any) {
    this.service.deleteDepartment({ id: id }).subscribe(
      (res) => {
        console.log(res.data, 'this is the response');
        this.getDept();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  deletedepartmentclick(element: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '500px',
      data: element,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.deleteDept(element.id);
        this.snackbar.open('Department deleted successfully!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  onclickclear() {
    this.value = '';
    this.searchObj.searchFilters = {};
    this.getDept();
  }

  onRefresh() {
    this.value = '';
    this.searchObj.searchFilters = {};
    this.getDept();
  }
}
