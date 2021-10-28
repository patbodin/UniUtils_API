const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

// module.exports = createLogger({
// transports:
//     new transports.File({
//     filename: 'logs/server.log',
//     format:format.combine(
//         format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
//         format.align(),
//         format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
//     )}),
// // });

module.exports = createLogger({
    transports: [
        new transports.DailyRotateFile({
           filename: 'logs/info-%DATE%.log',
           datePattern: 'YYYY-MM-DD_HH-mm',
           zippedArchive: true,
           maxSize: '10m',
           frequency: '30m',
           level: 'info',
           utc: true,
           format:format.combine(
                format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
                format.align(),
                format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
            )
        })
      ]
    });