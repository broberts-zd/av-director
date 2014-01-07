package Zd::Config;

require Exporter;

our @ISA = qw(Exporter);
our @EXPORT = qw/%ENV/;
our $VERSION = 0.01;


#the database driver we are using.  in the event we use a debugging driver, this could change.
$ENV{DB_DRIVER}="mysql";

#database username
$ENV{DB_USERNAME}="vindobona";

#the database password
$ENV{DB_PASS}="re4egusp";

#our database name
$ENV{DB_NAME}="av";

#the database host
$ENV{DB_HOST}="localhost";



1;
