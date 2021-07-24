import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
  },
  {
    path: 'EmployeeDetails',
    component: EmployeeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

