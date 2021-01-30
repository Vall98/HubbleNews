import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoInternetComponent } from './no-internet.component';

describe('NoInternetComponent', () => {
  let component: NoInternetComponent;
  let fixture: ComponentFixture<NoInternetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoInternetComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoInternetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
