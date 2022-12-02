import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
import { FeatureService } from '../../services/feature.service';
import { RenderDataComponent } from '../render-data/render-data.compnent';
import { AddEditFlat } from '../add-edit-flat/add-edit-flat.component';

@Component({
  selector: 'app-flat-modal',
  templateUrl: './flat-modal.component.html'
})
export class FlatModalComponent extends SimpleModalComponent<{type: string; data: any},boolean> implements OnInit {

  type!: string;
  data!: any;

  constructor(private readonly featureService: FeatureService,
            private readonly modalService: SimpleModalService) {
    super()
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  search(event: any){
    console.log(event);
    let searchdata = [
      {
          "id": "76f96871-31e5-477b-a883-2a0bd7dd580e",
          "availability": false,
          "rent_per_room": 600,
          "floor_number": 1,
          "associated_apt_id": "01f63923-61f9-4d33-969f-c0b4be7ebb14",
          "lease_id": "c8063dab-d631-4c1e-8939-c037313ce4a7"
      }
  ]
  
    this.modalService.addModal(RenderDataComponent,{type: this.type,data: searchdata});
  }

  addFeature(){
      this.modalService.addModal(AddEditFlat,{type: 'add', data: {}})
  }

}
