package Zd::Read::SimpleStatusDocket;

our $dbh;

sub new {
	my $classname = shift;
	my $p = shift;
	my $self = {};
	while(my($key,$value) = each %{$p} ) {
		$self->{$key} = $value;
	}
	bless $self, $classname;

	#connect to db
	$dbh = DBI->connect("DBI:$ENV{DB_DRIVER}:$ENV{DB_NAME}:$ENV{DB_HOST}","$ENV{DB_USERNAME}","$ENV{DB_PASS}")
		or die "Database connection error: " . DBI->errstr;	
	return $self;
}

sub tallyDaysExpense {
	my $self = shift;
	#tally ip teh days AWS expense.  
}

sub tallyDaysVirusCount {
	my $self = shift;
}

sub tallyDaysAttachmentsScanned {
	my $self = shift;
}

1;
