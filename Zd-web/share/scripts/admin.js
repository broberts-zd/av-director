//this script sets up some stuff so that the browser request that the prfiel be rendered




//this variable here is a global var used to designate if the profile was last called.
//it is helpful for nav functions.  if globalInProfile is true, then nav functions will call their display 
//variables in order to structure a feed and call profileusernav and ads.  If, however, globalInProfile is false, that
//indicates that the user out of the profile - so call functions can be used to save resources and time (not i
//re-call profile user nav or ads, etc)

var globalInProfile = false;


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

function addListener(eventType,thing,_handler) {
        //for internet explorer and firefox and chrome and safari.

        var IEet = "on" + eventType;

         if( !thing.addEventListener ) {
                thing.attachEvent(IEet,_handler);
        }else{
                thing.addEventListener(eventType,_handler, false);
        }
}



encodeFormData = function(data) {

        var pairs = [];
        var regexp = /%20/g; //a regexp to match an ecoded space

        for(var name in data) {
                var value = data[name].toString();
                //there are two ways of doing this.  can replace %20 with + or we cna leave %20.
                //var pair = encodeURIComponent(name).replace(regexp,"+") + '=' +
                //      encodeURIComponent(value).replace(regexp,"+");

                var pair = encodeURIComponent(name) + '=' + encodeURIComponent(value);
                pairs.push(pair);
        }

        //concatenate all the name/value pairs, separating them with &
        var joined = pairs.join('&');
        return joined;
};

function oblInitiListing(args) {

	var curObj = this;
	var jefe = document.createElement("div");
	/*the first on only time we'll be attaching jefe to the parent element*/
	args.thePar.appendChild(jefe);


	var iid = args.iid;
	
	this.veto = function() {
		var values = {};
		values['iid'] = iid;
		var url = weburl + "deny_initi";
		standardPost(url,values,curObj.refresh);
	};
		



	this.display = function(selfCalled) {	
		/*When look at this if statement, keep in mind that this method can be called in two situations.
		It can be called from the contructing of this object, when all neccesary data for the initiative
		is passed via a hash ref from the oblInitiativeTool. Or it can be called be the refresh method,
		in which case it has been "self called".  In that case, the data needed will come from the 
		argument to THIS method, rather than the argument to the contructor.*/
		if( selfCalled ) 
			args = selfCalled;
		jefe.innerHTML = '';
		var iid = document.createElement("span");
		iid.innerHTML = " " + args.iid + "|";
		jefe.appendChild(iid);
	        var type = document.createElement("span");
	        type.innerHTML = " " + args.type + "|";
	        jefe.appendChild(type);
	        var funding_threshold = document.createElement("span");
	        funding_threshold.innerHTML = " " + args.funding_threshold + "|";
	        jefe.appendChild(funding_threshold);
	        var time = document.createElement("span");
	        time.innerHTML = " " + args.time + "|";
	        jefe.appendChild(time);
	        var title = document.createElement("span");
	        title.innerHTML = " " + args.title + "|";
	        jefe.appendChild(title);
	        var description = document.createElement("span");
	        description.innerHTML = " " + args.description + "|";
	        jefe.appendChild(description);
	        var uid = document.createElement("span");
	        uid.innerHTML = " " + args.uid + "|";
	        jefe.appendChild(uid);
		var denied = document.createElement("span");
		if(args.denied == 1) {
			denied.innerHTML = " DENIED. ";
		}else{
			denied.innerHTML = " permissable. ";
		}
		jefe.appendChild(denied);
		//create the veto button.
		var veto = document.createElement("button");
		jefe.appendChild(veto);
		var VETO = new YAHOO.widget.Button(veto);
		VETO.on("click",curObj.veto);
		VETO.set("label","Veto!");
	
	};

	/*define a fundtion to recall this (and only this) initiative data
	for the purposes of refreshing this initiative listing */
	
	this.refresh = function() {
		//call the data and display it when neccesary
		var url = weburl + "get_initi?iid=" + iid;
		var request = newRequest();
        	request.open("GET",url,true);
	        request.onreadystatechange = function() {
	                if( request.readyState == 4 ) {
	                        if( request.status == 200 ) {
	                                data = eval('(' + request.responseText + ')');
	                                curObj.display(data);
	
	                        }
	                }
	        };
	        //now send.  we'll be waiting...
	        request.send(null);
	};


	/*Upon instantiation, we have to tell this to display*/
	this.display();


}


function oblInitiativesTool(thePar) {
	var curObj = this;
	var data;



	/*Method to loop through the data and spawn InitiListing objects as needed*/

	this.spawnListings = function() {	
                var feed = document.getElementById(thePar); //this is "feed" unless changed.
                feed.innerHTML = '';
		var jefe = document.createElement("div");

                for(var k in data) {

                        /*This loop should go though the data of lists and create objects as needed.
                        These objects each are aware of their parent and attach themselves to the DOM*/


                        var post = new oblInitiListing({
                                "uid":  data[k].uid,
                                "type":  data[k].type,
                                "deadline":  data[k].deadline,
                                "funding_threshold":  data[k].funding_threshold,
                                "time":  data[k].time,
                                "jid":  data[k].jid,
                                "title":  data[k].title,
                                "description":  data[k].description,
				"denied":data[k].denied,
				"thePar": jefe,
				"iid": k
	
                        });
                }


        feed.appendChild(jefe);

	};



	/*Get all the initiatibes*/  //later add provisiong to only request the most recent 10 ro whatever_
	
	/*call the spawn method on OK response*/
	var request = newRequest();
        var url = weburl + "get_all_initis?range=all";
        request.open("GET",url,true);
        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                data = eval('(' + request.responseText + ')');
                                curObj.spawnListings();

                        }
                }
        };
        //now send.  we'll be waiting...
        request.send(null);


}

function oblSatConsole(parId) {
	/*Seek and Tweet console.  This shows the current tag/response combos - 
	and also provides a tool to add a new tag/ressponse combo (one at a time).
	*/

	var curObj = this;
	
	var backing = oblC("d");				

	var thePar = document.getElementById(parId);	
	thePar.innerHTML = '';
	thePar.appendChild(backing);

	var data;


	this.fetch = function() {
		/*call the data from the service*/
	        var request = newRequest();
                var url = weburl + 'get_sat_config';
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        data = eval('(' + request.responseText + ')');
					curObj.assemble();
                                }
                        }
                };
                //now send. we'll be waiting...
                request.send(null);
	};

	this.dropTag = function(tag) {
		alert(tag);
		var values = {};
                var url = weburl + "drop_sat_tag";
                values['tag'] = tag;
                var _callback = function() {
			satTool();
                };
                standardPost(url,values,_callback);
	};

	this.assemble = function() {
		/*show what we've got*/

		for(var i=0;i<data.tags.length;i++) {

			var l = oblC("s");
			l.innerHTML = data.tags[i];
			backing.appendChild(l);

			var s = document.createTextNode("   ");
			backing.appendChild(s);
			var r = oblC("s");
			r.innerHTML = data.responses[i];
			backing.appendChild(r);

			backing.appendChild(document.createTextNode("   "));
			/*button to drop respective combo*/
			var b = document.createElement("button");
			b.innerHTML = "drop";
			addListener("click",b,(function(c) {
                                return function(blah) {
                                        curObj.dropTag(c);
                                };
                        })(data.tags[i]));
			
			backing.appendChild(b);
			backing.appendChild(giveSpace(10));
		
		}
		
	




		/*follow by presenting a form that will allow us to define a new tag/response combo*/

		var e  = new oblInput({
			name:"tag",
			thePar:backing
		});
		var f = new oblInput({
			name:"response",	
			thePar:backing
		});

		var n = new oblInputNet([e,f]);
		n.setPostUrl("add_sat_tag");
		var _callmemaybe = function() { satTool(); };
		n.setCallback(_callmemaybe);

		var ab = document.createElement("button");
		backing.appendChild(ab);
		var AB = new YAHOO.widget.Button(ab);
		AB.on("click",n.post);
		AB.set("label","Add");
		


	};

	this.fetch();

}

function oblGuidepostTool(parId) {

	var CO = this;

		

		
	this.addGuidepost = function() {
		var values = {};
		var addUrl = weburl + "add_guidepost";
		values['priority'] = CO.pI.value;
		values['title'] = CO.tI.value;
		values['message'] = CO.mT.value;
		alert('msg is ' + values['message']);
		var _callback = function() {
			CO.callData();
		};
		standardPost(addUrl,values,_callback);
	};
	
	
	function dropGuidepost(gid) {
		var replyCallBack = function() {
			CO.callData();
		};
		var values = {};
		values['gid'] = gid;
		var url = weburl + 'drop_guidepost';
        	standardPost(url,values,replyCallBack);
	}

	

		

	this.displayResults = function(data) {
		CO.pI.value = '';
		CO.tI.value = '';
		CO.mT.value = '';
		listingDiv.innerHTML = '';
		for(i=0;i<data.gids.length;i++) {
			var curGid = data.gids[i];
			var g = document.createElement("span");
			g.innerHTML = data.gids[i];	
			var t = document.createElement("span");
			t.innerHTML = data.titles[i];
			var m = document.createElement("span");
			m.innerHTML = data.messages[i];
			var p = document.createElement("span");
			p.innerHTML = data.priorities[i];
			
			//append these four
			listingDiv.appendChild(g);
			listingDiv.appendChild(document.createTextNode(" | "));
			listingDiv.appendChild(t);
			listingDiv.appendChild(document.createElement("br"));
			listingDiv.appendChild(m);
			listingDiv.appendChild(document.createElement("br"));
			listingDiv.appendChild(document.createTextNode("Priority is: "));
			listingDiv.appendChild(p);
			listingDiv.appendChild(document.createElement("br"));
			var dropLink = document.createElement("a");
			dropLink.innerHTML = "Drop This";
			var _sendDrop = function() {
				dropGuidepost(curGid);
			};
			addListener("click",dropLink,_sendDrop);
			listingDiv.appendChild(dropLink);
			listingDiv.appendChild(document.createElement("br"));
			listingDiv.appendChild(document.createElement("br"));
		}
	};



	this.callData = function() {
	
       		 var request = newRequest();
	        var url = weburl + 'show_guideposts';
	        request.open("GET",url,true);
	        request.onreadystatechange = function() {
	                if( request.readyState == 4 ) {
	                        if( request.status == 200 ) {
	                                var data = eval('(' + request.responseText + ')');
					CO.displayResults(data);
	                        }
	                }
	        };
	        //now send. we'll be waiting...
	        request.send(null);
	};

	var toolDiv = document.createElement("div");
	var listingDiv = document.createElement("div");
	var addDiv = document.createElement("div");
	toolDiv.appendChild(listingDiv);
	toolDiv.appendChild(addDiv);
	var p = document.getElementById(parId);
	p.innerHTML = '';
	p.appendChild(toolDiv);


	                //create the add guidepost widget
        CO.pI = document.createElement("input");
        CO.tI = document.createElement("input");
        CO.mT = document.createElement("textarea");
        CO.mT.style.width = "400px";
        CO.mT.style.height = "300px";

        addDiv.appendChild(CO.pI);
        addDiv.appendChild(CO.tI);
        addDiv.appendChild(document.createElement("br"));
        addDiv.appendChild(CO.mT);
        addDiv.appendChild(document.createElement("br"));

        var aB = document.createElement("button");
        aB.innerHTML = "Add New Guidepost";
        var _sendNew = function() {
                CO.addGuidepost();
        };
        addListener("click",aB,_sendNew);
        addDiv.appendChild(aB);

	this.callData();

}

standardPost = function(url, values, callback, errorHandler) {
	var request =  newRequest();



	request.onreadystatechange = function() {
		if( request.readyState == 4) {
			if( request.status == 200) {
				callback(request);
			}
			else {
				if (errorHandler) errorHandeler(request.status,
							request.statusText);
				else alert('Callback is being triggered:  No error handler');//else callback(null);
			}
		}
	};
	request.open("POST", url);
	request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	

 	request.send(encodeFormData(values));
};


function call007() {
	var request = newRequest();
        var url = weburl + "prompt_search_jid";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;

                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);
}

function sendJidSearch() {

	var searchUrl = weburl + "search_jid";

	var e = document.getElementById('JidSearchDiv');
        var values = {};
            for( var i=0; i < e.childNodes.length; i++ ) {
                    if( e.childNodes[i].type ) {
                            values[e.childNodes[i].name] = e.childNodes[i].value;
                    }
        }

        var searchCallback = function(request) {
                var d = document.getElementById("results_div");
                d.innerHTML = request.responseText;
        };
        standardPost(searchUrl,values,searchCallback);



}


function display007() {

	//create a new request object

        var request = newRequest();

        var url = weburl + "structure_feed";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("main_content");
                                d.innerHTML = request.responseText;

                                //called here b/c rendering home lays out a strucure where these then fit in
                                call007();
				callTheSchwartz();
                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);
}

function callProfile(uid) {

        globalInProfile = true;

         if ( document.getElementById('trayDiv') ) {
                document.body.removeChild(document.getElementById('trayDiv'));
        }

        var request = newRequest();

        var url;

        if( uid ) {

                url = weburl + "profile?uid=" + uid;


        }else{
                url = weburl + "my_profile";

        }
        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;

                                //these are called here because inserting the html for profile lays out a structure where
                                //these will fit in.
                                callBucketlist(uid);
                                callProfileUserNav(uid);
                                if( uid ) {
                                        callHelp("profile");
                                }else{
                                        callHelp("my_profile");
                                }
                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);
}


function callTheSchwartz() {

	var request = newRequest();
        var url = weburl + "prompt_schwartz";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("ad_content");
                                d.innerHTML = request.responseText;

				/*This is a hack.  and intermediate step between innerHTML arch and JSON */
				var gpB = document.createElement("button");
				gpB.innerHTML = "GP";
				var _gp =  function() {
					guidepostTool();
				};
				addListener("click",gpB,_gp);
				d.appendChild(gpB);
				d.appendChild(document.createElement("br"));
				var imB = document.createElement("button");
				imB.innerHTML = "Initiatives";
				var _im = function() {
					initiativesTool();
				};
				addListener("click",imB,_im);
				d.appendChild(imB);

				

                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);
}

function callBucketlist(uid) {

        var soo;
        var may;
        var som;


        function callBListTab(cat) {

                var request = newRequest();
                var url;
                if( uid ) {
                        url = weburl + "render_bucketlist?uid=" + uid + ";cat=" + cat;
                }else{
                        url = weburl + "render_bucketlist?dir=my;cat=" + cat;
                }
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        var e = document.getElementById("bucketlist"); //change this to the car cat
                                        e.innerHTML = request.responseText;
                                }

                                        //extract this response and insert it to the div (main_conten).
                        }
                };
                //now send.  we'll be waiting...
                request.send(null);
        }

        //DELTET THIS FOR CHANGE TO TABS:
        callBListTab();
}

function callTop() {
	 var request = newRequest();
        var url = weburl + "manage_top";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;

                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);
}

function sendTop() {

	//first we ahve to get the ten out of the div.
        var e = document.getElementById('TenDiv');
	var set = [];
        for( var i=0; i < e.childNodes.length; i++ ) {
                    if( e.childNodes[i].type ) {
                              set.push(e.childNodes[i].value);
                    }
        }

	var ten = set.join('Y');

	  var request = newRequest();



	
	var url = weburl + "change_top?ten=" + ten;
	request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;

                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);

}
	

function callInsight(dir) {
	var request = newRequest();
        var url = weburl + "show_insight?dir=" + dir;

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;

                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);



}

function sendTheSchwartz() {
        var searchUrl = weburl + "schwartz";
        var e = document.getElementById('SchwartzDiv');
        var values = {};
            for( var i=0; i < e.childNodes.length; i++ ) {
                    if( e.childNodes[i].type ) {
                            values[e.childNodes[i].name] = e.childNodes[i].value;
                    }
        }
        var searchCallback = function(request) {
                var d = document.getElementById("ok_div");
                d.innerHTML = request.responseText;
        };
        standardPost(searchUrl,values,searchCallback);
}



var runOnLoad = function() {

	display007();
};

function addEmail() {
	var url = weburl + "add_email";
        var e = document.getElementById('EmailDiv');
        var values = {};
            for( var i=0; i < e.childNodes.length; i++ ) {
                    if( e.childNodes[i].type ) {
                            values[e.childNodes[i].name] = e.childNodes[i].value;
                    }
        }
        var searchCallback = function(request) {
		callManageEmail();
        };
        standardPost(url,values,searchCallback);
}


	

var callManageEmail = function() {


	var request = newRequest();
        var url = weburl + "manage_email";

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;

                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);
	


}

function callSendEmails(eid) {
	
	var request = newRequest();
        var url = weburl + "prompt_send_emails?eid=" + eid;

        request.open("GET",url,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("feed");
                                d.innerHTML = request.responseText;

                        }

                }
        };

        //now send.  we'll be waiting...
        request.send(null);
}



function sendEmails() {
	var url = weburl + "send_emails";
        var e = document.getElementById('WhoDiv');
        var values = {};
            for( var i=0; i < e.childNodes.length; i++ ) {
                    if( e.childNodes[i].type ) {
                            values[e.childNodes[i].name] = e.childNodes[i].value;
                    }
        }
        var searchCallback = function(request) {
                var d = document.getElementById("feed");
                d.innerHTML = request.responseText;
        };
        standardPost(url,values,searchCallback);
}
//register a window onload event to call to render profile.


function guidepostTool() {

	var tool = new oblGuidepostTool("feed");
}

function satTool() {
	var tool = new oblSatConsole("feed");
}

function initiativesTool() {

	var tool = new oblInitiativesTool("feed");

}

if( window.addEventListener )
        window.addEventListener("load",runOnLoad, false);
else if (window.attachEvent) window.attachEvent("onload", runOnLoad);
else window.onload = runOnLoad;


