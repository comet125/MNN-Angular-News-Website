import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserpanelComponent } from './admin-userpanel.component';

describe('AdminUserpanelComponent', () => {
  let component: AdminUserpanelComponent;
  let fixture: ComponentFixture<AdminUserpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserpanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
