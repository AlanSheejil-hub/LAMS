import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDesignationComponent } from './edit-designation.component';

describe('EditDesignationComponent', () => {
  let component: EditDesignationComponent;
  let fixture: ComponentFixture<EditDesignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDesignationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
