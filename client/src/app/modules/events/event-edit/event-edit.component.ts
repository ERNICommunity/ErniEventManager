import { Observable } from 'rxjs';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../../services/event/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEventSchema, IEventLocation } from '../../../interfaces';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  // Careful with variable naming, 'event' is global var in ECMA Script
  @Output() iEvent: IEventSchema;
  isCreate = false;
  eventForm: FormGroup;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.iEvent = new IEventSchema();
    this.eventForm = this.getEventForm();
   }

  ngOnInit() {
    this.setIsCreateState();
    if (!this.isCreate) {
      this.getEvent().subscribe(
        (receivedEvent) => {
          this.iEvent = receivedEvent;
          this.setEventFormValues(receivedEvent);
        },
        (error) => {
          this.router.navigate(['/']);
        }
      );
    } else {
      this.setEventFormValues(this.iEvent);
    }
    this.setEventFormValidators();
  }

  public create(): void {
    this.updateEventSchema();
    this.eventService.createEvent(this.iEvent)
      .subscribe(
        (event) => {
          this.router.navigate(['/']);
        },
        (error) => {
          console.log('Following error appeared: ', error);
        }
      );
  }

  public edit(): void {
    this.updateEventSchema();
    this.eventService.editEvent(this.route.snapshot.params['id'], this.iEvent)
      .subscribe((event) => {
        this.router.navigate(['/']);
      },
        (reason) => {
          console.log('Following error appeared: ', reason);
        }
      );
  }

  public cancel(): void {
    this.router.navigate(['/']);
  }

  public getEvent(): Observable<IEventSchema> {
    return this.eventService.getEvent(this.route.snapshot.params['id']);
  }

  private setIsCreateState(): void {
    if (this.route.snapshot.params['id'] === 'new') {
      this.isCreate = true;
    } else {
      this.isCreate = false;
    }
  }

  /**
   * Binding Event object to form model
   */
  private updateEventSchema(): void {
    const toBoolean = (value: String): boolean =>  !value || value === 'false' ? false : true;
    this.iEvent.name = this.eventForm.controls.name.value;
    // FIXME: probably needed only for new event attributes which are not in formerly created events, can be removed later
    if (!this.iEvent.location) {
      this.iEvent.location = new IEventLocation();
    }
    this.iEvent.location.address = this.eventForm.controls.location.value;
    this.iEvent.startDate = this.fromBrowserDate(this.eventForm.controls.dateStart.value);
    this.iEvent.endDate = this.fromBrowserDate(this.eventForm.controls.dateEnd.value);
    this.iEvent.description = this.eventForm.controls.description.value;
    this.iEvent.limit = this.eventForm.controls.participantsLimit.value;
    this.iEvent.transportBus = toBoolean(this.eventForm.controls.transport.value.bus);
    this.iEvent.transportCar = toBoolean(this.eventForm.controls.transport.value.car);
    this.iEvent.accommodation = toBoolean(this.eventForm.controls.accommodation.value);
  }

  /**
   * Structure definition needed for template rendering
   */
  private getEventForm(): FormGroup {
    return new FormGroup({
      'name': new FormControl(null),
      'location': new FormControl(null),
      'dateStart': new FormControl(null),
      'dateEnd': new FormControl(null),
      'description': new FormControl(null),
      'participantsLimit': new FormControl(null),
      'transport': new FormGroup({
        'bus': new FormControl(null),
        'car': new FormControl(null)
      }),
      'accommodation': new FormControl(null)
    });
  }

  private setEventFormValues(iEvent: IEventSchema): void {
    const todayString = this.toBrowserDate(new Date());
    const valueOrDefault = (value: any, defaultValue?: any): any => value ? value : defaultValue ? defaultValue : '';
    this.eventForm.setValue({
      'name': valueOrDefault(iEvent.name),
      'location': iEvent.location ? valueOrDefault(iEvent.location.address) : '',
      'dateStart': valueOrDefault(this.toBrowserDate(iEvent.startDate), todayString),
      'dateEnd': valueOrDefault(this.toBrowserDate(iEvent.endDate), todayString),
      'description': valueOrDefault(iEvent.description),
      'participantsLimit': valueOrDefault(iEvent.limit),
      transport: {
        'car': valueOrDefault(iEvent.transportBus),
        'bus': valueOrDefault(iEvent.transportCar)
      },
      'accommodation': valueOrDefault(iEvent.accommodation.toString())
    });
  }

  private setEventFormValidators(): void {
    this.eventForm.controls.name.setValidators([Validators.required, Validators.minLength(5), Validators.maxLength(140)]);
    this.eventForm.controls.location.setValidators([Validators.required]);
    this.eventForm.controls.dateStart.setValidators([Validators.required]);
    this.eventForm.controls.dateEnd.setValidators([Validators.required]);
    this.eventForm.controls.description.setValidators([]);
    this.eventForm.controls.participantsLimit.setValidators([]);
    (<FormGroup>this.eventForm.controls['transport']).controls['car'].setValidators([]);
    (<FormGroup>this.eventForm.controls['transport']).controls['bus'].setValidators([]);
    this.eventForm.controls.accommodation.setValidators([]);
  }

  private toBrowserDate(date: Date): String {
    const properDate = new Date(date.toString()); // Dirty hack, because sometimes date is passed as String, like WTF TypeScript?!
    const year = properDate.getFullYear();
    const month = properDate.getMonth() < 9 ? '0' + (properDate.getMonth() + 1) : properDate.getMonth() + 1;
    const day = properDate.getDate() < 10 ?  '0' + properDate.getDate() : properDate.getDate();
    return year + '-' + month + '-' + day;
  }

  private fromBrowserDate(date: String): Date {
    const numbers = date.split('-');
    return new Date(Number(numbers[0]), Number(numbers[2]) - 1, Number(numbers[1]));
  }

}
