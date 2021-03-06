package Zd::DispatcherZ;

use Apache2::Const -compile => qw(FORBIDDEN OK);
use Apache2::RequestUtil;
use Apache2::RequestIO;
use Apache2::RequestRec;
use URI;
use Zd::Read;
use Zd::Write;
	

sub handler {
	my $r = shift;

	#define our fuctions in a hash
	my %dispatcher = (
	'/z/test' => 'test',
	);
	#first, check the URI to see what is being requested
	my $uri = $r->uri();

	#then call the function
	$dispatcher{$uri}($r);


	#we have to return OK to mod_perl
	return OK;
}
1;
