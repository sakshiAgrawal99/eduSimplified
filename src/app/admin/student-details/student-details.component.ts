import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent {
  constructor(
    protected modalService: ModalService,
    private toastrService: ToastrService
  ) {}

  public showSuccess(): void {
    this.toastrService.success('Message Success!', 'Title Success!');
  }
}
