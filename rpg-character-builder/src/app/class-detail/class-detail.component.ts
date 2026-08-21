import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-class-detail',
  imports: [RouterLink],
  template: `
    <section data-testid="class-detail-page">
      <h1>Class Details</h1>
      <p>Selected class ID: <span data-testid="class-id">{{ classId }}</span></p>
      <a routerLink="/classes">Back to classes</a>
    </section>
  `,
})
export class ClassDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly classId = this.route.snapshot.paramMap.get('id');
}
