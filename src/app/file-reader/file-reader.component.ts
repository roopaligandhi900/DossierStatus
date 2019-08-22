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
  owners = [];
  selectedProduct = null;
  selectedOwner = null;

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
              if(this.owners.indexOf(lineData[9]) == -1) {
                this.owners.push(lineData[9]);
              }
              obj[headers[j]] = lineData[j]
            }  
            this.allDataInJson.push(obj); 
            this.allfilterdData.push(obj);
           
          }          
        })

        this.allfilterdData = this.allDataInJson.sort((a, b) => {
          
          if(parseInt(a['Dossier Age']) < parseInt(b['Dossier Age'])) {
            return 1
          }
          if(parseInt(a['Dossier Age']) > parseInt(b['Dossier Age'])) {
            return -1
          }
          return 0
        });
      })
  }

  compute(data) {
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
          if(this.owners.indexOf(lineData[9]) == -1) {
            this.owners.push(lineData[9]);
          }
          obj[headers[j]] = lineData[j]
        }  
        this.allDataInJson.push(obj); 
        this.allfilterdData.push(obj);
       
      }          
    })

    this.allfilterdData = this.allDataInJson.sort((a, b) => {
      
      if(parseInt(a['Dossier Age']) < parseInt(b['Dossier Age'])) {
        return 1
      }
      if(parseInt(a['Dossier Age']) > parseInt(b['Dossier Age'])) {
        return -1
      }
      return 0
    });
  }

  filter(product) {
    this.selectedProduct = product;
    // if(product === 'none') {
    //   this.allfilterdData = this.allDataInJson
    // }else {
    //   this.allfilterdData = this.allDataInJson.filter(e => e['Product'] === product)
    // }

  }
  filterOwnerName(name) {
    this.selectedOwner = name;
    // if(name === 'none') {
    //   this.allfilterdData = this.allDataInJson  
    // }else {
    //   this.allfilterdData = this.allDataInJson.filter(e => e['Owner team'] === name)
    // }
  }

  read(event){
      let fileReaer = new FileReader();
      fileReaer.onload = (e) => {
        this.compute(fileReaer.result);
      }
      fileReaer.readAsText(event.target.files[0]);
  }

  applyFilter() {
      console.log((this.selectedOwner  && this.selectedProduct) !== null && (this.selectedOwner && this.selectedProduct) !== "none")
      if(this.selectedProduct == null || this.selectedProduct == "none") {
        this.allfilterdData = this.allDataInJson.filter(e => e['Owner team'] === this.selectedOwner)
      }
      if(this.selectedProduct == null || this.selectedProduct == "none") {
        this.allfilterdData = this.allDataInJson.filter(e => e['Product'] === this.selectedProduct)
      }
      if ((this.selectedOwner  && this.selectedProduct) !== null && (this.selectedOwner && this.selectedProduct) !== "none") {
        this.allfilterdData = this.allDataInJson.filter(e => e['Product'] === this.selectedProduct);
        this.allfilterdData = this.allfilterdData.filter(e => e['Owner team'] === this.selectedOwner);
      }
  }

  clear() {
    this.allfilterdData = this.allDataInJson;
  }
}
