import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';


@Component({
  selector: 'app-file-reader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.css']
})
export class FileReaderComponent implements OnInit {

  constructor(private http: HttpClient) { }

  allDataInJson = [];
  headers = []
  products = [];
  allfilterdData = []
  owners = []

  ngOnInit() {
      this.http.get('./assets/BacklogData_180719.csv', {responseType: 'text'}).subscribe(data => {
        let allData = data.split('\n');
        let headers= [];
        allData.map((e, i) => {
          if(i == 0){
            headers = e.split(',');
            this.headers = headers
          }else{
            let lineData = e.split(',')
            let obj = {}
            for (let j = 0; j < headers.length; j++) {
              if(this.products.indexOf(lineData[3]) == -1) {
                this.products.push(lineData[3])
              }
              if(this.owners.indexOf(lineData[8]) == -1) {
                this.owners.push(lineData[8]);
              }
              obj[headers[j]] = lineData[j]
            }  
            this.allDataInJson.push(obj); 
            this.allfilterdData.push(obj);
          }          
        })
      })
  }

  filter(product) {
    console.log(product)
    this.allfilterdData = this.allDataInJson.filter(e => e['Product'] === product)

  }
  filterOwnerName(name) {
    this.allfilterdData = this.allDataInJson.filter(e => e['Owner name'] === name)
  }
}
