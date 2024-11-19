import { Component } from '@angular/core';
import { UserService } from '../../service/userService/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
interface Column {
  field: string;
  header: string;
}

enum UserColumns {
  id = "ID",
  contact_number = "Contact number",
  contact_email = "Contact email",
  user_type = "User type",
  dob = "Date of birth",
  gender = "Gender",
  pref_smoking = "Preferred smoking",
  pref_drinking = "Preferred drinking",
  pref_veg = "Preferred vegetarian",
  flat_id = "Flat ID",
}
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableModule, InputIconModule, IconFieldModule, CommonModule, FormsModule, ReactiveFormsModule, DropdownModule, InputSwitchModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: Array<{
    contact_email: string;
    contact_number: string;
    password: string;
    user_type: string;
    dob: string
    gender: string;
    pref_smoking: string;
    pref_drinking: string;
    pref_veg: string;
    flat_id: number;
    id: number;
  }>
  columns: Column[] = Object.entries(UserColumns).map(([key, value]) => ({ field: key, header: value }));
  modalTitle: string;
  modalBody: string;
  modalLabel: string;
  userForm: FormGroup;
  formOperationScenario: number;
  gender = [{
    name: 'Male', code: 'M'
  }, {
    name: 'Female', code: 'F'
  }]
  user_type = [{
    name: 'Guest', code: 'Guest'
  }]
  formModalHeader: string;
  constructor(private userService: UserService, private spinner: NgxSpinnerService, private toast: ToastrService) {
    this.users = [];
    this.modalTitle = '';
    this.modalBody = '';
    this.modalLabel = '';
    this.formOperationScenario = 0;
    this.formModalHeader = 'Add User';

    this.userForm = new FormGroup({
      contact_email: new FormControl('', { validators: [Validators.required] }),
      contact_number: new FormControl('', { validators: [Validators.required] }),
      password: new FormControl('', { validators: [Validators.required] }),
      user_type: new FormControl('', { validators: [Validators.required] }),
      dob: new FormControl('', { validators: [Validators.required] }),
      gender: new FormControl('', { validators: [Validators.required] }),
      pref_smoking: new FormControl('', { validators: [Validators.required] }),
      pref_drinking: new FormControl('', { validators: [Validators.required] }),
      pref_veg: new FormControl('', { validators: [Validators.required] }),
      input_pref_smoking: new FormControl(false, { validators: [Validators.required] }),
      input_pref_drinking: new FormControl(false, { validators: [Validators.required] }),
      input_pref_veg: new FormControl(false, { validators: [Validators.required] }),
      flat_id: new FormControl(null),
      id: new FormControl(''),
    })
  }

  inputSwitchChange(fieldName: string) {
    this.userForm.patchValue({
      [fieldName]: this.userForm.get(`input_${fieldName}`)!.value === true ? 'Y' : 'N'
    })
  }
  async getUsers() {
    try {
      this.spinner.show();
      this.users = await this.userService.getUsers();
    } catch (error) {
      this.toast.error('An error occurred while fetching users', 'Error');
    } finally {
      this.spinner.hide();
    }
  }
  async ngOnInit() {
    await this.getUsers();
  }
  addOwner() { }

  async fieldCRUDOperation(action: string, product?: any) {
    if (action === 'addOpen') {
      this.formModalHeader = 'Add User';
      this.formOperationScenario = 1;
      this.userForm.reset();
      this.userForm.patchValue({
        input_pref_smoking: false,
        input_pref_drinking: false,
        input_pref_veg: false,
        pref_smoking: 'N',
        pref_drinking: 'N',
        pref_veg: 'N',
      })
    } else if (action === 'create') {
      const formData = this.userForm.value;
      delete formData.id
      console.log(formData)
      try {
        this.spinner.show();
        const { api_response } = await this.userService.createUser(formData);
        this.toast.success('Add User', 'User added successfully', {
          timeOut: 3000,
        })
        await this.getUsers();
      } catch (error) {
        console.error(error);
        this.spinner.hide();
        this.toast.error('Error', 'Error adding User', {
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
      this.formModalHeader = 'Update User';
      this.userForm.patchValue({
        id: product.id,
        contact_email: product.contact_email,
        contact_number: product.contact_number,
        password: product.password,
        user_type: product.user_type,
        dob: product.dob,
        gender: product.gender,
        pref_smoking: product.pref_smoking,
        pref_drinking: product.pref_drinking,
        pref_veg: product.pref_veg,
        input_pref_smoking: product.pref_smoking === 'Y' ? true : false,
        input_pref_drinking: product.pref_drinking === 'Y' ? true : false,
        input_pref_veg: product.pref_veg === 'Y' ? true : false,
        flat_id: product.flat_id,
      });
    } else if (action === 'update') {
      const formData = this.userForm.value;
  
      try {
        this.spinner.show();
        const { api_response } = await this.userService.updateUser(formData);
        this.toast.success('Update User', 'User updated successfully', {
          timeOut: 3000,
        })
        await this.getUsers();
      } catch (error) {
        console.error(error);
        this.spinner.hide();
        this.toast.error('Error', 'Error updating user', {
          timeOut: 3000,
        })
      } finally {
        this.spinner.hide();
      }
    } else if (action === 'delete') {
      try {
        const formData = this.userForm.value;
        const dataToPass = {
          id: formData.id
        }
        this.spinner.show();
        const { api_response } = await this.userService.deleteUser(dataToPass);
        let header = 'Delete User'
        let message = 'Deleted user successfully'
        this.toast.success(header, message, {
          timeOut: 3000,
        })
        await this.getUsers();
      } 
      catch (error) {
        console.error(error);
        this.spinner.hide();
        this.toast.error('Error', 'Error deleting User', {
          timeOut: 3000,
        })
      } finally {
        this.spinner.hide();
      }
    }
  }
}
