import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `<header class="jumbotron"><h1>Reece Address Book</h1></header>
      <div class="container">
      <address-book></address-book>
      <template ngbModalContainer></template>
    </div>`,
    styleUrls: ['app.component.css']
})
export class AppComponent {
}

