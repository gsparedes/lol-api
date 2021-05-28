import Knex from 'knex';
import KnexConnection from '@/knex';
import {EventEmitter} from 'events';

export default class AppQueries extends EventEmitter {
  public static self: AppQueries;
  public static initialize(instance: AppQueries) {
    if (!self) {
      AppQueries.self = instance;
      KnexConnection()
        .then((knex) => {
          AppQueries.self.#knex = knex;
        })
        .catch((e) => AppQueries.self.emit('error', e));
    } else {
      throw TypeError('There is already an instance of the AppQueries class!');
    }
  }
  #knex: Knex|null;
  constructor() {
    super();
    this.#knex = null;
    AppQueries.initialize(this);
  }
}
