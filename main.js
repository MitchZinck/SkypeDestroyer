// ==UserScript==
// @name         SkypeDestroyer
// @namespace    http://mzinck.com
// @version      0.1
// @description  Skype Script
// @author       Mitchell Zinck <mitchellzinck@yahoo.com
// @include      https://web.skype.com/en/
// @grant        none
// ==/UserScript==


(function(XHR) {
    "use strict";

    var stats = [];
    var timeoutId = null;

    var open = XHR.prototype.open;
    var send = XHR.prototype.send;

    XHR.prototype.open = function(method, url, async, user, pass) {
        this._url = url;
        open.call(this, method, url, async, user, pass);
    };

    XHR.prototype.send = function(data) {
        var k;
        if(isMsg(data) && data != null) {       
            k = JSON.parse(data);
            if(k.content.substring(0, 1) === "#") {    
                k = replaceContent(k);
                if(k !== null ) {
                    k = JSON.stringify(k);
                    data = k;
                }
            }
                    console.log(data);
        }        

        var self = this;
        var start;
        var oldOnReadyStateChange;
        var url = this._url;

        function onReadyStateChange() {
            if(self.readyState == 4 /* complete */) {
                var time = new Date() - start;                
                stats.push({
                    url: url,
                    duration: time                    
                });

                if(!timeoutId) {
                    timeoutId = window.setTimeout(function() {
                        var xhr = new XHR();
                        xhr.noIntercept = true;
                        xhr.open("POST", "/clientAjaxStats", true);
                        xhr.setRequestHeader("Content-type","application/json");
                        xhr.send(JSON.stringify({ stats: stats } ));                        

                        timeoutId = null;
                        stats = []; 
                    }, 2000);
                }                
            }

            if(oldOnReadyStateChange) {
                oldOnReadyStateChange();
            }
        }

        if(!this.noIntercept) {
            start = new Date();

            if(this.addEventListener) {
                this.addEventListener("readystatechange", onReadyStateChange, false);
            } else {
                oldOnReadyStateChange = this.onreadystatechange; 
                this.onreadystatechange = onReadyStateChange;
            }
        }

        send.call(this, data);
    }
})(XMLHttpRequest);

function isMsg(value) {
    try {
        JSON.stringify(value);
        if(JSON.stringify(value).indexOf("content") > -1) {
            return true;
        } else {
            return false;
        }
    } catch (ex) {
        return false;
    }
}

function replaceContent(data) {
    try {
        if(data.content.match(/\[(.*?)\]/)[1].indexOf("http://") == -1 || data.content.match(/\[(.*?)\]/)[1].indexOf("https://") == -1) {            
            data.content = "<a href='http://" +  data.content.match(/\[(.*?)\]/)[1] + "'>" + data.content.match(/\(([^)]+)\)/)[1] + "</a>";
        } else {
            data.content = "<a href='" +  data.content.match(/\[(.*?)\]/)[1] + "'>" + data.content.match(/\(([^)]+)\)/)[1] + "</a>";
        }
        return data;
    } catch(ex) {
        return null;
    }
}

