import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Observable } from 'rxjs'
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  constructor(private contactService: ContactService) { }
  contacts$!: Observable<Contact[]>

  ngOnInit(): void {
    this.contacts$ = this.contactService.contacts$
  }
}
