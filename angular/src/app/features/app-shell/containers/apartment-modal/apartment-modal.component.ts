import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
import { FeatureService } from '../../services/feature.service';
import { RenderDataComponent } from '../render-data/render-data.compnent';
import { AddEditApartment } from '../add-edit-apartment/add-edit-apartment.component';

@Component({
  selector: 'app-apartment-modal',
  templateUrl: './apartment-modal.component.html'
})
export class ApartmentModalComponent extends SimpleModalComponent<{type: string; data: any},boolean> implements OnInit {

  type!: string;
  data!: any;

  constructor(private readonly featureService: FeatureService,
            private readonly modalService: SimpleModalService) {
    super()
  }

  ngOnInit(): void {
  }

  search(event: any){
    this.modalService.addModal(RenderDataComponent,{type: this.type,data: this.data});
  }
  
  addFeature(){
      this.modalService.addModal(AddEditApartment,{type: 'add', data: {}})
  }

}
