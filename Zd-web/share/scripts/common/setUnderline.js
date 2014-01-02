
var _underlineElement = function(e) {
	var thing = (e.currentTarget) ? e.currentTarget : e.srcElement;
	thing.style.textDecoration = "underline";
};

var _normalize = function(e) {
        var thing = (e.currentTarget) ? e.currentTarget : e.srcElement;
        thing.style.textDecoration = "none";
};

function setUnderline(e) {
	
		addListener("mouseover",e,_underlineElement);
		addListener("mouseout",e,_normalize);
}
