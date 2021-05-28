import 'bluebird-global';
import winston, {createLogger, ExceptionHandler, Logger} from 'winston';

class Log {
  public readonly logger: Logger;
  private readonly rejectionHandler: any;

  constructor() {
    this.logger = createLogger({
      exitOnError: false,
      level: process.env.LOG_LEVEL,
      levels: winston.config.npm.levels,
    }) as Logger;
    this.rejectionHandler = new ExceptionHandler(this.logger);
    const customizedHandler = (level: string, ...args: any) => {
      const [message, ...otherArgs] = args;
      if (message instanceof Error) {
        return this.logger.log({level, message: message as any});
      }
      const error = otherArgs.find((a: any) => a instanceof Error);
      return this.logger.log(level, message, error, ...otherArgs);
    };
    Object.keys(winston.config.npm.levels).forEach(
      (level) => (this.logger as any)[level] = customizedHandler.bind(this, level),
    );
  }
}

export default new Log();
export {Log};
