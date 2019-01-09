import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.scss']
})
export class EventFilterComponent implements OnInit {
  @Output() reloadedEvents: EventEmitter<{query: string, type?: string}> = new EventEmitter();
  searchTerm = '';
  joined = false;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  createEvent(): void {
    this.router.navigate(['/events', 'edit', 'new']);
  }

  toggleJoined(): void {
    this.joined = !this.joined;
    this.reloadEvents();
  }

  searchEventsOnEnter(event) {
    if (event.keyCode === 13) {
      this.reloadEvents();
    }
  }

  reloadEvents(): void {
    this.reloadedEvents.emit({query: this.searchTerm, type: this.joined ? 'joined' : undefined});
  }
}
