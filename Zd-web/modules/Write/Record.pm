package Zd::Write::Record;



our $dbh;

sub new {
	my $self = {};
	my $classname = shift;
	bless $self, $classname;
	my $p = shift;

	while( my ($key,$value) = each %{$p} ) {
                $self->{$key} = $value;
    }	
	
	
	
	$dbh = DBI->connect("DBI:$ENV{DB_DRIVER}:$ENV{DB_NAME}:$ENV{DB_HOST}","$ENV{DB_USERNAME}","$ENV{DB_PASS}")
                or die "Database connection error: " . DBI->errstr;
	if( $self->{commit} ) {
		&write($self);
	}

	return $self;
}

sub write {
	my $self = shift;
	my $time = time;	
	my $sql = "INSERT INTO attachment_records (record_id, status, time) VALUES('$self->{record_id}','$self->{status}',$time)";
	my $sth = $dbh->prepare($sql);	
	$sth->execute;
	$sth->finish;
}
1;
