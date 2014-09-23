# screenie

A node.js based self hosted web screenshot server

## Install

Use the terminal/console to cd into the screenie folder that you cloned from this repo. Then type `npm install`, to install the dependancies.

    cd /path/to/screenie
    npm install
    

## Starting the server

To start up the screenie server, open your terminal/console and cd to the path you have screenie located in, after you have done this type in `node server.js`

    cd /path/to/screenie
    node server.js
    
If the server was started successfully you will see the following in the console output

    Screenie server started on *:5000
    
*Note: The port can be changed by feeding in the enviroment variable `PORT` on startup*

## Generate screenshot from browser

To generate a screenshot from the browser you need to navigate (in your browser) to `http://localhost:5000` and yype in a url of a website that you would like to generate a screenshot for, then press generate. (Make sure that you include either `http://` or `https://` in the url).

![Screenie Screenshot](http://new.tinygrab.com/9ad134d6aefd497e377aabe9a845f4c8e888ebbe14.png)

## Generate screenshot from api

To generate a screenshot from the api, make a request to `POST /screenshot/`. The `Content-Type` should be set to `application/json` and the body should include a json object with the item `url` in it. As with the browser method you need to add the `http://` or `https://` infront.

    POST /screenshot HTTP/1.1
    Host: localhost:5000
    Content-Type: application/json
    Cache-Control: no-cache
    
    {"url":"http://iamjamiedavies.com"}
    
You can also add optional `width` and `height` items to customize the viewport size (Pass in a interger value to represent the amount of pixels).
    
    POST /screenshot HTTP/1.1
    Host: localhost:5000
    Content-Type: application/json
    Cache-Control: no-cache
    
    {"url":"http://iamjamiedavies.com","width":600,"height":300}
    
Successful response

    {"success":true,"imgurl":"/screenshots/1411485285074.png"}
    
Failed response

    {"success":false,"msg":"Invalid URL"}
    
The `imgurl` is the url that can be used to view the photo in browser, but the `screenshots` folder is actualy located in `public` (in the node project).

## Dependancies

* [express](https://github.com/strongloop/express)
* [body-parser](https://github.com/expressjs/body-parser)
* [url-to-image](https://github.com/kimmobrunfeldt/url-to-image)
* [swig](https://github.com/paularmstrong/swig/) 

## License

MIT
