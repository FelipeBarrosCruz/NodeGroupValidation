var GroupValidator = require('./GroupValidator');

var requestBody = {
	name: 'felipe barros',
	email: 'felipe@mail.com',
	gender: 'F'
};

var constraints = {
	name: GroupValidator.constraint.notBlank,
	email: GroupValidator.constraint.isEmail,
	gender: {
		rule: GroupValidator.constraint.inArray,
		values: ['M', 'F']
	}
};

var errors = GroupValidator.validateValue(requestBody, constraints).errors;

console.log(errors);