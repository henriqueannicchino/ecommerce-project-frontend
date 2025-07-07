import { TestBed } from '@angular/core/testing';

import { AnnShopFormService } from './ann-shop-form.service';

describe('AnnShopFormService', () => {
  let service: AnnShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
