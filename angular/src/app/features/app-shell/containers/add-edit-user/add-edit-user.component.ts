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

  onChangeFlat(event: any){
    this.flat = event.target.value;
  }

  onChangeNumber(event: any){
    this.number = event.target.value;
  }

  onChangeEmail(event: any){
    this.email = event.target.value;
  }

  onChangeDate(event: any){
    this.dob = event.target.value;
  }

  onChangeType(event: any){
    this.usertype = event.target.value;
  }

  submit(){
    let formData = new FormData();
    formData.append('flat_id',this.flat);
    formData.append('contact_number',this.number);
    formData.append('contact_email',this.email);
    formData.append('user_type',this.usertype);
    formData.append('dob',this.dob);
    formData.append('gender',this.gender);
    formData.append('pref_smoking',this.smoking_pref);
    formData.append('pref_drinking',this.drinking_pref);
    formData.append('pref_veg',this.veg_pref);
    if(this.type == 'add'){
      this.close;
    } else if(this.type == 'edit'){
      this.close;
    }
  }
}
