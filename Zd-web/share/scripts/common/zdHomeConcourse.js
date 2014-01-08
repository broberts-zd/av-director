
/*Main tool/page for controlling AV director*/
function zdHomeConcourse(args){
	var curObj = this;
	/*Create a backdrop*/	
	var backing = zdC("div","concourse_backdrop");
	var thePar = document.getElementById("MainContent");
	thePar.appendChild(backing);
		
	backing.appendChild(giveSpace(3));

	/*instantiate a controls panel*/
	var controls = new zdPoolControlPanel({
		thePar:backing
	});
	var simpleStatus = new zdSimpleStatusPanel({
		thePar:backing
	});


	/*instantiate a simple status panel*/
}	
