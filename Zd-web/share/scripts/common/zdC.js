function zdC(tag,a) {
	var e = document.createElement(tag);
	
	if( tag == "img" )
		e.src = a;

	if( a ) {
		if( tag == "div" ) {
			e.className = a;
		}
	}	

	return e;
}
