import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { FeatureService } from '../../services/feature.service';

@Component({
  selector: 'app-add-edit-owner',
  templateUrl: './add-edit-owner.component.html'
})
export class AddEditOwner extends SimpleModalComponent<{type: string; data: any},boolean> implements OnInit {

  type!: string;
  data!: any;

  number: any = '';
  email: any = '';

  constructor(private readonly featureService: FeatureService) {
    super()
  }

  ngOnInit(): void {
    if(this.type == 'edit'){
      this.number = this.data.contact_number;
      this.email = this.data.contact_email;
    }
  }
}
