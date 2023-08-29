import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  private contactService = inject(ContactService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private fb = inject(FormBuilder)

  form!: FormGroup
  contact!: Contact

  constructor() {
    this.form = this.fb.group({
      name: [''],
      phone: [''],
      email: ['']
    })
  }

  ngOnInit(): void {
    this.route.data
      .pipe(
        map(data => data['contact'] ? data['contact'] : this.contactService.getEmptyContact()),
        filter(contact => !!contact)
      )
      .subscribe(contact => {
        this.contact = contact
        this.form.patchValue(contact)
      })
  }

  onSaveContact() {
    const contact = { ...this.form.value, ...this.contact }
    this.contactService.saveContact(contact)
      .subscribe({
        next: () => this.router.navigateByUrl('/contact'),
        error: err => console.log('err:', err)
      })
  }
}
