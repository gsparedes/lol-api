import Knex from 'knex';
import {KnexConnection} from '@/queries/config';

let init: boolean = false;
let knex: Knex|null = null;

export default (): Promise<Knex> => new Promise(async (resolve, reject) => {
  try {
    if (!init) {
      knex = await KnexConnection();
      init = true;
    }
    if (!knex) {
      throw new Error('Knex not defined when it was expected  to be');
    }
    resolve(knex);
  } catch (e) {
    reject(e);
  }
});

export {knex};
