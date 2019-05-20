const db = require('../db/database');
const QueryBuilder = require('../db/QueryBuilder');

//TODO!

class SessionValidator {

    constructor(employeeId, facilityId, startTime, endTime) {
        this._employeeId = this.validateEmployeeId(employeeId);
        this._facilityId = this.validateFacilityId(facilityId);
        this._startTime = this.validateStartTime(startTime);
        this._endTime = SessionValidator.validateEndTime(endTime);
    }

    validateEmployeeId(employeeId) {

    }

    validateFacilityId(facilityId) {

    }

    validateStartTime(startTime) {

    }

    static validateEndTime(endTime) {
        if (endTime == null)
            return null;

        //TODO!

        return endTime;
    }
}

module.exports = SessionValidator;