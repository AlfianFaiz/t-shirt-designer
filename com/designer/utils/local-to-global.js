    // I translate the coordiantes from a global context to
    // a local context.
    $.globalToLocal = function( context, globalX, globalY ){
        // Get the position of the context element.
        var position = context.offset();

        // Return the X/Y in the local context.
        return({
            x: Math.floor( globalX - position.left ),
            y: Math.floor( globalY - position.top )
        });
    };


    // I translate the coordinates from a local context to
    // a global context.
    jQuery.localToGlobal = function( context, localX, localY ){
        // Get the position of the context element.
        var position = context.offset();

        // Return the X/Y in the local context.
        return({
            x: Math.floor( localX + position.left ),
            y: Math.floor( localY + position.top )
        });
    };


    // -------------------------------------------------- //
    // -------------------------------------------------- //


    // I am the FN version of the global to local function.
    $.fn.globalToLocal = function( globalX, globalY ){
        return(
            $.globalToLocal(
                this.first(),
                globalX,
                globalY
            )
        );
    };


    // I am the FN version of the local to global function.
    $.fn.localToGlobal = function( localX, localY ){
        return(
            $.localToGlobal(
                this.first(),
                localX,
                localY
            )
        );
    };