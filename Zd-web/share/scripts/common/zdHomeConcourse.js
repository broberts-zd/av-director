
/*Main tool/page for controlling AV director*/
function zdHomeConcourse(args){
	var curObj = this;
	/*Create a backdrop*/	
	var backing = zdC("div","concourse_backdrop");
	var thePar = document.getElementById("MainContent");
	thePar.appendChild(backing);

	/*instantiate a controls panel*/
	var controls = new zdPoolControlPanel({
		thePar:backing
	});


	/*instantiate a simple status panel*/
}	
