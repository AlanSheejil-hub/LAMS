import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { RoleComponent } from './role/role.component';
import { WorkComponent } from './work/work.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  {
    path: 'mainpage',
    component: MainpageComponent,
    children: [
      { path: 'usermanagement', component: UsermanagementComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'designation', component: DesignationComponent },
      { path: 'role', component: RoleComponent },
      { path: 'work', component: WorkComponent },
    ],
  },
];
