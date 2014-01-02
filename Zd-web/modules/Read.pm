package Zd::Read;
use Zd::Config;
use Zd::Common;

use strict;


use CGI qw/param cookie header/;
use JSON;

our $VERSION = 0.01;


############################
#Exporting symbols
############################
our @ISA = qw /Exporter/;
our @EXPORT = qw / /;

1;
