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

  goToFeature(type: string) {
   let data = [
    {
        "id": "01f63923-61f9-4d33-969f-c0b4be7ebb14",
        "address": "2343",
        "facilities": "Utilities Included",
        "owner_id": "e1e1253b-264c-4589-9dcc-2d411acc446f"
    }
]


    if(type == 'owners'){
      this.simpleModalService.addModal(OwnerModalComponent,{type: type,data: data});
    } else if (type == 'flats'){
      this.simpleModalService.addModal(FlatModalComponent,{type: type, data: data});
    } else if (type == 'apartments'){
      this.simpleModalService.addModal(ApartmentModalComponent,{type: type, data: data})
    } else if (type == 'users'){
      this.simpleModalService.addModal(UserModalComponent,{type: type, data: data})
    } else if (type == 'lease'){
      this.simpleModalService.addModal(LeaseModalComponent,{type: type, data: data})
    }
  }

}
