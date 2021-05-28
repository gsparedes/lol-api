import 'moment';
import moment from 'moment-timezone';
import Knex, {Config, PoolConfig} from 'knex';

interface IAfterCreateConnection {
  query(command: string, callback: (err: Error) => void): void;
}

const getConfig = (): Config => ({
  client: 'pg',
  searchPath: ['sequence', 'public'],
  connection: {
    bigNumberStrings: true,
    charset: 'utf8',
    database: process.env.FIS_RDS_DB || 'fis',
    host: process.env.FIS_RDS_HOSTNAME || 'localhost',
    password: process.env.FIS_RDS_PASSWORD || 'fispassword',
    port: parseInt(process.env.FIS_RDS_PORT || '5432', 10),
    user: process.env.FIS_RDS_USERNAME || 'fis',
    supportBigNumbers: true,
    connectTimeout: 90000,
  },
  acquireConnectionTimeout: 10000,
  pool: {
    acquireTimeoutMillis: parseInt(process.env.KNEX_POOL_ACQUIRE_TIMEOUT || '60000', 10),
    createTimeoutMillis: parseInt(process.env.KNEX_POOL_CREATE_TIMEOUT || '60000', 10),
    idleTimeoutMillis: parseInt(process.env.KNEX_POOL_IDLE_TIMEOUT || '10000', 10),
    reapIntervalMillis: parseInt(process.env.KNEX_POOL_REAP_INTERVAL_TIMEOUT || '10000', 10),
    createRetryIntervalMillis: parseInt(process.env.KNEX_POOL_CREATE_RETRY_INTERVAL || '200', 10),
    propagateCreateError: false,
    afterCreate(conn: IAfterCreateConnection, done: (err: Error|null, conn: IAfterCreateConnection) => void): void {
      // in this example we use pg driver's connection API
      conn.query(`SET timezone="${(moment).tz.guess()}";`, (err: Error) => {
        if (err) {
          // first query failed, return error and don't try to make next query
          done(err, conn);
        } else {
          done(null, conn);
        }
      });
      conn.query('SET autocommit=0;', (err: Error) => {
        if (err) {
          // first query failed, return error and don't try to make next query
          done(err, conn);
        } else {
          done(null, conn);
        }
      });
    },
    max: parseInt(process.env.FIS_RDS_POOL_SIZE || '4', 10),
    min: 1,
  } as PoolConfig,
  asyncStackTraces: true,
});

interface IPgDbSecret {
  host: string;
  port: number;
  username: string;
  dbname: string;
  password: string;
}

const KnexConnection = (): Promise<Knex> => new Promise<Knex>(async (resolve, reject) => {
  const config = getConfig();
  const db: Knex = Knex(config);
  return resolve(db);
});

export {KnexConnection};
