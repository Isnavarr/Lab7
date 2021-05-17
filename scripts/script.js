// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
var main = document.querySelector('main');
var settings = document.querySelector('img');
var state;
var single_entry = [];
//var entry_arr = [];

// Make sure you register your service worker here too

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
        single_entry.push(newPost);
        console.log(single_entry.length);
        if(single_entry.length == 10){
          for(var i = 0; i < single_entry.length; i++){
            let temp = single_entry[i];
            let index = i + 1;
            //entry_arr.push(temp);
            temp.shadowRoot.querySelector("[class='entry']").addEventListener('click', () => {
              state = setState("single-entry", index);
              document.querySelector('entry-page').remove();
              let temp2 = document.createElement("entry-page");
              document.body.appendChild(temp2);
              temp2.entry = temp.entry;
            });
          }
        }
      });
    });
    //single_entry = main.childNodes;
    console.log(single_entry);
    console.log(single_entry[0]);
    console.log(single_entry.length);
});

  settings.addEventListener('click', () => {
    state = setState("setting");
    //main.remove();
  });
  
  window.addEventListener('popstate', function (popstateEvent){
    console.log();
    if(popstateEvent.state == null){
      document.body.classList.remove("single-entry");
      document.body.classList.remove("settings");
    }
    if(JSON.stringify(popstateEvent.state) == '{"page":1}'){
      document.body.classList.add('single-entry');
      document.body.classList.remove("settings");
    }
    if(JSON.stringify(popstateEvent.state) == '{"page":2}'){
      document.body.classList.remove('single-entry');
      document.body.classList.add("settings");
    }
  })
  
  
  
  //for (var i = 0; i < single_entry.length; i++){
   // let temp = single_entry[i].shadowRoot.querySelector("[class='entry']");
    //console.log(single_entry[i]);
  //}

