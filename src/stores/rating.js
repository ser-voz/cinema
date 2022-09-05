/**
 * IMDb Rating Plugin Library. This is the library that is injected into the third party's website. Its hosted 
 * on its own (ie outside of the IMDbConsumerSiteStaticMedia package) on media bridge.
 * (function(d,s,id) {
 *                 let rate = {rating};
 *                 let js,stags=d.getElementsByTagName(s)[0];
 *                 if(d.getElementById(id)){
 *                     return;
 *                 }
 *                 js=d.createElement(s);
 *                 js.id=id;
 *                 js.src= rate;
 *             })(document,"script","imdb-rating-api");
 *             <span class="imdbRatingPlugin" data-title="tt10048342" data-style="p1"></span>
 * @author jmazur
 */
//  (function(window) {
//
// })(window);


  (function(window) {
    // always use strict mode from now on!
    "use strict";

    // make sure the document is in local scope
    var document = window.document;

    // create namespace
    if (!('imdb' in window)) {
      window.imdb = {};
    }

    // initialize rating object
    imdb.rating = {
      response: {},
      elems: {}
    };

    /**
     * Utility method to ensure that getElementsByClassName works appropriately
     */
    imdb.rating.getElementsByClassName = function(className, tag, elm) {
      if (document.getElementsByClassName) {
        imdb.rating.getElementsByClassName = function(className, tag, elm) {
          elm = elm || document;
          var elements = elm.getElementsByClassName(className),
              nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
              returnElements = [],
              current;
          for (var i = 0, il = elements.length; i < il; i += 1) {
            current = elements[i];
            if (!nodeName || nodeName.test(current.nodeName)) {
              returnElements.push(current);
            }
          }
          return returnElements;
        };
      } else if (document.evaluate) {
        imdb.rating.getElementsByClassName = function(className, tag, elm) {
          tag = tag || "*";
          elm = elm || document;
          var classes = className.split(" "),
              classesToCheck = "",
              xhtmlNamespace = "https://www.w3.org/1999/xhtml",
              namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace : null,
              returnElements = [],
              elements, node;
          for (var j = 0, jl = classes.length; j < jl; j += 1) {
            classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
          }
          try {
            elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
          } catch (e) {
            elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
          }
          while ((node = elements.iterateNext())) {
            returnElements.push(node);
          }
          return returnElements;
        };
      } else {
        imdb.rating.getElementsByClassName = function(className, tag, elm) {
          tag = tag || "*";
          elm = elm || document;
          var classes = className.split(" "),
              classesToCheck = [],
              elements = (tag === "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag),
              current, returnElements = [],
              match;
          for (var k = 0, kl = classes.length; k < kl; k += 1) {
            classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
          }
          for (var l = 0, ll = elements.length; l < ll; l += 1) {
            current = elements[l];
            match = false;
            for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
              match = classesToCheck[m].test(current.className);
              if (!match) {
                break;
              }
            }
            if (match) {
              returnElements.push(current);
            }
          }
          return returnElements;
        };
      }
      return imdb.rating.getElementsByClassName(className, tag, elm);
    };

    // IE has some issues with getAttribute, this is a better cross browser approach
    imdb.rating.getAttr = function(node, attr) {
      var attrs = node.attributes;
      for (var i in attrs) {
        if (attrs[i] && attrs[i].name == attr) {
          return attrs[i].value;
        }
      }
      return null;
    };

    // local document ready function
    imdb.rating.ready = function(callback) {
      var DOMContentLoaded;
      if (document.addEventListener) {
        //console.log('creating W3C version of DOMContentLoaded');
        DOMContentLoaded = function() {
          //console.log('W3C DOMContentLoaded has fired');
          document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
          callback();
        };
      } else if (document.attachEvent) {
        //console.log('creating IE version of DOMContentLoaded');
        DOMContentLoaded = function() {
          //console.log('IE DOMContentLoaded has fired');
          if (document.readyState === "complete") {
            //console.log('document.readyState === complete in IE DOMContentLoaded');
            document.detachEvent("onreadystatechange", DOMContentLoaded);
            callback();
          }
        };
      }
      if (document.readyState === "complete") {
        //console.log('document.readyState === complete, setting callback timeout');
        setTimeout(callback, 1);
      }
      if (document.addEventListener) {
        //console.log('adding W3C DOMContentLoaded event listener');
        document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
        window.addEventListener("load", callback, false);
      } else if (document.attachEvent) {
        //console.log('adding IE DOMContentLoaded event listener');
        document.attachEvent("onreadystatechange", DOMContentLoaded);
        window.attachEvent("onload", callback);
      }
    };

    // properly formats numbers with commas for display
    imdb.rating.addCommas = function(nStr) {
      nStr += '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(nStr)) {
        nStr = nStr.replace(rgx, '$1' + ',' + '$2');
      }
      return nStr;
    }

    /**
     * Adds a <link rel="stylesheet" type="text/css" href="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/css/imdbRating.css" />
     * to the head of the document so the plugin looks correct.
     */


    /**
     * Construct the output to display on the page
     *
     * @param options
     *            an object containing the options
     */
    imdb.rating.buildPlugin = function(options) {
      // create DOM pieces
      var tconst = this.response.id.split("/")[2],
          span = imdb.rating.elems[tconst]["elem"],
          anchor = imdb.rating.elems[tconst]["elem"].getElementsByTagName("a")[0],
          textSpan = document.createElement("span"),


          // rating is a number when there is a rating, otherwise is "N/A"
          rating = typeof(this.response.rating) === "number" ? this.response.rating.toFixed(1) : "N/A",
          ratingTextNode = document.createTextNode(rating);

      // update the class name so the CSS can take effect
      span.className = span.className + " " + options.style;

      // add rating text
      if (rating) {
        textSpan.className = "rating";
        textSpan.appendChild(ratingTextNode);
        span.appendChild(textSpan);
      }

      // add star image if necessary
      if (typeof(options.starImg) === "string") {
        var starImg = document.createElement("img");
        starImg.src = "https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/" + options.starImg;
        starImg.className = "star";
        span.appendChild(starImg);
      }

      // add votes if necessary
      if (options.showVotes === true && this.response.ratingCount) {
        var votesTextNode = document.createTextNode(this.addCommas(this.response.ratingCount) + " votes"),
            votesSpan = document.createElement("span");
        votesSpan.className = "votes";
        votesSpan.appendChild(votesTextNode);
        span.appendChild(votesSpan);
      }
    };

    imdb.rating.setResponse = function(response) {
      if (typeof(response) === "object") {
        this.response = response.resource;
      }
      // the response is not an object (probably no rating for the given tconst)
      else {
        this.response.rating = "N/A";
        this.response.ratingCount = 0;
      }
    };

    /**
     * The methods below receive the response from Cloudfront and build the correct DOM output to the browser
     * Since we cannot use query sting parameters with a JS file, the JSONP response will be padded with one
     * of the following methods unless there is no rating, in which case nothing will display.
     *
     * @example
     * <script src="https://p.media-imdb.com/static-content/documents/v1/title/tt0133093/ratings?jsonp=imdb.rating.run:imdb.api.title.ratings/data.json"></script>
     *
     * Will return:
     * imdb.rating.run({
     *         "@meta":{
     *             "requestId":"fb03a296-b694-11e1-a632-0bc998174348",
     *             "serviceTimeMs":0.274
     *         },
     *         "resource":{
     *             "@type":"imdb.api.title.ratings",
     *             "id":"/title/tt0133093/",
     *             "rating":8.73,
     *             "ratingCount":565487,
     *             "title":"The Matrix",
     *             "titleType":"movie",
     *             "topRank":19,
     *             "year":1999
     *         }
     * });
     *
     * @param response
     *            the JSON response from Cloudfront
     */
    imdb.rating.run = function(response) {
      this.setResponse(response);
      var tconst = this.response.id.split("/")[2];
      var span = imdb.rating.elems[tconst]["elem"];
      var style = imdb.rating.elems[tconst]["style"];
      imdb.rating[style]();
    };

    imdb.rating.t1 = imdb.rating.p1 = function() {
      this.buildPlugin({
        "style": "imdbRatingStyle1",
      });
    };

    /**
     * Finds all plugin spans on the page and creates a JSONP lookup for each one
     */
    imdb.rating.createJSONP = function() {
      // for each plugin span get title, style and user then create jsonp lookups
      var elemsArr = imdb.rating.getElementsByClassName("imdbRatingPlugin");
      for (var i in elemsArr) {
        // using the local getAttr method here since IE was having trouble *big surprise there*
        var tconst = imdb.rating.getAttr(elemsArr[i], "data-title"),
            style = imdb.rating.getAttr(elemsArr[i], "data-style"),
            user = imdb.rating.getAttr(elemsArr[i], "data-user");
        if (!document.getElementById("imdb-jsonp-" + tconst)) {
          // add element to hash with style for later
          imdb.rating.elems[tconst] = {};
          imdb.rating.elems[tconst]["elem"] = elemsArr[i];
          imdb.rating.elems[tconst]["style"] = style;
          // create JSONP request
          var scriptTag = document.createElement("script");
          scriptTag.src = "https://p.media-imdb.com/static-content/documents/v1/title/" + tconst + "/ratings%3Fjsonp=imdb.rating.run:imdb.api.title.ratings/data.json?u=" + user + "&s=" + style;
          scriptTag.id = "imdb-jsonp-" + tconst;
          document.body.appendChild(scriptTag);
        }
      }
    };

    imdb.rating.ready(function() {
      // create JSONP call
      imdb.rating.createJSONP();
    });

  })(window);

