import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    FormsModule,
    RouterOutlet,
  ],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css',
})
export class MainpageComponent {
  buttons: any = [
    {
      label: 'Dashboard',
      icons: 'dashboard',
      isClicked: false,
      isOpen: false,
      endIcon: 'chevron_right',
      routerName: 'mainpage/dashboard',
    },
    {
      label: 'Regularize',
      icons: 'edit_calendar',
      isClicked: false,
      isOpen: false,
      endIcon: 'chevron_right',
      routerName: '/regularize',
    },
    {
      label: 'Calender',
      icons: 'dashboard',
      isClicked: false,
      isOpen: false,
      endIcon: 'chevron_right',
      routerName: '/calender',
    },
    {
      label: 'Manage',
      icons: 'edit_calendar',
      isClicked: false,
      isOpen: false,
      children: [
        {
          label: 'User',
          isClicked: false,
          routerName: 'mainpage/usermanagement',
        },
        {
          label: 'Role',
          isClicked: false,
          routerName: 'mainpage/role',
        },
        {
          label: 'Work',
          isClicked: false,
          routerName: 'mainpage/work',
        },
        {
          label: 'Department',
          isClicked: false,
          routerName: 'mainpage/department',
        },
        {
          label: 'Designation',
          isClicked: false,
          routerName: 'mainpage/designation',
        },
      ],
    },
    {
      label: 'Manager view',
      icons: 'dashboard',
      isClicked: false,
      isOpen: false,
      endIcon: 'chevron_right',
      routerName: '/managerview',
    },
    {
      label: 'Hr portal',
      icons: 'edit_calendar',
      isClicked: false,
      isOpen: false,
      endIcon: 'chevron_right',
      routerName: '/hrportal',
    },
    {
      label: 'Request',
      icons: 'dashboard',
      isClicked: false,
      isOpen: false,
      endIcon: 'chevron_right',
      routerName: '/request',
    },
    {
      label: 'Attendance',
      icons: 'edit_calendar',
      isClicked: false,
      isOpen: false,
      endIcon: 'chevron_right',
      routerName: '/attendance',
    },
  ];

  constructor(private router: Router, private storage: StorageService) {}

  ngOnInit(): void {
    let token = this.storage.getItem('token');
    if (token == null) {
      this.router.navigate(['/login']);
    }
  }

  Onlogout() {
    this.storage.removeItem('token');
    this.router.navigate(['/login']);
  }

  btnClicked: boolean = true;

  OnclickedBtn(data: any): void {
    let hasChild = true;
    if (data.children == undefined) {
      hasChild = false;
    }
    this.buttons.forEach((element: any) => {
      if (element.label == data.label) {
        if (element.children == undefined) {
          element.isClicked = true;
        }
        data.isOpen = !data.isOpen;
        this.router.navigate([element.routerName]);
      } else {
        if (!hasChild) {
          element.isClicked = false;
          element.isOpen = false;
          if (element.children) {
            element.children.forEach((child: any) => {
              child.isOpen = false;
              child.isClicked = false;
            });
          }
        }
      }
    });
  }

  ChildBtn(name: string): void {
    this.buttons.forEach((button: any) => {
      button.isClicked = false;
      button.children?.forEach((child: any) => {
        if (child.label == name) {
          child.isClicked = true;
          button.isClicked = true;

          this.router.navigate([child.routerName]);
        } else {
          child.isClicked = false;
        }
      });
    });
  }
}
