import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsercreateComponent } from './admin-usercreate.component';

describe('AdminUsercreateComponent', () => {
  let component: AdminUsercreateComponent;
  let fixture: ComponentFixture<AdminUsercreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUsercreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUsercreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
