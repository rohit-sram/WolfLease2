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

  apt_data: any;
  lease_data: any;

  constructor(private readonly featureService: FeatureService) {
    super()

    this.featureService.getFeature('apartments')
    .subscribe((resp: any) => {
      this.apt_data = resp;
      this.apartment = resp[0].id
    })

    this.featureService.getFeature('lease')
    .subscribe((resp: any) => {
      this.lease_data = resp;
      this.lease = resp[0].id
    })
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

  onChangeApartment(event: any){
    this.apartment = event.target.value;
  }

  onChangeLease(event: any){
    this.lease = event.target.value;
  }

  onChangeRent(event: any){
    this.rent = event.target.value;
  }

  onChangeFloor(event: any){
    this.floor_number = event.target.value;
  }

  submit(){
    let formData = new FormData();
    formData.append('availability',this.availability ? 'true' : 'false');
    formData.append('associated_apt_id',this.apartment);
    formData.append('rent_per_room', this.rent);
    formData.append('lease_id', this.lease);
    formData.append('floor_number',this.floor_number);
    if(this.type == 'add'){
      this.featureService.postFeature('flats', formData).subscribe((data: any) => {
        if(data){
          this.close();
        }
      })
    } else if (this.type == 'edit'){
      this.featureService.putFeature('flats',this.data.id,formData)
      .subscribe((data: any) => {
        if(data){
          this.result = data
          this.close();
        }
      })
  }
}

}
