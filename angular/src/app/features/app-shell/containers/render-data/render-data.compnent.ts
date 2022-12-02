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

}
