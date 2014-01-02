
/*landToPromptAccount nad callPromptAccount should be changed into obects....._*/
function landToPromptAccount() {
	


        //get values from hte form.
        var f = document.getElementById("FullName0");
        var p = document.getElementById("SetPassword0");
        var e = document.getElementById("Email0");

        var values = {};
        values['email'] = e.value;
        values['password'] = p.value;
        values['fullName'] = f.value;
	var w = new oblAccountPrompt({
		"guidance":"Join ourbucketlist.",
		"values":values
	});

        /*callPromptAccount(values);*/

}
