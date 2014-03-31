Obreaker.js
===========
A small script which traverse and print object properties recursively to your web browser console. Very helpful when debugging, especially on older browsers such as IE8.

![Screenshot](https://raw.githubusercontent.com/isteven/obreaker/master/screenshot.jpg)

Demo: http://jsfiddle.net/T69b3/1/ or download all the files into a same folder and open obreaker.htm.

Features
--
  - Print everything. Expression, string, object, array.. all in one liner!
  - Different closures, [ ] for array and { } for object so you can easily differentiate them
  - Set how deep you would like to traverse the object. Default is 999.
  
Usage
--
Include obreaker.js, such as

    <html>
        <head>
            <script src="obreaker.js"></script>
            ...
        </head>
        ...


and use it like this:

    obreaker.log( 'hello world!', 'my host is: ' , window.location.host );

Basically it's similar with console.log.

Note
--
On Firebug's console, it displays function name & line number of the caler properly. But it simply display the obreaker.js on Chrome's and/or IE's console.

Browser Compatibility
--
Tested on:
- Opera 12.16 (Yes, I love Opera browser! Download yours here: http://www.opera.com/)
- IE8 (IE8 is the default browser in the company I work for)
- Firefox 27
- Google Chrome 33

Licence
--
Released under the MIT license.
