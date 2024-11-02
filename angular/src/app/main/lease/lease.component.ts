import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
import { LeaseService } from '../../service/leaseService/lease.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

interface Column {
  field: string;
  header: string;
}

enum OwnerColumns {
  id = "ID",
  lease_start_date = "Lease Start Date",
  lease_end_date = "Lease End Date",
}
@Component({
  selector: 'app-lease',
  standalone: true,
  imports: [TableModule, InputIconModule, IconFieldModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './lease.component.html',
  styleUrl: './lease.component.css'
})
export class LeaseComponent {
  leases: Array<{
    id: number;
    lease_start_date: string;
    lease_end_date: string;
  }>
  columns: Column[] = Object.entries(OwnerColumns).map(([key, value]) => ({ field: key, header: value }));
  modalTitle: string;
  modalBody: string;
  modalLabel: string;
  ownerForm: FormGroup;
  formOperationScenario: number;
  formModalHeader: string;
  constructor(private leaseService: LeaseService, private spinner: NgxSpinnerService, private toast: ToastrService) {
    this.leases = [];
    this.modalTitle = '';
    this.modalBody = '';
    this.modalLabel = '';
    this.formOperationScenario = 0;
    this.formModalHeader = 'Add Lease';
    this.ownerForm = new FormGroup({
      lease_start_date: new FormControl('', { validators: [Validators.required] }),
      lease_end_date: new FormControl('', { validators: [Validators.required] }),
      id: new FormControl(''),
    })
  }
  async getLeases() {
    try {
      this.spinner.show();
      this.leases = await this.leaseService.getLeases();
    } catch (error) {
      this.toast.error('An error occurred while fetching leases', 'Error');
    } finally {
      this.spinner.hide();
    }
  }
  async ngOnInit() {
    await this.getLeases();
  }
  addOwner() { }

  async fieldCRUDOperation(action: string, product?: any) {
    if (action === 'addOpen') {
      this.formModalHeader = 'Add Lease';
      this.formOperationScenario = 1;
      this.ownerForm.reset();
    } else if (action === 'create') {
      const formData = this.ownerForm.value;
      delete formData.id
  
      try {
        this.spinner.show();
        const { api_response } = await this.leaseService.createLease(formData);
        this.toast.success('Add Lease', 'Lease added successfully', {
          timeOut: 3000,
        })
        await this.getLeases();
      } catch (error) {
        console.error(error);
        this.spinner.hide();
        this.toast.error('Error', 'Error adding Lease', {
          timeOut: 3000,
        })
      } finally {
        this.spinner.hide();
      }
    } else if (action === 'updateOpen') {
      this.modalLabel = 'Delete'
      this.modalTitle = 'Confirm Delete';
      this.modalBody = `Delete lease id: ${product.id}`;
      this.formOperationScenario = 2;
      this.formModalHeader = 'Update Lease';
      this.ownerForm.patchValue({
        id: product.id,
        lease_start_date: product.lease_start_date,
        lease_end_date: product.lease_end_date,
        password: product.password,
      });
    } else if (action === 'update') {
      const formData = this.ownerForm.value;
  
      try {
        this.spinner.show();
        const { api_response } = await this.leaseService.updateLease(formData);
        this.toast.success('Update Lease', 'Lease updated successfully', {
          timeOut: 3000,
        })
        await this.getLeases();
      } catch (error) {
        console.error(error);
        this.spinner.hide();
        this.toast.error('Error', 'Error updating lease', {
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

        const { api_response } = await this.leaseService.deleteLease(dataToPass);
        let header = 'Delete Lease'
        let message = 'Deleted lease successfully'
        this.toast.success(header, message, {
          timeOut: 3000,
        })
        await this.getLeases();
      } 
      catch (error) {
        console.error(error);
        this.spinner.hide();
        this.toast.error('Error', 'Error deleting Lease', {
          timeOut: 3000,
        })
      } finally {
        this.spinner.hide();
      }
    }
  }
}
