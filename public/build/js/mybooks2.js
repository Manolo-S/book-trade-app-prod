!function(t){function e(o){if(s[o])return s[o].exports;var i=s[o]={exports:{},id:o,loaded:!1};return t[o].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var s={};return e.m=t,e.c=s,e.p="/public/assets/js/",e(0)}([function(t,e){"use strict";!function(){function t(t){console.log("data",t),$("#content").empty();for(var e=0;e<t.length;e++){var o=t[e],i='<div class="book">';i+='<div class="row">',i+='<div class="col-sm-3">',o.image&&"no-image"!==o.image&&(i+='<img src="'+o.image+'" alt="book cover">'),i+="</div>",i+='<div class="col-sm-9 book-details">',i+='<cite class="book-title">'+o.title+"</cite>",i+='<button type="button" class="btn btn-danger btn-xs remove-button">Remove book</button>',o.authors&&(i+='<p class="authors">by '+o.authors+"</p>"),i+="<p>"+o.publishedDate+"</p>",o.pages&&(i+="<p>"+o.pages+" pages</p>"),i+="<p>Language: "+o.language+"</p>",i+='<p id="industryIdentifier">'+o.industryIdentifier+"</p>",i+='<span id="timestamp">'+o.timestamp+"</span>",i+='<span id="user">'+o.owner+"</span>",i+='<span id="requestedBy">'+o.requestedBy+"</span>",i+="</div>",i+="</div>",i+="</div>",$("#content").append(i)}$(".remove-button").click(function(t){var e=$(t.target),o=e.siblings("#industryIdentifier").text(),i=e.siblings("#requestedBy").text(),n=e.siblings("#timestamp").text(),a=e.siblings("#user").text();e.parents(".book").remove(),$.post(s,{user:a,industryIdentifier:o,timestamp:n,requestedBy:i})})}var e=document.getElementById("user").textContent,s="https://book-trade-ms.herokuapp.com/remove-book",o="https://book-trade-ms.herokuapp.com/get-my-books";$.post(o,{user:e},t)}()}]);