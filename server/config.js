let siteUrl, dbHost;

const dev = true;

if ( dev ) {
	siteUrl = 'http://localhost:3000';
	dbHost = 'mongodb://dot-connect:D0t-conn3ct@ds227740.mlab.com:27740/dot-connect';
} else {
	siteUrl = 'https://dot-connect.sjsakib.me';
	dbHost = process.env.LIVE_DB;
}

module.exports = { siteUrl, dbHost };
