/**
 * Implement the sub-pub event bus based on Rx.js.
 */

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';


/**
 * Define the event message.
 *
 * @export
 * @interface EventMessage
 */
export interface EventMessage {
  key: string;
  data?: any;
}

/**
 * The pub-sub event bus.
 *
 * @export
 * @class EventManager
 */
export class EventManager {

  constructor() {
    this.eventBus = new Subject<EventMessage>();
  }

  /**
   * Register a event, get a Observable object to subscribe.
   *
   * @template T Any event data type, defined by observer
   * @param {string} subject The event name
   * @returns {Observable<T>} Rx.Observable object
   */
  sub<T>(subject: string): Observable<T> {
    return this.eventBus.asObservable()
      .filter((event) => {
        return event.key === subject;
      }).map((event) => event.data as T);
  }

  /**
   * Publish an event.
   *
   * @param {string} subject The event name
   * @param {*} [data] The event data
   */
  pub<T>(subject: string, data?: T) {
    if (typeof (subject) !== 'string' || !subject.length) {
      throw new Error('The subject must be a string');
    }
    this.eventBus.next({ key: subject, data: data });
  }

  // TODO handle the unsubscribe

  private eventBus: Subject<EventMessage>;
}
