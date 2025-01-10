import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiURL: string = 'http://localhost:8000/';
  constructor(private http: HttpClient, private storage: StorageService) {}

  login(obj: any): Observable<any> {
    return this.http.post(this.apiURL + 'login', obj);
  }

  getEmployeeDetails(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'employee/getList', obj, { headers });
  }

  addEmployeeDetails(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'employee/add', obj, { headers });
  }

  getRole(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'role/getList', obj, { headers });
  }

  getDepartment(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'department/getList', obj, { headers });
  }

  getManager(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'reportingManager/getList', obj, {
      headers,
    });
  }

  getDesignation(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'designation/getList', obj, {
      headers,
    });
  }

  addDepartment(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'department/add', obj, { headers });
  }

  editDepartment(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'department/edit', obj, { headers });
  }

  deleteDepartment(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'department/delete', obj, { headers });
  }

  addDesignation(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'designation/add', obj, { headers });
  }

  departmentCount(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(
      this.apiURL + 'department/getAllCount',
      {},
      { headers }
    );
  }

  designationCount(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(
      this.apiURL + 'designation/getAllCount',
      {},
      { headers }
    );
  }

  userCount(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'employee/getAllCount', obj, {
      headers,
    });
  }

  editDesignation(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'designation/edit', obj, { headers });
  }

  deleteDesignation(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'designation/delete', obj, { headers });
  }

  countRole(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'role/getAllCount', obj, { headers });
  }
  editRole(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'role/edit', obj, { headers });
  }

  deleteRole(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'role/delete', obj, { headers });
  }
  addRole(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'role/add', obj, { headers });
  }

  addWork(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'work/add', obj, { headers });
  }

  editWork(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'work/edit', obj, { headers });
  }

  countWork(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'work/getAllCount', obj, { headers });
  }

  getWork(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'work/getList', obj, { headers });
  }

  deleteWork(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.storage.getItem('token'),
    });
    return this.http.post(this.apiURL + 'work/delete', obj, { headers });
  }
}
