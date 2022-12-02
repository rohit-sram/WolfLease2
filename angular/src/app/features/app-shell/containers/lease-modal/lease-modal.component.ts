import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
import { FeatureService } from '../../services/feature.service';
import { RenderDataComponent } from '../render-data/render-data.compnent';
import { AddEditLease } from '../add-edit-lease/add-edit-lease.component';

@Component({
  selector: 'app-lease-modal',
  templateUrl: './lease-modal.component.html'
})
export class LeaseModalComponent extends SimpleModalComponent<{type: string; data: any},boolean> implements OnInit {

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
      this.modalService.addModal(RenderDataComponent,{type: this.type,data: searchdata});
    })
  }

  addFeature(){
      this.modalService.addModal(AddEditLease, {type: 'add', data: {}})
  }

  onSearch(event: any){
    this.searchvalue = event.target.value;
  }


}
