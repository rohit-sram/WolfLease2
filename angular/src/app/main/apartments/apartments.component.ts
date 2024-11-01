import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
import { ApartmentService } from '../../service/apartmentService/apartment.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
interface Column {
  field: string;
  header: string;
}

enum ApartmentsColumns {
  id = "ID",
  address = "Address",
  facilities = "Facilities",
  owner_id = "Owner ID"
}
@Component({
  selector: 'app-apartments',
  standalone: true,
  imports: [TableModule, InputIconModule, IconFieldModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './apartments.component.html',
  styleUrl: './apartments.component.css'
})
export class ApartmentsComponent {
  apartments: Array<{
    id: number;
    address: string;
    facilities: string;
    owner_id: number;
  }>
  columns: Column[] = Object.entries(ApartmentsColumns).map(([key, value]) => ({ field: key, header: value }));
  modalTitle: string;
  modalBody: string;
  modalLabel: string;
  ownerForm: FormGroup;
  formOperationScenario: number;
  formModalHeader: string;
  constructor(private apartmentService: ApartmentService, private spinner: NgxSpinnerService, private toast: ToastrService) {
    this.apartments = [];
    this.modalTitle = '';
    this.modalBody = '';
    this.modalLabel = '';
    this.formOperationScenario = 0;
    this.formModalHeader = 'Add Apartment';
    this.ownerForm = new FormGroup({
      owner_id: new FormControl(null),
      address: new FormControl('', { validators: [Validators.required] }),
      facilities: new FormControl('', { validators: [Validators.required] }),
      id: new FormControl(''),
    })
  }
  async getApartments() {
    try {
      this.spinner.show();
      this.apartments = await this.apartmentService.getApartments();
    } catch (error) {
      this.toast.error('An error occurred while fetching apartments', 'Error');
    } finally {
      this.spinner.hide();
    }
  }
  async ngOnInit() {
    await this.getApartments();
  }
  addOwner() { }

  async fieldCRUDOperation(action: string, product?: any) {
    if (action === 'addOpen') {
      this.formModalHeader = 'Add Apartment';
      this.formOperationScenario = 1;
      this.ownerForm.reset();
    } else if (action === 'create') {
      const formData = this.ownerForm.value;
      delete formData.id
  
      try {
        this.spinner.show();
        const { api_response } = await this.apartmentService.createApartment(formData);
        this.toast.success('Add Apartment', 'Apartment added successfully', {
          timeOut: 3000,
        })
        await this.getApartments();
      } catch (error) {
        console.error(error);
        this.spinner.hide();
        this.toast.error('Error', 'Error adding Apartment', {
          timeOut: 3000,
        })
      } finally {
        this.spinner.hide();
      }
    } else if (action === 'updateOpen') {
      this.modalLabel = 'Delete'
      this.modalTitle = 'Confirm Delete';
      this.modalBody = `Delete apartment id: ${product.id}`;
      this.formOperationScenario = 2;
      this.formModalHeader = 'Update Apartment';
      this.ownerForm.patchValue({
        id: product.id,
        address: product.address,
        facilities: product.facilities,
        owner_id: product.owner_id,
      });
    } else if (action === 'update') {
      const formData = this.ownerForm.value;
      console.log(formData)
      try {
        this.spinner.show();
        const { api_response } = await this.apartmentService.updateApartment(formData);
        this.toast.success('Update Apartment', 'Apartment updated successfully', {
          timeOut: 3000,
        })
        await this.getApartments();
      } catch (error) {
        console.error(error);
        this.spinner.hide();
        this.toast.error('Error', 'Error updating apartment', {
          timeOut: 3000,
        })
      } finally {
        this.spinner.hide();
      }
    } else if (action === 'delete') {
      try {
        const formData = this.ownerForm.value;
        const dataToPass = {
          id: formData.id
        }
        this.spinner.show();

        const { api_response } = await this.apartmentService.deleteApartment(dataToPass);
        let header = 'Delete Apartment'
        let message = 'Deleted apartment successfully'
        this.toast.success(header, message, {
          timeOut: 3000,
        })
        await this.getApartments();
      } 
      catch (error) {
        console.error(error);
        this.spinner.hide();
        this.toast.error('Error', 'Error deleting Apartment', {
          timeOut: 3000,
        })
      } finally {
        this.spinner.hide();
      }
    }
  }
}
