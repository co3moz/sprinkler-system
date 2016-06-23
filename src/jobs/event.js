const schedule = require('node-schedule');
const config = require('config');

schedule.scheduleJob(config.get('jobs.mainTimer'), require('./mainTimer'));