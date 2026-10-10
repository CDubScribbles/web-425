import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialRequestComponent } from './special-request.component';

describe('SpecialRequestComponent', () => {
  let fixture: ComponentFixture<SpecialRequestComponent>;
  let page: HTMLElement;

  async function render(): Promise<void> {
    fixture = TestBed.createComponent(SpecialRequestComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    page = fixture.nativeElement as HTMLElement;
  }

  function setField(selector: string, value: string): void {
    const field = page.querySelector(selector) as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    field.value = value;
    field.dispatchEvent(new Event(field instanceof HTMLSelectElement ? 'change' : 'input'));
    fixture.detectChanges();
  }

  function fillForm(name: string, request: string, spice: string): void {
    setField('#customerName', name);
    setField('#requestText', request);
    setField('#spiceLevel', spice);
  }

  function submitForm(): void {
    (page.querySelector('input[type="submit"]') as HTMLInputElement).click();
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialRequestComponent]
    }).compileComponents();

    await render();
  });

  it('shows the no-request message and no summary before anything is submitted', () => {
    expect(page.textContent).toContain('No special request has been submitted yet.');
    expect(page.querySelector('.w4-detail-list')).toBeNull();
  });

  it('shows the submitted name, request, and spice level, and keeps them while the guest edits', () => {
    fillForm('Maria', 'Severe peanut allergy, please use clean gloves.', 'Hot');
    submitForm();

    const summary = (): string => (page.querySelector('.w4-detail-list') as HTMLElement).textContent ?? '';
    expect(page.textContent).not.toContain('No special request has been submitted yet.');
    expect(summary()).toContain('Maria');
    expect(summary()).toContain('Hot');
    expect(page.querySelector('#submittedRequest')?.textContent).toContain('Severe peanut allergy');

    setField('#customerName', 'Someone Else');
    setField('#requestText', 'A different request that has not been submitted.');
    setField('#spiceLevel', 'Mild');

    expect(summary()).toContain('Maria');
    expect(summary()).toContain('Hot');
    expect(page.querySelector('#submittedRequest')?.textContent).toContain('Severe peanut allergy');
  });

  it('keeps what the guest typed and submitted after the component is destroyed and re-created', async () => {
    fillForm('Maria', 'Severe peanut allergy, please use clean gloves.', 'Hot');
    submitForm();
    setField('#requestText', 'Updated text that has not been submitted yet.');

    fixture.destroy();
    await render();

    expect((page.querySelector('#customerName') as HTMLInputElement).value).toBe('Maria');
    expect((page.querySelector('#requestText') as HTMLTextAreaElement).value).toBe(
      'Updated text that has not been submitted yet.'
    );
    expect((page.querySelector('#spiceLevel') as HTMLSelectElement).value).toBe('Hot');
    expect(page.querySelector('#submittedRequest')?.textContent).toContain('Severe peanut allergy');
  });
});
