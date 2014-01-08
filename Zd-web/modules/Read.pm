package Zd::Read;
use Zd::Config;
use Zd::Common;

use strict;


use CGI qw/param cookie header/;
use JSON;

our $VERSION = 0.01;

use Read::SimpleStatusDocket.pm


############################
#Exporting symbols
############################
our @ISA = qw /Exporter/;
our @EXPORT = qw / getSimpleStatusDocket/;

sub getSimpleStatusDocket {
	my $r = shift;
	$r->no_cache(1);
	$r->content_type("applicatin/json");
	my $docket = Zd::Read::SimpleStatusDocket->new();
	print encode_json $docket->getHash;
}
1;
