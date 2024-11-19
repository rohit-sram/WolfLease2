import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../service/ownerService/owner.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import { InputIconModule } from 'primeng/inputicon'
import { IconFieldModule } from 'primeng/iconfield'
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

interface Column {
  field: string;
  header: string;
}

enum OwnerColumns {
  id = "ID",
  contact_number = "Contact number",
  contact_email = "Contact email"
}
@Component({
  selector: 'app-owners',
  standalone: true,
  imports: [TableModule, InputIconModule, IconFieldModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './owners.component.html',
  styleUrl: './owners.component.css'
})
export class OwnersComponent implements OnInit {
  owners: Array<{
    id: number;
    contact_number: string;
    contact_email: string;
  }>
  columns: Column[] = Object.entries(OwnerColumns).map(([key, value]) => ({ field: key, header: value }));
  modalTitle: string;
  modalBody: string;
  modalLabel: string;
  ownerForm: FormGroup;
  formOperationScenario: number;
  formModalHeader: string;
  constructor(private ownerService: OwnerService, private spinner: NgxSpinnerService, private toast: ToastrService) {
    this.owners = [];
    this.modalTitle = '';
    this.modalBody = '';
    this.modalLabel = '';
    this.formOperationScenario = 0;
    this.formModalHeader = 'Add Owner';
    this.ownerForm = new FormGroup({
      contact_email: new FormControl('', { validators: [Validators.required] }),
      contact_number: new FormControl('', { validators: [Validators.required] }),
      password: new FormControl('', { validators: [Validators.required] }),
      id: new FormControl(''),
    })
  }
  async getOwners() {
    try {
      this.spinner.show();
      this.owners = await this.ownerService.getOwners();
    } catch (error) {
      this.toast.error('An error occurred while fetching owners', 'Error');
    } finally {
      this.spinner.hide();
    }
  }
  async ngOnInit() {
    await this.getOwners();
  }
  addOwner() { }

  async fieldCRUDOperation(action: string, product?: any) {
    if (action === 'addOpen') {
      this.formModalHeader = 'Add Owner';
      this.formOperationScenario = 1;
      this.ownerForm.reset();
    } else if (action === 'create') {
      const formData = this.ownerForm.value;
      delete formData.id
  
      try {
        this.spinner.show();
        const { api_response } = await this.ownerService.createOwner(formData);
        this.toast.success('Add Owner', 'Owner added successfully', {
          timeOut: 3000,
        })
        await this.getOwners();
      } catch (error) {
        console.error(error);
        this.spinner.hide();
        this.toast.error('Error', 'Error adding Owner', {
          timeOut: 3000,
        })
      } finally {
        this.spinner.hide();
      }
    } else if (action === 'updateOpen') {
      this.modalLabel = 'Delete'
      this.modalTitle = 'Confirm Delete';
      this.modalBody = `Delete contact email: ${product.contact_email}`;
      this.formOperationScenario = 2;
      this.formModalHeader = 'Update Owner';
      this.ownerForm.patchValue({
        id: product.id,
        contact_email: product.contact_email,
        contact_number: product.contact_number,
        password: product.password,
      });
    } else if (action === 'update') {
      const formData = this.ownerForm.value;
  
      try {
        this.spinner.show();
        const { api_response } = await this.ownerService.updateOwner(formData);
        this.toast.success('Update Owner', 'Owner updated successfully', {
          timeOut: 3000,
        })
        await this.getOwners();
      } catch (error) {
        console.error(error);
        this.spinner.hide();
        this.toast.error('Error', 'Error updating owner', {
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

        const { api_response } = await this.ownerService.deleteOwner(dataToPass);
        let header = 'Delete Owner'
        let message = 'Deleted owner successfully'
        this.toast.success(header, message, {
          timeOut: 3000,
        })
        await this.getOwners();
      } 
      catch (error) {
        console.error(error);
        this.spinner.hide();
        this.toast.error('Error', 'Error deleting Owner', {
          timeOut: 3000,
        })
      } finally {
        this.spinner.hide();
      }
    }
  }
}
