var Constraint = function(validator) {
	validator.extend('notBlank', function(value) {
		return (value != null && value != "" && value != undefined) ? true : false
	});

	validator.extend('inArray', function(value, options) {
		var check = false;

		for(i = 0; i < options.length; i++) {
			if(value == options[i]) check = true;
		}

		return check;
	});

	return  {
		notBlank: {
			validate: validator.notBlank,
			getMessage: function(value) {
				return 'This field [' + value + '] cannot be blank';
			}
		},
		isEmail: {
			validate: validator.isEmail,
			getMessage: function(value) {
				return 'This field value [' + value + '] is not a email'; 
			}
		},
		inArray: {
			validate: validator.inArray,
			getMessage: function(value) {
				return 'This field value [' + value + '] is not defined in options';
			}
		},
		contains: {
			validate: validator.contains,
			getMessage: function(value) {
				return 'This field value [' + value + '] cannot contain in the options';
			}
		},
		isAlphanumeric: {
			validate: validator.isAlphanumeric,
			getMessage: function(value) {
				return 'This field value [' + value + '] is not alpha numeric';
			}
		}
	};
};

module.exports = Constraint;