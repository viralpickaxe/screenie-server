# screenie server

A node.js based self hosted web screenshot server.

So while working on [whatleads.to](http://whatleads.to) we ran into an issue. The problem was that we wanted to be able to show screenshots (images) of the big complex aims that people were creating, so that we could put them on things like twitter cards.

From looking around for a while all I could find, were some pretty bad APIs that were free, and some pretty awesome APIs that were very (very) expensive. So... I decided that I would build one.

If you like it, or want to use it feel free to grab the code and deploy it on your servers. I'm happy to keep on expanding this project, add issues for feature suggestions or submit a pull request. :)

This was built in 30 minutes during a GCSE Computer Science Lesson.

*I will be adding a link to a demo soon!*

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

## Generate screenshot from browser
*This is mainly for testing the screenshot script*

To generate a screenshot from the browser you need to navigate (in your browser) to `http://localhost:5000` and yype in a url of a website that you would like to generate a screenshot for, then press generate. (Make sure that you include either `http://` or `https://` in the url).

![Screenie Screenshot](http://new.tinygrab.com/9ad134d6aef2fc4f7075222494615510e77a6a8df4.png)

## Dependancies

* [express](https://github.com/strongloop/express)
* [body-parser](https://github.com/expressjs/body-parser)
* [url-to-image](https://github.com/kimmobrunfeldt/url-to-image)
* [swig](https://github.com/paularmstrong/swig/) 

## License

MIT
