import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateComponent } from '../create/create.component';
import { EditWorkComponent } from '../edit-work/edit-work.component';
import { DeleteComponent } from '../delete/delete.component';
export interface Data {
  id: number;
  name: string;
  createdby: string;
  actions: string;
}
const element_data: Data[] = [];
@Component({
  selector: 'app-work',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
  ],
  templateUrl: './work.component.html',
  styleUrl: './work.component.css',
})
export class WorkComponent {
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
  pageSort = this.searchObj.sortBy;
  searchfilter = this.searchObj.searchFilters;
  pageCount: number = 0;
  panelOpenState = new BehaviorSubject<boolean>(false);

  onSort() {
    this.searchObj.sortBy = this.selected;
    this.getWork();
    this.workCount();
  }
  onFilter() {
    this.searchObj.sortDirection =
      this.searchObj.sortDirection == 'ASC' ? 'DESC' : 'ASC';
    this.getWork();
    this.workCount();
  }
  onClickSearch() {
    this.searchObj.searchFilters = {};
    this.searchObj.searchFilters[this.selected] = [this.value];
    this.searchfilter = this.search;
    this.pageSort = this.selected;
    this.getWork();
    this.workCount();
  }

  handlePage(event: PageEvent) {
    this.searchObj.limit = event.pageSize;
    this.searchObj.page = event.pageIndex;
    this.getWork();
    this.workCount();
  }
  constructor(private service: ApiService, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.getWork();
    this.workCount();
  }
  obj = { id: 2, name: '' };

  clickAddWork() {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '500px',
      data: {
        obj: this.obj,
        title: 'Work',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addWork(result);
        this.snackbar.open('Work created successfully!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  addWork(obj: any) {
    this.service.addWork({ name: obj }).subscribe(
      (res) => {
        console.log(res.data);
        this.getWork();
        this.obj.name = '';
        this.workCount();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getWork() {
    this.service.getWork(this.searchObj).subscribe(
      (res) => {
        this.dataSource = res.data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  workCount() {
    this.service
      .countWork({ searchFilters: this.searchObj.searchFilters })
      .subscribe(
        (res) => {
          this.pageCount = res.data;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  editworkclick(element: any) {
    const dialogRef = this.dialog.open(EditWorkComponent, {
      width: '500px',
      data: {
        element: element,
        name: element.name,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.editwork(result, element.id);
        this.snackbar.open('Work edited successfully!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  editwork(result: any, id: any) {
    this.service
      .editWork({
        id: id,
        name: result,
      })
      .subscribe(
        (res) => {
          console.log(res, 'this is the response');
          this.getWork();
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  deleteWork(id: any) {
    this.service.deleteWork({ id: id }).subscribe(
      (res) => {
        console.log(res, 'this is the response');
        this.getWork();
        this.workCount();
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
        this.deleteWork(element.id);
        this.snackbar.open('Work deleted successfully!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  onRefresh() {
    this.value = '';
    this.searchObj.searchFilters = {};
    this.getWork();
    this.workCount();
  }
}
