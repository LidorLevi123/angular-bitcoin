import { Component, OnInit, inject } from '@angular/core';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-bitcoin';
  private contactService = inject(ContactService)

  ngOnInit(): void {
    this.contactService.loadContacts().subscribe({ error: err => console.log(err) })
  }
}
