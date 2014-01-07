function zdC(tag,a) {
	var e = document.createElement(tag);

	if( a ) {	
		if( tag == "img" ){
			e.src = a;
		}else{
			e.className = a;
		}
	}
	return e;
}
