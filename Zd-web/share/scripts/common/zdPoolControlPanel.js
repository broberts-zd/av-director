
/*Control Panel to send signals and otherwse control the pool of antivirus scanning nodes*/
function zdPoolControlPanel(args) {
	var curObj = this;

	/*build the visual parts of this*/
	this.assemble = function() {	
		/*Create a square backdrop for this control panel*/
		var backing = zdC("div","panel_backing");
		var s1 = zdC("span","panel_cross");
		var s2 = zdC("span","panel_cross");
		var title = zdC("span","panel_title");
		title.innerHTML = "Scanner Pool Control Panel";
		s1.innerHTML = "+";
		s2.innerHTML = "+";
	
		backing.appendChild(s1);
		backing.appendChild(title);	
		backing.appendChild(s2);
		backing.appendChild(zdC("div","panel_sep_1"));

		/*Status board*/
		var numNodes = zdC("div","panel_line_item");
		numNodes.innerHTML = "Number of nodes in the pool:  " + 3;//data.numberOfNodes;
		backing.appendChild(numNodes);
		var addNodeThreshold = zdC("div","panel_line_item");
		addNodeThreshold.innerHTML  = "Add new node threshold: " + 7;// data.newNodeThreshold;
		backing.appendChild(addNodeThreshold);
		var currentQueueLength = zdC("div","panel_line_item");
		currentQueueLength.innerHTML = "Number of nodes currently in the pool: " + 450;//data.currentQueueLength;
		backing.appendChild(currentQueueLength);
		/*separate this from the buttons below*/
		backing.appendChild(zdC("div","panel_sep_1"));
		backing.appendChild(giveSpace(10));
		/*Create buttons to perform various control tasks*/
		var anb = document.createElement("button");
		backing.appendChild(anb);
		var rnb = document.createElement("button");
		backing.appendChild(rnb);
		var ctb = document.createElement("button");
		backing.appendChild(giveSpace(10));
		backing.appendChild(ctb);
		/*YAHOOize these*/
		var yanb = new YAHOO.widget.Button(anb);
		yanb.set("label","Add New Node to Pool");
		yanb.on("click",function(){alert("you clicked me");});
		var yrnb = new YAHOO.widget.Button(rnb);
		yrnb.set("label","Remove Node from Pool");
		yrnb.on("click",function(){alert("ya clicked me dawg");});
		var yctb = new YAHOO.widget.Button(ctb);
		yctb.set("label","Change Add Node Threshold");
		yctb.on("click",function(){alert("you clicked on a button");});
	
		
			
	
	
	
		/*and append it*/	
		args.thePar.appendChild(backing);
	};

	this.fetch = function(){
                var request = newRequest();
                var url = anonurl + "get_pool_docket";
                request.open("GET",url,true);
                request.onreadystatechange = function() {
                        if( request.readyState == 4 ) {
                                if( request.status == 200 ) {
                                        data = eval('(' + request.responseText + ')');
                                        curObj.assemble();

                                }
                        }
                 };
                 request.send(null);
        };	
	this.assemble();
}
 
