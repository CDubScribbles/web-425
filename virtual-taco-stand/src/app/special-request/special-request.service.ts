import { Injectable } from '@angular/core';

export interface SpecialRequest {
  customerName: string;
  requestText: string;
  spiceLevel: string;
}

/**
 * Holds the in-progress form values and the last submitted request.
 * Because this service lives for the whole session, nothing the guest types
 * is lost when they edit another field, submit, or leave the page and return.
 * Only a full page reload clears it.
 */
@Injectable({ providedIn: 'root' })
export class SpecialRequestService {
  draft: SpecialRequest = {
    customerName: '',
    requestText: '',
    spiceLevel: 'Mild'
  };

  submitted: SpecialRequest | null = null;

  submit(): void {
    // Copy the draft so later edits do not change what was submitted.
    this.submitted = { ...this.draft };
  }
}
