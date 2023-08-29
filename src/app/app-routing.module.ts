import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { contactResolver } from './resolvers/contact.resolver';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'contact', component: ContactPageComponent },
  {
    path: 'contact/:id',
    component: ContactDetailsComponent,
    canActivate: [authGuard],
    resolve: { contact: contactResolver }
  },
  { path: 'edit', component: ContactEditComponent },
  { path: 'edit/:id', component: ContactEditComponent, resolve: { contact: contactResolver } }
]
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
