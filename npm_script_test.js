#!/usr/bin/env node

'use strict';

var os = require('os'),
	execSync = require('child_process').execSync;

var opts = {
	stdio: 'pipe',
	env: process.env,
	timeout: 60000
};

function exec(cmd){
	console.log('executing: ', cmd);
	process.stdout.write(execSync.apply(this, arguments));
}

exec('npm install', opts);
console.log(os.platform() );
if(os.platform() === 'win32'){
	exec('node_modules\\.bin\\jshint.cmd subtitle.js', opts);
	exec('node_modules\\.bin\\mocha.cmd', opts);
	exec('node_modules\\.bin\\istanbul.cmd cover ./node_modules/mocha/bin/_mocha', opts);
} else {
	exec('./node_modules/.bin/jshint subtitle.js', opts);
	exec('./node_modules/.bin/mocha', opts);
	exec('./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha', opts);
}
