
//VERSIUNEA VECHE
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { DAYS_OF_WEEK } from 'angular-calendar';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
const dates = [
  new Date(2021, 4, 13, 9, 0, 0),
  new Date(2021, 4, 13, 9, 0, 0),
  new Date(2021, 4, 13, 9, 0, 0),
  new Date(2021, 4, 13, 9, 0, 0),
]

//luna a 4-a este MAI!!!!!!
const apiData: any = [{
  start: addHours(startOfDay(dates[0]), 10),
    end: addHours(dates[0], 2),
  title: "Ioan Ionescu1"
},
{
  start: addHours(startOfDay(dates[1]), 10),
    end: addHours(dates[1], 2),
  title: "Ioan Ionescu2"
},
{
  start: addHours(startOfDay(dates[2]), 10),
    end: addHours(dates[2], 2),
  title: "Ioan Ionescu3"
},
{
  start: addHours(startOfDay(dates[3]), 10),
    end: addHours(dates[3], 2),
  title: "Ioan Ionescu4"
}
]

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-calendar-doctor',
  templateUrl: './calendar-doctor.component.html',
  styleUrls: ['./calendar-doctor.component.scss']
})
export class CalendarDoctorComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  excludeDays = DAYS_OF_WEEK.SUNDAY;
  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();
//// The start of a day for 2 September 2014 11:55:00:
 //var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))


  events: CalendarEvent[] = [
    {
      start: addHours(startOfDay(dates[1]), 10),
      end: addHours(dates[1], 0),
      title: 'Marin Gabriel',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: false,
    },
    {
      start: addHours(startOfDay(dates[2]), 10),
      end: addHours(dates[2], 1),
      title: 'Popa Popescu',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: false,
    }
  ];

//events: CalendarEvent[] ;
//  events: CalendarEvent[] = [{
//   start: addHours(startOfDay(dates[1]), 10),
//   end: addHours(dates[1], 0),
//   title: 'Marin Gabriel',
//   color: colors.yellow,
//   actions: this.actions,
//   resizable: {
//     beforeStart: true,
//     afterEnd: true,
//   },
//   draggable: false,
// }]

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal) { 
  this.events = this.presentCalendarData(apiData);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


     presentCalendarData(payload : CalendarEvent[]){
      return payload.map(
          appointment => ({ 
          start:appointment.start,
          end: appointment.end,
          title: appointment.title,
          color: colors.yellow,
          actions: this.actions,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: false,
        })
        );
      }

}

