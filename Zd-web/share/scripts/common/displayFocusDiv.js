
function displayFocusDiv(background,elementId) {
        //if this exists then kill it.  otherwise we'll have double tinting.
        if ( document.getElementById('StarterDiv') )
                document.body.removeChild(document.getElementById('StarterDiv'));


        //hide the flash (it seems to have an infinite z-index)
        //var flash = document.getElementById('TheFlash');
        //if( flash )
        //      flash.style.visibility = 'hidden';


        var body = document.getElementById('body');
        var tintDiv = document.createElement('div');
        var startDiv = document.createElement('div');

        tintDiv.id = "TintDiv";
        tintDiv.align = "center";
        if( navigator.appName == 'Microsoft Internet Explorer') {
                tintDiv.className = 'tintDivIE';
                startDiv.className = 'startDivIE';
        }else{
                tintDiv.className = 'tintDiv';
                tintDiv.style.background = 'rgba(10, 10, 10, 0.839844)';

        }

        startDiv.id = "StarterDiv";
	if( elementId )
		startDiv.id = elementId;
        startDiv.style.filter = "alpha(opacity=99)";
        startDiv.align = 'left';
        startDiv.style.position = 'relative';
        startDiv.style.top = '80px';
        startDiv.style.width = '944px';
        startDiv.className = 'starterList';
        startDiv.style.zIndex = '1001';
        startDiv.style.bottom = '';
        if( background ) {
                startDiv.style.background = background;
        }

         if( navigator.appName == 'Microsoft Internet Explorer') {

                var otherDiv = document.createElement('div');
                otherDiv.align = "center";
                otherDiv.id = "OtherDiv";
                otherDiv.appendChild(startDiv);
                otherDiv.style.position = "absolute";
                otherDiv.style.top = "0px";
                otherDiv.style.zIndex = '1010';
                otherDiv.style.width = "100%";
                body.appendChild(tintDiv);
                body.appendChild(otherDiv);


        }else{
                tintDiv.appendChild(startDiv);
                body.appendChild(tintDiv);
        }


}
