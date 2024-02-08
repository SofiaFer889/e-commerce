import winston from 'winston'

const loggerFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
)

const developmentLogger = winston.createLogger({
  level: 'debug',
  format: loggerFormat,
  transports: [new winston.transports.Console()]
})

const productionLogger = winston.createLogger({
  level: 'info',
  format: loggerFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'errors.log', level: 'error' })
  ]
})

const logger = process.env.NODE_ENV === 'production' ? productionLogger : developmentLogger

export default logger
