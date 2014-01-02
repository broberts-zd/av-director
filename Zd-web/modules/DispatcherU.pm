package Zd::DispatcherU;

use Apache2::Const -compile => qw(FORBIDDEN OK);
use Apache2::RequestUtil;
use Apache2::RequestIO;
use Apache2::RequestRec;
use URI;
use Zd::Render;
use Zd::Write;
use Zd::Site;
	

sub handler {
	my $r = shift;

	#in this case we are looking for the uri to be a user name.


	
	#first, check the URI to see what is being requested

	checkUsername($r);






	#then call the function
	#$dispatcher{$uri}($r);



	


	#we have to return OK to mod_perl
	return OK;

}
1;

