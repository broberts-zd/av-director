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
	my %data;
	my %pastDay;
	$self->{data} = \%data;
	$data{past24hours} = \%pastDay;
	&tallyDaysAttachmentsScanned($self);
	return $self;
}

sub tallyDaysExpense {
	my $self = shift;
	#tally ip teh days AWS expense.  
}

sub tallyDaysAttachmentsScanned {
	my $self = shift;
	#compute cutoff time (what time was it 24 hours ago?)
	my $cutoff = time - (24*60*60); #seconds
	my $sql = "SELECT COUNT(*) FROM attachment_records WHERE time > $cutoff";
	my $sth = $dbh->prepare($sql);
	$sth->execute;
	$self->{data}->{past24hours}->{numAttachmentsScanned} = $sth->fetchrow_array;
	$sth->finish;
}

sub tallyDaysVirusesFound {
	my $self = shift;
}

sub getHash {
	return shift->{data};
}
1;
