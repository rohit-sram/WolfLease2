import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { FeatureService } from '../../services/feature.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html'
})
export class AddEditUser extends SimpleModalComponent<{type: string; data: any},boolean> implements OnInit {

  type!: string;
  data!: any;

  flat: any = '';
  number: any = '';
  email: any = '';
  usertype: any = '';
  dob: any = '2022-01-01';
  gender: any = ''; 
  smoking_pref: any = '';
  drinking_pref: any = '';
  veg_pref: any = '';


  constructor(private readonly featureService: FeatureService) {
    super()
  }

  ngOnInit(): void {
    if(this.type == 'edit'){
      this.flat = this.data.flat_id;
      this.number = this.data.contact_number;
      this.email = this.data.contact_email;
      this.usertype = this.data.user_type;
      this.dob = this.data.dob;
      this.gender = this.data.gender;
      this.smoking_pref = this.data.pref_smoking;
      this.drinking_pref = this.data.pref_drinking;
      this.veg_pref = this.data.pref_veg;
    }
  }
}
