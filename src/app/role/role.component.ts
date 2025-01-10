import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api.service';
import { EditRoleComponent } from '../edit-role/edit-role.component';
import { DeleteComponent } from '../delete/delete.component';
import { CreateComponent } from '../create/create.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Data {
  id: number;
  name: string;
  createdby: string;
  actions: string;
}
const element_data: Data[] = [];
@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css',
})
export class RoleComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'createdByUser.username',
    'actions',
  ];

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

  pageLimit = this.searchObj.limit;
  pageIndex = this.searchObj.page;
  pageSort = this.searchObj.sortBy;
  searchfilter = this.searchObj.searchFilters;
  pageCount: number = 0;
  panelOpenState = new BehaviorSubject<boolean>(false);

  onSort() {
    this.searchObj.sortBy = this.selected;
    this.getRol();
    this.roleCount();
  }

  onRefresh() {
    this.value = '';
    this.searchObj.searchFilters = {};
    this.getRol();
    this.roleCount();
  }
  onFilter() {
    this.searchObj.sortDirection =
      this.searchObj.sortDirection == 'ASC' ? 'DESC' : 'ASC';
    this.getRol();
    this.roleCount();
  }
  onClickSearch() {
    this.searchObj.searchFilters = {};
    this.searchObj.searchFilters[this.selected] = [this.value];
    this.searchfilter = this.search;
    this.pageSort = this.selected;
    this.getRol();
    this.roleCount();
  }

  handlePage(event: PageEvent) {
    this.searchObj.limit = event.pageSize;
    this.searchObj.page = event.pageIndex;
    this.getRol();
    this.roleCount();
  }
  constructor(
    private service: ApiService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getRol();
    this.roleCount();
  }

  obj = { id: 2, name: '' };

  clickaddRole() {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '500px',
      data: {
        obj: this.obj,
        title: 'Role',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.roleAdd(result);
        this.snackbar.open('Role created successfully!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  roleAdd(obj: any) {
    this.service.addRole({ name: obj }).subscribe(
      (res) => {
        console.log(res.data, 'this is the response');
        this.getRol();
        this.roleCount();

        this.obj.name = '';
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getRol() {
    this.service.getRole(this.searchObj).subscribe(
      (res) => {
        console.log(res);
        this.dataSource = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  clickEdit(element: any) {
    const dialogRef = this.dialog.open(EditRoleComponent, {
      width: '500px',
      data: { element: element, name: element.name },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.roleEdit(result, element.id);
        this.snackbar.open('Role edited successfully!', 'Close', {
          duration: 3000,
        });
      }
    });
  }
  roleEdit(result: any, id: any) {
    this.service.editRole({ id: id, name: result }).subscribe(
      (res) => {
        console.log(res);
        this.getRol();
        this.roleCount();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  roleDelete(id: any) {
    this.service.deleteRole({ id: id }).subscribe(
      (res) => {
        console.log(res.data, 'this is the response');
        this.getRol();
        this.roleCount();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  deleteclick(element: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '500px',
      data: element,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.roleDelete(element.id);
        if (element.id) {
          this.snackbar.open('Error deleting role!', 'Close', {
            duration: 3000,
          });
        } else {
          this.snackbar.open('Role deleted successfully!', 'Close', {
            duration: 3000,
          });
        }
      }
    });
  }

  roleCount() {
    this.service
      .countRole({
        searchFilters: this.searchObj.searchFilters,
      })
      .subscribe(
        (res) => {
          this.pageCount = res.data;
        },
        (error) => {
          console.error('error', error);
        }
      );
  }

  onClickClear() {
    this.value = '';
    this.searchObj.searchFilters = {};
    this.getRol();
    this.roleCount();
  }
}
