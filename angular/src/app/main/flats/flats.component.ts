import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
import { FlatsService } from '../../service/flatsService/flats.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InputSwitchModule } from 'primeng/inputswitch';
interface Column {
  field: string;
  header: string;
}

enum FlatsColumns {
  id = "ID",
  availability = "Availability",
  rent_per_room = "Rent Per Room",
  floor_number = "Floor Number",
  associated_apt_id = "Associated Flat ID",
  lease_id = "Lease ID",
}
@Component({
  selector: 'app-flats',
  standalone: true,
  imports: [TableModule, InputIconModule, IconFieldModule, CommonModule, FormsModule, ReactiveFormsModule, InputSwitchModule],
  templateUrl: './flats.component.html',
  styleUrl: './flats.component.css'
})
export class FlatsComponent {
  flats: Array<{
    id: number;
    availability: number;
    rent_per_room: number;
    associated_apt_id: number;
    lease_id: number;
    floor_number: number;
  }> = [];
  filteredFlats: Array<{
    id: number;
    availability: number;
    rent_per_room: number;
    floor_number: number;
    associated_apt_id: number;
    lease_id: number;
  }> = [];
  columns: Column[] = Object.entries(FlatsColumns).map(([key, value]) => ({ field: key, header: value }));
  modalTitle: string;
  modalBody: string;
  modalLabel: string;
  flatForm: FormGroup;
  filterForm: FormGroup;
  formOperationScenario: number;
  formModalHeader: string;
  constructor(private flatService: FlatsService, private spinner: NgxSpinnerService, private toast: ToastrService, private formBuilder: FormBuilder) {
    this.flats = [];
    this.modalTitle = '';
    this.modalBody = '';
    this.modalLabel = '';
    this.formOperationScenario = 0;
    this.formModalHeader = 'Add Flat';
    this.flatForm = new FormGroup({
      id: new FormControl(''),
      availability: new FormControl('', { validators: [Validators.required] }),
      input_availability: new FormControl(false, { validators: [Validators.required] }),
      rent_per_room: new FormControl('', { validators: [Validators.required] }),
      floor_number: new FormControl('', { validators: [Validators.required] }),
      associated_apt_id: new FormControl('', { validators: [Validators.required] }),
      lease_id: new FormControl(null),
    });
    this.filterForm = new FormGroup({
      rentMin: new FormControl(''),
      rentMax: new FormControl(''),
      availability: new FormControl(''),
      floorNumber: new FormControl(''),
      associatedAptId: new FormControl(''),
      leaseId: new FormControl('')
    });
  }

  applyFilters() {
    this.filteredFlats = this.flats.filter(flat => {
      const rentMin = this.filterForm.get('rentMin')?.value;
      const rentMax = this.filterForm.get('rentMax')?.value;
      const availability = this.filterForm.get('availability')?.value;
      const floorNumber = this.filterForm.get('floorNumber')?.value;
      const associatedAptId = this.filterForm.get('associatedAptId')?.value;
      const leaseId = this.filterForm.get('leaseId')?.value;
  
      return (
        (!rentMin || flat.rent_per_room >= rentMin) &&
        (!rentMax || flat.rent_per_room <= rentMax) &&
        (availability === '' || flat.availability === Number(availability)) &&
        (!floorNumber || this.checkFloorNumber(flat.floor_number, floorNumber)) &&
        (!associatedAptId || flat.associated_apt_id === Number(associatedAptId)) &&
        (!leaseId || flat.lease_id === Number(leaseId))
      );
    });
  }

  checkFloorNumber(flatFloor: number, filterValue: string): boolean {
    if (filterValue === '< 2nd floor') {
      return flatFloor < 2;
    }
    // Add more conditions as needed
    return true;
  }

  inputSwitchChange(fieldName: string) {
    this.flatForm.patchValue({
      [fieldName]: this.flatForm.get(`input_${fieldName}`)!.value === true ? 1 : 0
    })
  }
  async getFlats() {
    try {
      this.spinner.show();
      this.flats = await this.flatService.getFlats();
      this.filteredFlats = [...this.flats];
    } catch (error) {
      this.toast.error('An error occurred while fetching flats', 'Error');
    } finally {
      this.spinner.hide();
    }
  }
  async ngOnInit() {
    await this.getFlats();
    
  }
  addOwner() { }

  async fieldCRUDOperation(action: string, product?: any) {
    if (action === 'addOpen') {
      this.formModalHeader = 'Add Flat';
      this.formOperationScenario = 1;
      this.flatForm.reset();
      this.flatForm.patchValue({
        input_availability: false,
        availability: false,
      })
    } else if (action === 'create') {
      const formData = this.flatForm.value;
      delete formData.id
  
      try {
        this.spinner.show();
        const { api_response } = await this.flatService.createFlat(formData);
        this.toast.success('Add Flat', 'Flat added successfully', {
          timeOut: 3000,
        })
        await this.getFlats();
      } catch (error) {
        console.error(error);
        this.spinner.hide();
        this.toast.error('Error', 'Error adding Flat', {
          timeOut: 3000,
        })
      } finally {
        this.spinner.hide();
      }
    } else if (action === 'updateOpen') {
      this.modalLabel = 'Delete'
      this.modalTitle = 'Confirm Delete';
      this.modalBody = `Delete Flat id: ${product.id}`;
      this.formOperationScenario = 2;
      this.formModalHeader = 'Update Flat';
      this.flatForm.patchValue({
        id: product.id,
        availability: product.availability,
        rent_per_room: product.rent_per_room,
        floor_number: product.floor_number,
        associated_apt_id: product.associated_apt_id,
        lease_id: product.lease_id,
        input_availability: product.availability
      });
    } else if (action === 'update') {
      const formData = this.flatForm.value;
      console.log(formData)
      try {
        this.spinner.show();
        const { api_response } = await this.flatService.updateFlat(formData);
        this.toast.success('Update Flat', 'Flat updated successfully', {
          timeOut: 3000,
        })
        await this.getFlats();
      } catch (error) {
        console.error(error);
        this.spinner.hide();
        this.toast.error('Error', 'Error updating Flat', {
          timeOut: 3000,
        })
      } finally {
        this.spinner.hide();
      }
    } else if (action === 'delete') {
      try {
        const formData = this.flatForm.value;
        const dataToPass = {
          id: formData.id
        }
        this.spinner.show();

        const { api_response } = await this.flatService.deleteFlat(dataToPass);
        let header = 'Delete Flat'
        let message = 'Deleted Flat successfully'
        this.toast.success(header, message, {
          timeOut: 3000,
        })
        await this.getFlats();
      } 
      catch (error) {
        console.error(error);
        this.spinner.hide();
        this.toast.error('Error', 'Error deleting Flat', {
          timeOut: 3000,
        })
      } finally {
        this.spinner.hide();
      }
    }
  }

}
