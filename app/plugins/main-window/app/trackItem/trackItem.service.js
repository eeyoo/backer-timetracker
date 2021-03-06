'use strict';

angular.module('globalServices', [])
    .service('TrackItemService', function () {
        var service = require('electron').remote.getGlobal('BackgroundService').getTrackItemService();

        service.findAllFromDay = function (day, taskName) {
            var to = moment(day).add(1, 'days')
            console.log('findAllFromDay ' + taskName + ' from:' + day + ', to:' + to);
            return service.findAll({
                orderBy: [
                    ['beginDate', 'ASC']
                ], where: {
                    endDate: {
                        '>=': day,
                        '<': to.toDate()
                    },
                    taskName: {
                        '==': taskName
                    }
                }
            }).catch(function (err) {
                console.log(err);
            });
        };

        service.updateColorForApp = function (appName, color) {
            console.log("Updating app color:", appName, color);
            return service.updateAll({color: color}, {app: appName})
        }

        return service;
    });
