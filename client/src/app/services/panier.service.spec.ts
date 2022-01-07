import { TestBed } from '@angular/core/testing';

import { PanierService } from './panier.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('PanierService', () => {
  let service: PanierService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
