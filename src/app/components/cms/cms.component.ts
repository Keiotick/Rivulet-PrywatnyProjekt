import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css']
})
export class CmsComponent implements OnInit {
  dataSource: any = [];
  page = 1;
  pageSize = 5;
  collectionSize = 6;

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.refreshCountries();
  }

  refreshCountries() {
    this.service.getMarkers().subscribe(data =>{
      this.dataSource = data
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

    this.collectionSize = data.length;
    console.log(this.dataSource.length)
    })
  }

  rmvMarker(val: any){
    this.service.deleteMarker(val).subscribe(data =>{
      console.log("usunięto marker z id:" + val)
    });
    this.refreshCountries();
  }

}
