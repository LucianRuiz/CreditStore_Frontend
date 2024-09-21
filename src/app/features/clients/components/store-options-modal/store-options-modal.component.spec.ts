import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOptionsModalComponent } from './store-options-modal.component';

describe('StoreOptionsModalComponent', () => {
  let component: StoreOptionsModalComponent;
  let fixture: ComponentFixture<StoreOptionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreOptionsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreOptionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
