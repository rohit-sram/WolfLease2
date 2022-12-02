import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { FeatureService } from '../../services/feature.service';

@Component({
  selector: 'app-add-edit-apartment',
  templateUrl: './add-edit-apartment.component.html'
})
export class AddEditApartment extends SimpleModalComponent<{type: string; data: any},boolean> implements OnInit {

  type!: string;
  data!: any;

  address: string = '';
  facilities: string = '';
  ownerid: string = '';

  constructor(private readonly featureService: FeatureService) {
    super()
  }

  ngOnInit(): void {
    if(this.type == 'edit'){
      this.address = this.data.address;
      this.facilities = this.data.facilities;
      this.ownerid = this.data.owner_id;
    }
  } 
}
