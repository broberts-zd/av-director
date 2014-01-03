

var weburl = "http://avdirector1/z/";
var anonurl = "http://avdirector1/a/";
var signOutUrl = "http://avdirector1/";
var baseurl = "http://avdirector1/";

function test() {
}

function f_filterResults(n_win, n_docel, n_body) {
	var n_result = n_win ? n_win : 0;
	if (n_docel && (!n_result || (n_result > n_docel)))
		n_result = n_docel;
	return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}

function dude() {
	return f_filterResults (
		window.pageYOffset ? window.pageYOffset : 0,
		document.documentElement ? document.documentElement.scrollTop : 0,
		document.body ? document.body.scrollTop : 0
	);

}


//this variable here is a global var used to designate if the profile was last called.
//it is helpful for nav functions.  if globalInProfile is true, then nav functions will call their display 
//variables in order to structure a feed and call profileusernav and ads.  If, however, globalInProfile is false, that
//indicates that the user out of the profile - so call functions can be used to save resources and time (not i
//re-call profile user nav or ads, etc)



//this is a lis of ZMLHttpRequet cerate factory fuincitnos totry 
var _factories = [
        function() { return new XMLHttpRequest(); },
        function() { return new ActiveXObject("Microsoft.XMLHTTP"); },
        function() { return new ActiveXObject("MSXML2.XMLHTTP.3.0"); },
        function() { return new ActiveXObject("MSXML2.XMLHTTP"); }
];
        //when we find a factory that works, sotre it here
var _factory = null;

        //Create and return a new XMLHttpRequest object.
        //      //The rifs timte we'r ecalled , try the list of faotry finctions until
        //we find one that returnms a non null value and does not throw an 
        //exception.  once we find a workign facory, remember it for later use.

var newRequest = function() {
     if( _factory != null) return _factory();

      for(var i=0; i < _factories.length; i++ ) {
              try {
                      var factory = _factories[i];
                      var request = factory();
                      if( request != null ) {
                              _factory = factory;
                              return request;
                      }
              }
              catch(e) {
                      continue;
              }
      }

        //if we get here, none of the factory candidates succe3eded, 
        //so throw and exception now and for all future calls.
	_factory = function() {
	      throw new Error("XMLHTTPRequest not supported");
	}
	_factory();  //throw an error
};








	
function setFeed() {
	var table = new oblTable(1,2);
	/* What is all this white_out business?
	table.setRowClass(0,"white_out");
	table.setClassName("white_out");
	table.setCellClass(0,0,"white_out");
	table.setCellClass(0,1,"white_out");
	*/
	var feed = oblC("d");
	feed.id = "feed";
	feed.style.width = "715px";

	var itab = new oblTable(1,2);
	var vertLine = oblC("i","http://avdirector1/images/gray_vert_sep_715.gif");
	table.addContent(0,0,feed);
	itab.addContent(0,0,vertLine);

		
	var innerTable = itab.getTable();
	innerTable.getElementsByTagName("td")[0].id = "ad_content";

	var userNav = oblC("d");
	userNav.id = "user_nav";
	table.addContent(0,1,userNav);

	table.addContent(0,1,innerTable);

	var main = document.getElementById("main_content");
	main.innerHTML = '';
	main.appendChild(table.getTable());
		
}
		
function runOnLoad() {
	var request = newRequest();
        /*set body inner HTML to backdrop, a sort of framework*/
        var url = baseurl + "backdrop.html";
        request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        document.getElementsByTagName("body")[0].innerHTML = request.responseText;
					startHistoryManager("home");
					

                                }
                        }
        };
        request.send(null);
}

//nav functions (navigation functions)
var navHome = function() {
        YAHOO.util.History.navigate('nav',"home");
};


//display functions
function displayHome(){
	alert("we are in display home");
	var e = new zdHomeConcourse();
}

function startHistoryManager(arg) {
	alert("we are starting history manager with state " + arg);
	 /*YUI Histroy manager*/
        var bookmarkedState = YAHOO.util.History.getBookmarkedState("nav");
	/*
	var msgState = YAHOO.util.History.getBookmarkedState("msg");
	*/

        //var querySection = YAHOO.util.History.getQueryStringParameter("section");
        var initialState = bookmarkedState || arg;
	/*
	var initialMsg = msgState || "none";
	*/
        YAHOO.util.History.register("nav", initialState, function(section) {
                navStateHandler(section)
        });
	/*
	YAHOO.util.History.register("msg", initialMsg, function(msg) {
		showGuidance(msg);
	});
	*/

        YAHOO.util.History.onReady(function () {
		navStateHandler(initialState);
		/*
		showGuidance(initialMsg);
		*/
        });
        YAHOO.util.History.initialize("yui-history-field", "yui-history-iframe");
}

var navStateHandler = function(state,msg) {
        /*Scroll to top of page.  At this point, all nav features
        should begin at the top of the page.  this may change
        in teh future_*/
        scroll(0,0);
        var components = [];
        components = state.split('A');

        var section = components[0];
        var iid = components[1];
        var  pid = components[2]; //if we're caling a tri pic...
	/*get your switch on*/
        switch( section ) {
                case "home":
                        displayHome();
                        break;
	}
}
		
/*Hook in to onload events for various browsers*/
if( window.addEventListener ) 
        window.addEventListener("load",runOnLoad, false);
else if (window.attachEvent) window.attachEvent("onload", runOnLoad);
else window.onload = runOnLoad;
