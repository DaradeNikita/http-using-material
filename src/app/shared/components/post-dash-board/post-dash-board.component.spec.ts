import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDashBoardComponent } from './post-dash-board.component';

describe('PostDashBoardComponent', () => {
  let component: PostDashBoardComponent;
  let fixture: ComponentFixture<PostDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDashBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
