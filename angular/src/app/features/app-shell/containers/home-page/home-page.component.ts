import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent,SimpleModalService} from 'ngx-simple-modal';
import { FeatureService } from '../../services/feature.service';
import { ApartmentModalComponent } from '../apartment-modal/apartment-modal.component';
import { FlatModalComponent } from '../flat-modal/flat-modal.component';
import { LeaseModalComponent } from '../lease-modal/lease-modal.component';
import { OwnerModalComponent } from '../owner-modal/owner-modal.component';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private readonly featureService: FeatureService,
              private readonly simpleModalService: SimpleModalService) { }

  ngOnInit(): void {
  }


}
