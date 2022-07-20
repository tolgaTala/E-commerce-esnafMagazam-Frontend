import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  userId = parseInt(localStorage.getItem('userId'));
  addresses: Address[];
  address: Address;
  addressAddSelect: boolean = false;
  addressUpdateSelect: boolean = false;
  addressForm: FormGroup;
  addressForm2: FormGroup;

  closebtn = document.querySelector('#close');
  addmodal = document.querySelector('#myModal');

  constructor(
    private addressService: AddressService,
    private toastrService: ToastrService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAddresses();
    this.createAddressForm();
    
  }

  getAddresses() {
    this.addressService.getByUserId(this.userId).subscribe((response) => {
      this.addresses = response.data;
    });
  }

  getById(addressId: number) {
    this.addressService.getById(addressId).subscribe((response) => {
      this.address = response.data;
    });
  }

  createAddressForm() {
    this.addressForm = this.formBuilder.group({
      userId: [this.userId],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      addressHead: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      street: ['', Validators.required],
      addressDetail: ['', Validators.required],
    });
  }
 

  selectAddAdress() {
    this.addressAddSelect = true;
  }
  addClose() {
    this.addressAddSelect=false
  }
  updateClose() {
    this.addressUpdateSelect=false
  }
  addressAdd() {    
    if (this.addressForm.valid) {      
      let addressModel = Object.assign({}, this.addressForm.value);
      addressModel.userId = this.userId;
      console.log(addressModel.userId);
      console.log(addressModel);
      this.addressService.add(addressModel).subscribe((response) => {
        this.toastrService.success(response.message);
        this.addressAddSelect=false
        this.ngOnInit();
      });
    } else {
      this.toastrService.error('Boş bırakmayınız');
    }
  }

  realAddressUpdate() {
    let addressModal =Object.assign({},this.addressForm2.value);
    this.addressService.update(addressModal).subscribe((response) => {
      this.toastrService.info(response.message);
      this.addressUpdateSelect=false
      this.ngOnInit();
      
    });

  }
  addressUpdate(addressId: number) {
    this.addressUpdateSelect = true;
    this.addressService.getById(addressId).subscribe((datam) => {
      var addressModal = datam.data;
      console.log(addressModal);
      
      this.addressForm2 = this.formBuilder.group({
        addressId:[addressModal.addressId],
        userId: [this.userId],
        firstName: [addressModal.firstName, Validators.required],
        lastName: [addressModal.lastName, Validators.required],
        addressHead: [addressModal.addressHead, Validators.required],
        phoneNumber: [addressModal.phoneNumber, Validators.required],
        street: [addressModal.street, Validators.required],
        addressDetail: [addressModal.addressDetail, Validators.required],
      });
    });
  }

  addressDelete(addressId: number) {
    this.addressService.delete(addressId).subscribe((response) => {
      this.toastrService.info(response.message);
      this.ngOnInit();
    });
  }
}