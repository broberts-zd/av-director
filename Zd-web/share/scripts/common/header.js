
//define and variables that will be used thorughout
var imagesPath = "/image_content/";


//this variable here is a global var used to designate if the profile was last called.
//it is helpful for nav functions.  if globalInProfile is true, then nav functions will call their display 
//variables in order to structure a feed and call profileusernav and ads.  If, however, globalInProfile is false, that
//indicates that the user out of the profile - so call functions can be used to save resources and time (not i
//re-call profile user nav or ads, etc)

var globalInProfile = false;

function underline_link(x) {
        var y = document.getElementById(x);
        y.className = "nav_link_hili";
}

/*The following two functions are depracated ways of underline and undecorating
 * lines of text, or any element for that matter.  As of Arpil 2013, some
 * of the old stuff under modules/Render/ depends on these.*/
function underlineLink(x) {
	var y = document.getElementById(x);
	y.style.textDecoration = "underline";
}

function undecorateLink(x) {
	var y = document.getElementById(x);
	y.style.textDecoration = "none";
}




