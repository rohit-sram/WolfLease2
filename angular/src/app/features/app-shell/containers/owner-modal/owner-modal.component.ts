import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
import { FeatureService } from '../../services/feature.service';
import { RenderDataComponent } from '../render-data/render-data.compnent';
import { AddEditOwner } from '../add-edit-owner/add-edit-owner.component';

@Component({
  selector: 'app-owner-modal',
  templateUrl: './owner-modal.component.html'
})
export class OwnerModalComponent extends SimpleModalComponent<{type: string; data: any},boolean> implements OnInit {

  type!: string;
  data!: any;
  searchvalue!: any;

  constructor(private readonly featureService: FeatureService,
            private readonly modalService: SimpleModalService) {
    super()
  }

  ngOnInit(): void {
  }

  search(event: any){
    this.featureService.searchFeature(this.type,this.searchvalue)
    .subscribe((searchdata: any) => {
      this.modalService.addModal(RenderDataComponent,{type: this.type,data: searchdata})
      .subscribe((result: any) => {
        this.updateData();
      });
    })
  }

  addFeature(){
      this.modalService.addModal(AddEditOwner,{type: 'add', data: {}})
      .subscribe((success: any) => {
          this.updateData();
      })
  }

  onSearch(event: any){
    this.searchvalue = event.target.value;
  }

  updateData(){
    this.featureService.getFeature(this.type)
    .subscribe((getdata: any) => {
      this.data = getdata;
    })
  }


}
