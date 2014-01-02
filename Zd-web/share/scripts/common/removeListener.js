
function removeListener(eventType,thing,_handler) {

		var ieEvent = "on" + eventType;
            if( thing.removeEventListener ) {    // all browsers except IE before version 9
                thing.removeEventListener(eventType,_handler,false);
            }
            else {
                if( thing.detachEvent ) {        // IE before version 9
                    thing.detachEvent(ieEvent,_handler);
                }
            }
}
