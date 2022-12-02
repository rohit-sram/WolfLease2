import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
import { TitleCasePipe } from '@angular/common';
import { FeatureService } from '../../services/feature.service';
import { AddEditOwner } from '../add-edit-owner/add-edit-owner.component';
import { AddEditFlat } from '../add-edit-flat/add-edit-flat.component';
import { AddEditApartment } from '../add-edit-apartment/add-edit-apartment.component';
import { AddEditUser } from '../add-edit-user/add-edit-user.component';
import { AddEditLease } from '../add-edit-lease/add-edit-lease.component';

@Component({
  selector: 'app-render-data',
  templateUrl: './render-data.component.html'
})
export class RenderDataComponent extends SimpleModalComponent<{type: string; data: any},boolean> implements OnInit {

  type!: string;
  data!: any;

  constructor(private readonly featureService: FeatureService,
            private readonly modalService: SimpleModalService) {
    super()
  }

  ngOnInit(): void {
  }

  updateFeature(){
    if(this.type=='owners'){
        this.modalService.addModal(AddEditOwner,{type: 'edit',data: this.data[0]})
        .subscribe((result: any) => {
          this.data = [result];
        })
      } else if(this.type == 'flats'){
        this.modalService.addModal(AddEditFlat,{type: 'edit', data: this.data[0]})
        .subscribe((result: any) => {
          this.data = [result];
        })
      } else if(this.type == 'apartments'){
        this.modalService.addModal(AddEditApartment,{type: 'edit', data: this.data[0]})
        .subscribe((result: any) => {
          this.data = [result];
        })
      } else if(this.type == 'users'){
        this.modalService.addModal(AddEditUser,{type:'edit',data: this.data[0] })
        .subscribe((result: any) => {
          this.data = [result];
        })
      } else if(this.type == 'lease'){
        this.modalService.addModal(AddEditLease, {type: 'edit', data: this.data[0]})
        .subscribe((result: any) => {
          this.data = [result];
        })
      }
  }

  deleteFeature(){
    this.featureService.deleteFeature(this.type,this.data[0].id)
      .subscribe((data: any) => {
        this.data = [];
        this.close();
      });
  }
}
