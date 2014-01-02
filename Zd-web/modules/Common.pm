package Zd::Common;

require Exporter;

use strict;
use Imager;
use DBI;


our $VERSION = 0.09;
our @ISA = qw /Exporter/;

our @EXPORT = qw /arrayToCsl get_time link_decor display_user_nav parse_params parse_cookie_string getContentBody scaleFit doveTail computeUnixDate/;

sub checkPrivate {
	my $uid = shift;
	my $jid = shift;
	my $dbh = DBI->connect("DBI:$ENV{DB_DRIVER}:$ENV{DB_NAME}:$ENV{DB_HOST}","$ENV{DB_USERNAME}","$ENV{DB_PASS}")
                or die "Database connection error: " . DBI->errstr;

        my $sql_stmt = "SELECT category FROM user_journeys WHERE uid='$uid' AND jid='$jid'";
        my $sth = $dbh->prepare($sql_stmt);
        $sth->execute();
        my $result = $sth->fetchrow_array();
        $sth->finish();

	if( $result eq 'pri') {
		return 'y';
	}elsif($result eq 'n'){
		return "n";
	}else{
		return "not embarked";
	}

	
}

sub arrayToCsl {
	my $arg = shift;
		
	my @array = @{$arg};
	my $string;


	for( @array ) {
		$string = $string . $_ . ", ";
	}
	my $string = substr($string,0,-2);
	
	return $string;
}
		
	
	
sub parse_params {

	my $params = shift;

	my @params = split /;/, $params;

	my %params;

	foreach( @params ) {
		
		my @keyval = split /=/, $_;
		my $key = shift @keyval;
		$params{$key}=@keyval[0];
	}

	return %params;
	
}

sub parse_cookie_string {

	 my $string = shift;

        my @cookies = split /; /, $string;

        my %cookies;

        foreach( @cookies ) {

                my @keyval = split /=/, $_;
                my $key = shift @keyval;
                $cookies{$key}=@keyval[0];
        }

        return %cookies;
}


sub get_time {   #returns the current time in ourbucketlist time string format
	my ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst) = localtime(time);
	$year += 1900;
	my @abbr = qw(Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec);
	my $half = 'a';
	if( $hour > 11 ) {
	        $half = 'p';
	        $hour = $hour - 12;
	}

	if( $min < 10 ) {
	        $min = "0" . "$min";
	}


	my $time_string  = "$abbr[$mon] $mday \@ $hour:$min$half $year";

	return $time_string;

}



sub link_decor {
        my $string =  "id=\"$_[0]$_[1]\" onmouseover=\"underlineLink('$_[0]$_[1]')\" onmouseout=\"undecorateLink('$_[0]$_[1]')\"";
	return $string;
}

sub scaleFit {

	my $image_filename = shift;
	my $new_image_filename = shift;
	my $desired_width = shift;
	my $desired_height = shift;

	#first get the images dimensions.
	my $image_obj = Image::Resize->new("$image_filename");
	my $width = $image_obj->width();
	my $height = $image_obj->height();
	my $new_height;
	my $new_width;
	my $image = Imager->new;
	my $newimg;
	$image->read(file => $image_filename)
	        or die $image->errstr;
	
	if( ($width/$height) < ($desired_width/$desired_height) || ($width/$height) == ($desired_width/$desired_height) ) {  #"if aspect ratio is thinner than we need OR if its what we need exactly"
		#in this case we have to crop off some height
		 $new_height = ($width * $desired_height) / $desired_width;
	         $newimg = $image->crop(height=>$new_height);
	
	}else{
		#in this case we must crop off some width.
	
		#scale horizonally
		$new_width = ($height * $desired_width) / $desired_height;
		$newimg = $image->crop(width=>$new_width);
	}
	#scale the image down.  using Imager to do this now...  there is already an Imager object open
	#note we cannont use the scale() function here, as our pictures will be cropped to aspeft ratios which are *slightly* off from the 143/111 that we need.
	#thsi is becuase we are workign with pixelated images, so rounding to whole numbers is forced in this situation.
	#the solution is the force width down to 143 and force height down to 111.  problem solved.
	my $scrunch = $newimg->scaleX(pixels=>$desired_width);
	my $thumb_image = $scrunch->scaleY(pixels=>$desired_height);
	$thumb_image->write(file=>$new_image_filename, type=>'jpeg') or
	        die $newimg->errstr;
}


sub doveTail {
	my $array1 = shift;
	my $array2 = shift;
		
	my @final;

	if( $#{$array1} >= $#{$array2} ) {

		my $counter=0;
		for( @{$array1} ) {
			push @final, ${$array1}[$counter];
			if( ${$array2}[$counter] ) {
				push @final, ${$array2}[$counter];
			}
			$counter++;
		}
	}else{
		my $counter=0;
                for( @{$array2} ) {
                        push @final, ${$array2}[$counter];
                        if( ${$array1}[$counter] ) {
                                push @final, ${$array1}[$counter];
                        }
                        $counter++;
                }
	}

	return @final;
}






sub display_user_nav {
        my $username = shift;
	my $uid = shift;
        my $journey_count = shift;
        my $triumph_count = shift;

	my $micro_path = "$ENV{WEBSERV_N_PIC_PATH}" . 'micro' . "$uid" . '.jpg';

        my $spit = "
                <div style=\"width: 272px; height: 68px; background-image:  url(\'/images/usernav_bg.gif\'); background-repeat: no-repeat\">

		<table>
		 <tr>
		  <td>

                <img style=\"position: relative; left: 8px; top:5px; \" src=$micro_path />
		  </td>
	          <td>
			<div>
			<span style=\"position: relative; font-weight: bold; top: 10px; left: 10px;\">$username</span>
			</div>
			<div>
			<span style=\"position: relative; left: 10px; top: 3px;\">..................................</span>
			</div>
			<div>
			<span style=\"font-size: 11px;  position: relative; top: 8px; left: 10px\">Items: $journey_count &nbsp      Triumphs:  $triumph_count</span>
			</div>
		

			

		


		


		</td>
		</tr>
		</table>

                </div>
        ";

        return $spit;

}

sub getContentBody {
        my $r = shift;
        my $buf;

        return if (!exists $r->headers_in->{'content-length'} or $r->headers_in->{'content-length'} <= 0);

        $r->read($buf,$r->headers_in->{'content-length'});  #slurtp.

        #$request->contentBody($buf);
	return $buf;
}

sub computeUnixDate {
	my $season = shift;
	my $year = shift;

	my $epoch = 1970;
	my $years = $year - $epoch;

	my $seconds_per_year = 60*60*24*365;

	my $offset;
	if( $season eq "winter" ) {
		$offset = 60 * 60 * (28+31);
		if($year eq "2012") {
			$offset = 60 * 60 * (31+29);
		}
	}

        if( $season eq "spring" ) {
                $offset = 60 * 60 * (31+28+31+30+31);
                if($year eq "2012") {
                        $offset = 60 * 60 * (31+29+31+30+31);
                }
        }

        if( $season eq "summer" ) {
                $offset = 60 * 60 * (31+28+31+30+31+30+31+30);
                if($year eq "2012") {
                        $offset = 60 * 60 * (31+29+31+30+31+30+31+30);
                }
        }

        if( $season eq "fall" ) {
                $offset = 60 * 60 * (31+28+31+30+31+30+31+31+30+31+30);
                if($year eq "2012") {
                        $offset = 60 * 60 * (31+29+31+30+31+30+31+31+30+31+30);
                }
        }

	my $ct = $years * $seconds_per_year + $offset;

	return $ct;
	

	

}	

1;
