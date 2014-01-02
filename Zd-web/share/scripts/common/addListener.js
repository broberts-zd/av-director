

		


function addListener(eventType,thing,_handler) {
        //for internet explorer and firefox and chrome and safari.

        var IEet = "on" + eventType;

         if( !thing.addEventListener ) {
                thing.attachEvent(IEet,_handler);
        }else{

                thing.addEventListener(eventType,_handler, false);
        }
}
