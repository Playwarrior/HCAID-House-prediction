class EmployeeValidator {

    constructor(name, lastName, Function, password, emailAddress) {
        this._name = this.validateName(name);
        this._lastName = this.validateLastName(lastName);
        this._function = this.validateFunction(Function);
        this._password = this.validatePassword(password);
        this._emailAddress = this.validateEmailAddress(emailAddress);
    }

    validateFunction(Function) {
        //TODO: FIND OUT WHAT FUNCTIONS TO ADD!
    }

    validateEmailAddress(emailAddress) {
        const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (regex.test(emailAddress))
            return emailAddress;
        else
            throw new Error(`Invalid EmailAddress: ${emailAddress}`);
    }

    validatePassword(password) {
        const regex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

        if (regex.test(password))
            return password;
        else
            throw new Error('Password needs to be at least 6 characters long and must contain a lower- and uppercase letter!');
    }

    validateLastName(lastName) {
        const regex = new RegExp(/^([A-Z])([a-z]{1,20})$/);

        if (regex.test(lastName))
            return lastName;

        else
            throw new Error(`Invalid FirstName: ${lastName}`);
    }

    validateName(name) {
        const regex = new RegExp(/^([A-Z])([a-z]{1,20})$/);

        if(regex.test(name))
            return name;

        else
            throw new Error(`Invalid FirstName: ${name}`);
    }
}

module.exports = EmployeeValidator;