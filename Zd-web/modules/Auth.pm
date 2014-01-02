package Zd::Auth;

use base(Apache2::AuthCookie);
use Digest::MD5;


sub new {
	my $classname = shift;
	my $self = {};
	bless $self, $classname;
	$self = $self->SUPER::new(shift,shift);
	return $self;
}

sub authen_cred {

	my $self = shift;
	my $r = shift;
	my @cred = @_;

	my $session_key;

	#lets connect to our database, we have some transaction to conduct.  (conduct??   yeah.  conduct.)
        my $dbh = DBI->connect("DBI:$ENV{DB_DRIVER}:$ENV{DB_NAME}:$ENV{DB_HOST}","$ENV{DB_USERNAME}","$ENV{DB_PASS}")
                or die "Database connection error: " . DBI->errstr;

	my $sql_stmt = "SELECT password FROM users WHERE username='$_[0]'";
	my $sth = $dbh->prepare($sql_stmt);	
	$sth->execute();
	my $db_pass = $sth->fetchrow_array();
	$sth->finish();

	if( $db_pass eq $_[1] ) {
		#the password matches.
		my $current_time = time;

		my $expire_time = $current_time + 604800; #1 week
		my $o_a_u = 
		"Appear at points which the enemy must hasten to defend, 
		march swiftly to places where you are not expected.";

		my $string = "$_[0]" . "$db_pass" . "$expire_time" . "$o_a_u";

		my $ctx = Digest::MD5->new;

		$ctx->add($string);
		$session_key = $ctx->hexdigest;

		#make a record in the db of this login and the expiry time
		my $sql_stmt = "INSERT INTO user_log (username, session_key, expire_time) VALUES('$_[0]','$session_key', '$expire_time')";
		my $sth = $dbh->prepare($sql_stmt);
		$sth->execute();
		$sth->finish();
	



	}else{
		#the supplied password was incorect.
		$session_key = 'youho';
	}


	return $session_key;

}

sub authen_ses_key {

	my ($self,$r,$session_key) = @_;

	#lets connect to our database, we have some transaction to conduct.  (conduct??   yeah.  conduct.)
        my $dbh = DBI->connect("DBI:$ENV{DB_DRIVER}:$ENV{DB_NAME}:$ENV{DB_HOST}","$ENV{DB_USERNAME}","$ENV{DB_PASS}")
                or die "Database connection error: " . DBI->errstr;

	my $sql_stmt = "SELECT username, expire_time FROM user_log WHERE session_key='$session_key' ORDER BY lid DESC LIMIT 1";
        my $sth = $dbh->prepare($sql_stmt);
        $sth->execute();
        my ($username, $expire_time) = $sth->fetchrow_array();
        $sth->finish();

	if( $username eq '' ) {
		#we got shit
		return 0;
	}else{
		if( time > $expire_time ) { 
			return 0; 
		}
		return $username;
	}
}


1;
