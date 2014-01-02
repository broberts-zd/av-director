
function callTriumphTape() {


        var request = newRequest();
        var url = anonurl + "triumph_tape";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("TriumphTape");
                                if(d)
                                d.innerHTML = request.responseText;
                        }
                }
        };

        //now send.  we'll be waiting...
        request.send(null);

}
