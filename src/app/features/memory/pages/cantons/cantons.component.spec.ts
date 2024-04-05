import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantonsComponent } from './cantons.component';

describe('CantonsComponent', () => {
  let component: CantonsComponent;
  let fixture: ComponentFixture<CantonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CantonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CantonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
