import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosGithubComponent } from './proyectos-github.component';

describe('ProyectosGithubComponent', () => {
  let component: ProyectosGithubComponent;
  let fixture: ComponentFixture<ProyectosGithubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectosGithubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosGithubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
