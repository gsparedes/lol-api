import {logger} from '@/helpers';
import KnexConnection from '@/knex';
import EventEmitter from 'events';
import Knex from 'knex';

/**
 * @class AppQueries
 * @classdesc Application Queries
 * @property {Disbursements} this.Disbursements - Disbursements Queries
 * @property {Enrollments} this.Enrollments - Enrollments Queries
 * @property {Offers} this.Offers - Offers Queries
 * @property {Sessions} this.Sessions - Sessions Queries
 * @property {Transactions} this.Transactions - Transactions Queries
 * @this AppQueries
 */
class AppQueries extends EventEmitter {
  public knex!: Knex;

  constructor() {
    super();
    KnexConnection().then((knex: Knex) => {
      this.knex = knex;
      /* this.Disbursements = new Disbursements(knex, logger);
      this.Enrollments = new Enrollments(knex, logger);
      this.Offers = new Offers(knex, logger);
      this.Sessions = new Sessions(knex, logger);
      this.Transactions = new Transactions(knex, logger); */
      this.emit('ready', this);
    });
  }
}

const queries = new AppQueries();

export default queries;

export {AppQueries};
