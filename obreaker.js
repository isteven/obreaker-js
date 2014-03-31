/* 
 * Obreaker.js
 * A debuger to traverse and print object properties recursively to your web
 * browser console.
 *
 * Released under MIT License
 *
 * --------------------------------------------------------------------------------
 * The MIT License (MIT)
 *
 * Copyright (C) 2014 Ignatius Steven (https://github.com/isteven)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the "Software"), to deal 
 * in the Software without restriction, including without limitation the rights 
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
 * copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions: 
 *
 * The above copyright notice and this permission notice shall be included in all 
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
 * SOFTWARE.
 * --------------------------------------------------------------------------------
 */
 
obreaker = 
{     
    /*
     * SETTINGS
     */

    // Debug message prefix
    console_prefix: '[obreaker]',
    
    // Traverse depth (how deep you want to recursively process object's children / property)
    traverse_depth : 999,

    /*
     * MAIN FUNCTION
     */
    log: function() 
    {               

        var toPrint = '';
        

        for ( var key in arguments )
        {
            if ( typeof arguments[ key ] !== 'object' )
            {
                if ( key == 0 )
                {
                    sep = '';
                }
                else
                {
                    if ( toPrint != '') 
                    {
                        sep = ' > ';
                    }
                }
                toPrint = toPrint + sep + arguments[ key ];
            }
            else 
            {
                if ( toPrint != '' )
                {
                    var errorStack = new Error();
                    var errorInfo = '';
                    if ( typeof errorStack.stack != 'undefined' )
                    {
                        errorStack = errorStack.stack.split("\n")[1];                        
                        errorInfo = ' (' + this.parseError( errorStack ) + ')';
                    }
                    console.log( this.console_prefix + ' ' + '   ' + toPrint + errorInfo );
                }

                toPrint = '';                
                var closure = this.getClosure( arguments[ key ] );
                console.log( this.console_prefix + '    ' + closure[ 'open' ] );
                this.print_object( arguments[ key ] , '   ' )
                console.log( this.console_prefix + '    ' + closure[ 'close' ] );
            }
        }
        if ( toPrint != '' )
        {
            var errorStack = new Error();
            var errorInfo = '';
            if ( typeof errorStack.stack != 'undefined' )
            {
                errorStack = errorStack.stack.split("\n")[1];                        
                errorInfo = ' (' + this.parseError( errorStack ) + ')';
            }
            console.log( this.console_prefix + ' ' + '   ' + toPrint + errorInfo );
        }
    },

    /*
     * Recursive method to print object
     * Reference: http://stackoverflow.com/questions/15058780/eclipse-ide-console-log-objects-in-javascript
     */    
    print_object: function( obj, padding, currLevel )
    {
        var ind = '';

        if ( currLevel == '' || typeof currLevel === 'undefined' || currLevel == null ) 
        {
            currLevel = 0;
        }

        if ( currLevel == this.traverse_depth ) 
        {
            return true;
        }

        if (arguments.length > 1)
        {
            ind = arguments[ 1 ];
        }

        if ( typeof obj === 'undefined' || obj == null )
        {
            console.log( '<null>' );
            return;
        }

        for (var key in obj)
        {
            if ( typeof obj[key] === 'function' ) 
            {
                continue;
            }            
            var closure = this.getClosure( obj[key] );
            if ( typeof obj[key] === 'object' && obj.hasOwnProperty( key ) )
            {
                console.log( this.console_prefix + '   ' + ind + key + ': ' );
                console.log( this.console_prefix + '   ' + ind + closure[ 'open' ] );
                this.print_object( obj[ key ], ind + '   ' , currLevel + 1 );
                console.log( this.console_prefix + '   ' + ind + closure[ 'close' ] );
            }
            else
            {
                console.log( this.console_prefix + '   ' + ind + key + ': ' + obj[ key ] );
            }
        }
    },

    /* To determine whether to use [ ] or { } */
    getClosure: function( item ) {
        var closure     = new Array();
        var objectType  = typeof item;

        if ( objectType === 'object' ) {
            if ( item ) {
                if ( item instanceof Array) {
                    objectType = 'array';
                }
            } else {
                objectType = 'null';
            }
        }
        
        switch( objectType ) {
            case 'array':
                closure[ 'open' ] = '[';
                closure[ 'close' ] = ']';
                break;
            case 'object':
                closure[ 'open' ] = '{';
                closure[ 'close' ] = '}';
                break;                    
            default:                        
                closure[ 'open' ] = '{';
                closure[ 'close' ] = '}';
                break;
        }
        return closure;
    },

    /* Process error */
    parseError: function( error ) {
        var errorArr = error.split( /[@|/]/ ),
            functionName = '';
        if ( errorArr[0] ) 
        {
            functionName = errorArr[0] + '() - ';
        }
        var scriptLine = errorArr[ errorArr.length - 1];            
            scriptLine = scriptLine.split( ':' );
        return ( functionName + scriptLine[0] + ' [line ' + scriptLine[1] + ']');
    }
}
