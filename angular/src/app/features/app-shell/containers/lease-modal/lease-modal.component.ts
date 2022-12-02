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

  constructor(private readonly featureService: FeatureService,
            private readonly modalService: SimpleModalService) {
    super()
  }

  ngOnInit(): void {
  }

  search(event: any){
    console.log(event);
    this.modalService.addModal(RenderDataComponent,{type: this.type,data: this.data});
  }

  addFeature(){
      this.modalService.addModal(AddEditLease, {type: 'add', data: {}})
  }

}
