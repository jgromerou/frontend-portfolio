import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsgithubComponent } from './projectsgithub.component';

describe('ProjectsgithubComponent', () => {
  let component: ProjectsgithubComponent;
  let fixture: ComponentFixture<ProjectsgithubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsgithubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsgithubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
