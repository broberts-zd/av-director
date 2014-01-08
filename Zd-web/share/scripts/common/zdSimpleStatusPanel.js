/* A panel which shows minimal status information about the virus scanning system and
the expenses it is incurring.  This status panel only grabs information from the past 24 hours*/

function zdSimpleStatusPanel(args) {

	var curObj = this;

	/*build the visual parts of this*/
	this.assemble = function() {	
		/*Create a square backdrop for this control panel*/
		var backing = zdC("div","panel_backing");
		var s1 = zdC("span","panel_cross");
		var s2 = zdC("span","panel_cross");
		var title = zdC("span","panel_title");
		title.innerHTML = "Simple Status Panel";
		s1.innerHTML = "+";
		s2.innerHTML = "+";
	
		backing.appendChild(s1);
		backing.appendChild(title);	
		backing.appendChild(s2);
		backing.appendChild(zdC("div","panel_sep_1"));
		/*show status line items*/
		var expl = zdC("div","panel_expl");
		expl.innerHTML = "**The following line items detail stats for the past <b>24</b> hours only.";
		backing.appendChild(expl);
		var numAttachmentsScanned = zdC("div","panel_line_item");
		numAttachmentsScanned.innerHTML = "Number of attachments scanned: " + 56;//data.past24hours.numAttachmentsScanned;
		var numVirusesFound = zdC("div","panel_line_item");
		numVirusesFound.innerHTML = "Number of viruses (infected attachments) found: " + 20;//data.past24hours.numVirusFound;
		var lastDayExpense = zdC("div","panel_line_item");
		lastDayExpense.innerHTML = "Last 24 hours expense: $" + 98.56;//data.past24hours.expense;
		backing.appendChild(numAttachmentsScanned);
		backing.appendChild(numVirusesFound);
		backing.appendChild(lastDayExpense);

		/*attach to parent node in DOM*/
		args.thePar.appendChild(backing);
	};

	this.fetch = function() {
                var request = newRequest();
                var url = anonurl + "get_simple_status_docket";
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
 
