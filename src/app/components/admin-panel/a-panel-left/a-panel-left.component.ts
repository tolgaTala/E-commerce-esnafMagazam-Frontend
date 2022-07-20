import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-a-panel-left',
  templateUrl: './a-panel-left.component.html',
  styleUrls: ['./a-panel-left.component.css']
})
export class APanelLeftComponent implements OnInit {

  constructor(
    private toastrService:ToastrService,
  ) { }

  ngOnInit(): void {
  }

  exit() {
    this.toastrService.success("Çıkış Yapılıyor..")
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    window.location.reload();
  }

}
