import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IssComponent } from './iss.component';

describe('IssComponent', () => {
  let component: IssComponent;
  let fixture: ComponentFixture<IssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
