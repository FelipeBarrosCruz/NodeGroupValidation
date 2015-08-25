var array_diff = function(a1, a2) {
    var a = [],
        diff = [];
    for (var i = 0; i < a1.length; i++)
        a[a1[i]] = true;
    for (var i = 0; i < a2.length; i++)
        if (a[a2[i]]) delete a[a2[i]];
        else a[a2[i]] = true;
    for (var k in a)
        diff.push(k);
    return diff;
};

var validator 		= require('validator'),
	GroupValidator 	= function() {
	    var errors = [],
	        validateValue,
	        self_reference = function() {
	            return {
	            	validator: 		validator,
	            	constraint: 	require('./constraint')(validator),
	                validateValue: 	validateValue,
	                errors: 		errors
	            };
	        };

	    validateValue = function(request_data, constraint_data) {
	        var diff = array_diff(Object.keys(request_data), Object.keys(constraint_data));

	        for (var c_field in constraint_data) {

	            if (!(c_field in request_data)) {
	                if (diff.indexOf(c_field) == -1) {
	                    diff.push(c_field);
	                }
	                continue;
	            }

	            var constraint = constraint_data[c_field];

	            if(constraint.rule == undefined) {
		            if (!constraint.validate(request_data[c_field])) {
		                errors.push({
		                    field: c_field,
		                    message: constraint.getMessage(c_field)
		                });
		            }
	            } else {
	            	if(!constraint.rule.validate(request_data[c_field], constraint.values) ) {
	            		errors.push({
	            			field: c_field,
	            			message: constraint.rule.getMessage(c_field)
	            		});
	            	}
	            }
	        }

	        for (var i = 0; i < diff.length; i++) {
	            errors.push({
	                field: diff[i],
	                message: 'This field [' + diff[i] + '] not be expected!'
	            });
	        }

	        return self_reference();
	    };

	    return self_reference();
	};

module.exports = new GroupValidator();
