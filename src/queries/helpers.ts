import Knex, {Transaction} from 'knex';

export const randomID = () => Math.floor(Math.random() * (9223372036854775807 - 1 + 1) + 1).toString();

export async function getNewID(knex: Knex, transaction: Transaction): Promise<string> {
  const {rows} = (await knex.raw('select sequence.next_id() as id').transacting(transaction));
  const {id} = rows[0];
  return id;
}

export async function getManyIDs(knex: Knex, transaction: Transaction, quantity: number): Promise<string[]> {
  if (!quantity) {
    return [];
  }
  const {rows} = (await
    (knex.raw(
      Array(quantity - 1).fill('select sequence.next_id() as id union').concat(['select sequence.next_id() as id']).join(' '),
    )).transacting(transaction));
  return Promise.resolve(rows.map(({id}: {id: string}) => id));
}
