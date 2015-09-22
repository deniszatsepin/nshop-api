var expect = require('chai').expect;
var modules = require('../lib/modules');


describe('Modules initialization', function() {
	describe('Get modules sorted by priority', function () {
		var root = __dirname + '/../..';
		it('should return sorted modules list', function() {
			var m = modules.getSortedModules(root);

			//testing exclude parameter
			var b = modules.getSortedModules(root, [m[0].name]);
			expect(m.length - b.length).to.be.equal(1);
		});	


	});
});
