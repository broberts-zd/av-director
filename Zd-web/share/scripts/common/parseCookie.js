

function parseCookie() {
	var hash = {};

	var a = document.cookie.split(";");


	for(var i=0;i<a.length;i++) {
		var b = a[i].split("=");
		var key = b[0].replace(/^\s*/, '');
		hash[key] = b[1];
	}

	return hash;
}
