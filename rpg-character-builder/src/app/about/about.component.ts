import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [],
  template: `
    <section>
      <h1 data-testid="about-title">{{ pageTitle }}</h1>
    </section>
  `,
})
export class AboutComponent {
  private readonly route = inject(ActivatedRoute);
  readonly pageTitle = this.route.snapshot.data['title'];
}
