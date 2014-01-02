
function displayBadCred() {
	var request = newRequest();
        /*set body inner HTML to this*/
        var url = baseurl + "backdrop_slate.html";
        request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
					document.getElementsByTagName("body")[0].innerHTML = request.responseText;	
					var e = new oblNoAuth("main_content");
					e.setTitle("Oops!  Your password was wrong or your session has expired:(");
                                }
                        }
        };
        //now send.  we'll be waiting...
        request.send(null);
}
