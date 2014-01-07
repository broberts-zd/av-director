/*just a funny intro at the top*/
function zdIntro(args) {
	var curObj = this;
	/*get the parent element, in this case the div with id "TopPane"*/
	var topPane = document.getElementById("TopPane");
	var backing = zdC("div","intro_backing");
	var l1 = zdC("span","red_cross");
	l1.innerHTML = "+";
	var l2 = zdC("span","red_cross");
	l2.innerHTML = "+";
	
	var title = zdC("span","intro_title");
	title.innerHTML = "______  ________";
	
	var ques = zdC("div","intro_question");
	ques.innerHTML = "Viruses in attachments??";
	var aint = zdC("div","intro_aint");
	aint.innerHTML = "Ain't nobody got time for that!";

	topPane.appendChild(backing);
	backing.appendChild(l1);
	backing.appendChild(title);
	backing.appendChild(l2);
	backing.appendChild(ques);
	backing.appendChild(aint);
	
	this.erase = function(){
		alert("you are trying to erase the intro.  add code to this method to do so");
	};
}
	
	
