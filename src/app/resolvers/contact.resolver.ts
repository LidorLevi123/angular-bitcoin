import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { delay } from 'rxjs';
import { Contact } from '../models/contact.model';
import { ContactService } from '../services/contact.service';
import { LoaderService } from '../services/loader.service';

export const contactResolver: ResolveFn<Contact> = (route, state) => {
  inject(LoaderService).setIsLoading(true)
  const id = route.params['id']
  return inject(ContactService).getContactById(id).pipe(delay(100))
}