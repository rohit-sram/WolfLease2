import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
import { FeatureService } from '../../services/feature.service';
import { RenderDataComponent } from '../render-data/render-data.compnent';
import { AddEditLease } from '../add-edit-lease/add-edit-lease.component';

@Component({
  selector: 'app-lease-modal',
  templateUrl: './lease-modal.component.html'
})
export class LeaseModalComponent extends SimpleModalComponent<{type: string; data: any},boolean> implements OnInit {

  type!: string;
  data!: any;

  constructor(private readonly featureService: FeatureService,
            private readonly modalService: SimpleModalService) {
    super()
  }

}
