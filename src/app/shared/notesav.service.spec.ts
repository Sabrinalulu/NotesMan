import { TestBed } from '@angular/core/testing';

import { NotesavService } from './notesav.service';

describe('NotesavService', () => {
  let service: NotesavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
