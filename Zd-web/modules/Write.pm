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

############################
#Exporting symbols
############################
our @ISA = qw /Exporter/;
our @EXPORT = qw / /;

sub test {
	print "test";
}
1;
