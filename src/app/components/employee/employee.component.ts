import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { DatafeedService } from "../../services/datafeed.service";
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeData: any[] = []
  employeeDataCopy: any[] = []
  departmentData = [];
  order = true;
  showExp = false;
  searchText = '';
  constructor(private datafeedService: DatafeedService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData = () => {
    this.datafeedService.getEmployeeDetails().subscribe(
      result => {
        // console.log(result)
        result.forEach(element => {
          element.joining_date = element.joining_date.split('/')
          element.joining_date = new Date(element.joining_date[2], element.joining_date[1] - 1, element.joining_date[0])
          // element.experience = this.calculateExperience(element.joining_date)
        })
        this.employeeData = result;
        this.employeeDataCopy = JSON.parse(JSON.stringify(this.employeeData));
        this.sortData(this.employeeData, 'name', this.order);
        this.departmentData = this.getDistinctValues(this.employeeData);
      },
      error => {
        console.log(error);
      }
    )
  }

  sortData = (data, key, order) => {
    // true = 'ascending'
    order ? data.sort((a, b) => { return a[key] < b[key] ? -1 : 1 }) : data.sort(function (a, b) { return a[key] < b[key] ? 1 : -1 });
    this.order = !this.order;
  }

  calculateExperience = (joining_date) => {
    let diff = Date.now() - joining_date;
    let diffDate = new Date(diff);
    return Math.abs(diffDate.getUTCFullYear() - 1970);
  }

  getExperienceData = (data, showExp) => {
    this.employeeData = showExp ? data.filter(ele => this.calculateExperience(new Date(ele.joining_date)) > 2)
      : JSON.parse(JSON.stringify(this.employeeDataCopy));
  }

  getDistinctValues = (data) => {
    let distinctArray = [];
    data.forEach(ele => {
      if (distinctArray.filter(element => element.department == ele.department).length > 0) { }
      else {
        ele.count = data.filter(item => ele.department === item.department).length;
        distinctArray.push(ele);
      }
    })
    return distinctArray;
  }

  removeRow = (data, key, value) => {
    this.employeeData = data.filter(element => element[key] !== value)
  }

  searchData = (data, key, searchString) => {
    data = JSON.parse(JSON.stringify(this.employeeDataCopy))
    this.employeeData = data.filter(item => {
      return (
        item[key].toLowerCase().includes(searchString)
      );
    });
  }
}
