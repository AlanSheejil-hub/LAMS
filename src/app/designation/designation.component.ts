import { Component, inject } from '@angular/core';
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
import { BehaviorSubject } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { EditDesignationComponent } from '../edit-designation/edit-designation.component';
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
  selector: 'app-designation',
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
    MatDialogModule,
    MatSelectModule,
  ],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css',
})
export class DesignationComponent {
  dialog = inject(MatDialog);
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
  pageCount: number = 0;
  panelOpenState = new BehaviorSubject<boolean>(false);

  onSort() {
    this.searchObj.sortBy = this.selected;
    this.getDes();
  }
  onFilter() {
    this.searchObj.sortDirection =
      this.searchObj.sortDirection == 'ASC' ? 'DESC' : 'ASC';
    this.getDes();
  }
  onClickSearch() {
    this.searchObj.searchFilters = {};
    this.searchObj.searchFilters[this.selected] = [this.value];
    this.getDes();
  }

  handlePage(event: PageEvent) {
    this.searchObj.limit = event.pageSize;
    this.searchObj.page = event.pageIndex;
    this.getDes();
  }
  constructor(private service: ApiService, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.getDes();
    this.countDes();
  }
  obj = { id: 2, name: '' };

  clickAddDes() {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '500px',
      data: {
        obj: this.obj,
        title: 'Designation',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addDes(result);
        this.snackbar.open('Designation created successfully!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  addDes(obj: any) {
    this.service.addDesignation({ name: obj }).subscribe(
      (res) => {
        console.log(res.data);
        this.getDes();
        this.obj.name = '';
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getDes() {
    this.service.getDesignation(this.searchObj).subscribe(
      (res) => {
        this.dataSource = res.data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  countDes() {
    this.service.designationCount().subscribe(
      (res) => {
        this.pageCount = res.data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  editdesclick(element: any) {
    const dialogRef = this.dialog.open(EditDesignationComponent, {
      width: '500px',
      data: {
        element: element,
        name: element.name,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.editdes(result, element.id);
        this.snackbar.open('Designation edited successfully!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  editdes(result: any, id: any) {
    this.service
      .editDesignation({
        id: id,
        name: result,
      })
      .subscribe(
        (res) => {
          console.log(res, 'this is the response');
          this.getDes();
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  deleteDes(id: any) {
    this.service.deleteDesignation({ id: id }).subscribe(
      (res) => {
        console.log(res, 'this is the response');
        this.getDes();
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
        this.deleteDes(element.id);
        this.snackbar.open('Designation deleted successfully!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  onRefresh() {
    this.value = '';
    this.searchObj.searchFilters = {};
    this.getDes();
  }
}
