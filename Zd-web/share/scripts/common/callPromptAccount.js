function callPromptAccount(values) {




        var newAcctUrl = anonUrl + 'prompt_account';
        var request = newRequest();
        request.open("GET",newAcctUrl,true);

        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("StarterDiv");
                                d.innerHTML = request.responseText;
                                /*
                                if( firstLoginEid ) { //if we have a first time Eid to add, put a hidden input thing in here giving instruction.
                                        var eidInput = document.createElement('input');
                                        eidInput.name = 'firstLoginEid';
                                        eidInput.value = firstLoginEid;
                                        eidInput.style.visibility = 'hidden';

                                        var accountForm = document.getElementById('NewAccount');
                                        accountForm.appendChild(eidInput);
                                }       
                                */
                                /*if( arrivalMessage ) {
                                        var elm = document.getElementById("PromptAccountMsgDiv");
                                        elm.innerHTML = arrivalMessage;
                                }*/
                                if(values) {
                                        var f = document.getElementById("FullName");
                                        f.value = values['fullName'];
                                        var p = document.getElementById("SetPassword");
                                        p.value = values['password'];
                                        var e = document.getElementById("Email");
                                        e.value = values['email'];
                                }
                                validateInit();


                        }

                                //extract this response and insert it to the div (main_conten).
                }
        };

        //now send.  we'll be waiting...
        request.send(null);
}
