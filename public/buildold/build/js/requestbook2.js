!function(s){function e(o){if(t[o])return t[o].exports;var a=t[o]={exports:{},id:o,loaded:!1};return s[o].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var t={};return e.m=s,e.c=t,e.p="/public/assets/js/",e(0)}([function(s,e){"use strict";!function(){function s(s){for(var t=0;t<s.length;t++){var o=s[t],i='<div class="book">';i+='<div class="row">',i+='<div class="col-sm-3">',o.image&&"no-image"!==o.image&&(i+='<img src="'+o.image+'" alt="book cover">'),i+="</div>",i+='<div class="col-sm-9 book-details">',i+='<cite class="book-title">'+o.title+"</cite>",i+='<button type="button" class="btn btn-primary btn-xs swap-button">Offer to swap</button>',o.authors&&(i+='<p class="authors">by '+o.authors+"</p>"),i+="<p>"+o.publishedDate+"</p>",o.pages&&(i+="<p>"+o.pages+" pages</p>"),i+="<p>Language: "+o.language+"</p>",i+='<p id="industryIdentifier">'+o.industryIdentifier+"</p>",i+='<span class="offered-book">'+o.owner+","+o.image+",",i+=o.publishedDate+","+o.pages+","+o.language+",",i+=o.industryIdentifier+","+o.timestamp+"</span>",i+='<span id="title">'+o.title+"</span>",i+='<span id="authors">'+o.authors+"</span>",i+="</div>",i+="</div>",i+="</div>",$("#mybooks").append(i)}$(".swap-button").click(function(s){var t=$(s.target);$(t).text("Swap proposal sent"),$(t).css("background-color","green");var o=t.siblings("#title").text(),i=t.siblings("#authors").text(),r=t.siblings(".offered-book").text();r=r.split(",");var p=r[0]+","+r[1]+","+r[2],n=r[3],l=r[4],d=r[5],u=r[6],c=r[7],g=r[8];r={owner:p,image:n,title:o,authors:i,publishedDate:l,pages:d,language:u,industryIdentifier:c,timestamp:g};var b={requestedBook:a,offeredBook:r};console.log("request",b),$.post(e,{swapProposal:{requestedBook:a,offeredBook:r}})})}var e="https://book-trade-ms.herokuapp.com/request-swap",t="https://book-trade-ms.herokuapp.com/get-my-books",o=store.get("user"),a=store.get("book");console.log(a);var i=a.image,r=a.title,p=a.authors,n=a.publishedDate,l=a.pages,d=a.language,u=a.industryIdentifier,c=(a.timestamp,'<div class="book">');c+='<div class="row">',c+='<div class="col-sm-3">',"no-image"!==i&&(c+='<img src="'+i+'">'),c+="</div>",c+='<div class="col-sm-9 book-details">',c+='<p class="book-title">'+r+"</p>",p&&(c+='<p class="authors">by '+p+"</p>"),c+="<p>"+n+"</p>",l&&(c+="<p>"+l+" pages</p>"),c+="<p>Language: "+d+"</p>",c+='<p id="industryIdentifier">'+u+"</p>",c+="</div>",c+="</div>",c+="</div>",console.log(c),$("#requested-book").append(c),$(".close-button").click(function(){window.close()}),$.post(t,{user:o},s)}()}]);