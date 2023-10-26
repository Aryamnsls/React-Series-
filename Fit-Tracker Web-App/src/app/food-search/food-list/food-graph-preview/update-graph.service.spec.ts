import { TestBed } from '@angular/core/testing';

import { UpdateGraphService } from './update-graph.service';

describe('UpdateGraphService', () => {
  let service: UpdateGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
