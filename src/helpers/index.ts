import Log from '@/logger';
import {chain, isObject, transform, snakeCase} from 'lodash';
import {NextFunction, Request, Response} from 'express';
import {IStateUpdatePath, JSONArray, JSONObject, JSONPrimitive} from '@/typings';
import {BadRequestError} from '@/helpers/errors';

export const logger = Log.logger;

export const isDate = (obj: object) => Object.prototype.toString.call(obj) === '[object Date]';

export const shouldMock = (api: string) => {
  const MOCK = process.env.MOCK || '';
  return MOCK.indexOf(api) !== -1 || MOCK.indexOf('*') !== -1;
};

export function getHeader(request: Request, name: string) {
  return request.headers[toTitleCase(name)]
    || request.headers[name.toLowerCase()]
    || request.headers[name.toUpperCase()];
}

export function toTitleCase(str: string) {
  const smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i;
  const alphanumericPattern = /([A-Za-z0-9\u00C0-\u00FF])/;
  const wordSeparators = /([ :–—-])/;

  return str.split(wordSeparators)
    .map((current: string, index: number, array: string[]) => {
      if (
        /* Check for small words */
        current.search(smallWords) > -1 &&
        /* Skip first and last word */
        index !== 0 &&
        index !== array.length - 1 &&
        /* Ignore title end and subtitle start */
        array[index - 3] !== ':' &&
        array[index + 1] !== ':' &&
        /* Ignore small words that start a hyphenated phrase */
        (array[index + 1] !== '-' ||
          (array[index - 1] === '-' && array[index + 1] === '-'))
      ) {
        return current.toLowerCase();
      }

      /* Ignore intentional capitalization */
      if (current.substr(1).search(/[A-Z]|\../) > -1) {
        return current;
      }

      /* Ignore URLs */
      if (array[index + 1] === ':' && array[index + 2] !== '') {
        return current;
      }

      /* Capitalize the first letter */
      return current.replace(alphanumericPattern, function m(match) {
        return match.toUpperCase();
      });
    })
    .join('');
}

export function wrapAsync(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next);
  };
}

export const methodToAction = (req: Request) => {
  const map: { [key: string]: string } = {
    DELETE: 'delete',
    PATCH: 'patch',
    POST: 'create',
    PUT: 'update',
  };
  return map[req.method];
};

export function toSnakeCase(
  obj: JSONObject|JSONPrimitive|JSONArray,
  options: {ignoreTransformByKey?: string[]; ignoreSnakeKey?: string[]} = {
    ignoreTransformByKey: [],
    ignoreSnakeKey: [],
  },
  pathNest: Array<{[key: string]: JSONObject|JSONPrimitive}> = [],
  path: string[] = [],
): JSONObject|JSONPrimitive {
  if (typeof obj !== 'object') {
    return obj;
  } else if (obj === null) {
    return null;
  } else if (obj.hasOwnProperty('ID')) {
    delete (obj as {ID?: string}).ID;
  }
  return chain(obj)
    .mapKeys((value: JSONObject|JSONPrimitive|JSONArray, key: string) => {
      const shouldIgnore = (options.ignoreSnakeKey || []).findIndex((i) => i === key) !== -1;
      if (shouldIgnore) {
        return key;
      }
      return snakeCase(key);
    })
    .mapValues((value: JSONObject|JSONPrimitive|JSONArray, key: string) => {
      const parsedPath = [...path, key].join('.');
      const pathHandler = pathNest.find((p) => p[parsedPath]);
      if (
        value &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        (value as {ID?: string}).hasOwnProperty('ID')
      ) {
        delete (value as {ID?: string}).ID;
      }
      if (pathHandler) {
        const defaultValue = pathHandler[parsedPath];
        if (value === null) {
          return defaultValue;
        }
        return transform(
          // tslint:disable-next-line:no-any
          value as any,
          function transformFunction(current: JSONObject, v: JSONObject|JSONPrimitive|JSONArray, k: string) {
            let val;
            if (Array.isArray(v) && v.length) {
              val = v[0];
            } else {
              val = v;
            }
            const [name, ...subValue] = snakeCase(k).split('_');
            if (name === 'id') {
              return current;
            }
            let prop: JSONObject;
            if (!current?.hasOwnProperty(name)) {
              prop = {};
            } else {
              prop = current[name] as JSONObject;
            }
            if (subValue.length) {
              prop[subValue.join('_')] = val || null;
            }
            current[name] = prop;
            return current;
          },
          {});
      }
      if (
        (!isObject(value) && !Array.isArray(value))
        || isDate(value)
        || (options.ignoreTransformByKey || []).includes(key)) {
        return value;
      }
      if (!Array.isArray(value)) {
        return toSnakeCase(value, options, pathNest, [...path, key]);
      }
      return (value as JSONArray).map((v) => toSnakeCase(v, options, pathNest, [...path, key]));
    })
    .value();
}

export * from './auth';
export * from './env';
export * from './errors';
