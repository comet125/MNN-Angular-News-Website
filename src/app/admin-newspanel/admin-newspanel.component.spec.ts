import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewspanelComponent } from './admin-newspanel.component';

describe('AdminNewspanelComponent', () => {
  let component: AdminNewspanelComponent;
  let fixture: ComponentFixture<AdminNewspanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNewspanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNewspanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
