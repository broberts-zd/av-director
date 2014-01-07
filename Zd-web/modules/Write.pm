package Zd::Write;

use strict;

use Zd::Config;
use Zd::Common;
require Exporter;

our $VERSION = 0.01;

use Apache2::Const -compile => qw(FORBIDDEN OK);
use Apache2::RequestUtil;
use Apache2::RequestIO;
use Apache2::RequestRec;
use URI;
use DBI;
use CGI qw /param redirect upload cookie/;
use JSON;

use Zd::Write::Record;

############################
#Exporting symbols
############################
our @ISA = qw /Exporter/;
our @EXPORT = qw /test register/;

sub test {
	print "test";
}

sub register {
	my $r = shift;
	$r->content_type("application/json");
	my $record_id = param('record_id') || 'unknown';	
	my $status = param('status') || 'unknown';
	my $record = Zd::Write::Record->new({
		record_id => $record_id,
		status => $status,
		commit => 1,
	});
}
1;
