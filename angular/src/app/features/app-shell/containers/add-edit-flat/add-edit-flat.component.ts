import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { FeatureService } from '../../services/feature.service';

@Component({
  selector: 'app-add-edit-flat',
  templateUrl: './add-edit-flat.component.html'
})
export class AddEditFlat extends SimpleModalComponent<{type: string; data: any},boolean> implements OnInit {

  type!: string;
  data!: any;

  availability!: boolean;
  apartment: any = '';
  lease: any = '';
  rent: any = '';
  floor_number: any = '';

  constructor(private readonly featureService: FeatureService) {
    super()
  }

  ngOnInit(): void {
    if(this.type == 'edit'){
      this.availability = this.data.availability;
      this.apartment = this.data.associated_apt_id;
      this.lease = this.data.lease_id;
      this.rent = this.data.rent_per_room;
      this.floor_number = this.data.floor_number;
    }
  }

}