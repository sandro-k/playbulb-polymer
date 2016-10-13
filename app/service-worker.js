/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/bower_components/font-roboto/roboto.html","3c017dcd17189b99a03dbeffb81bc254"],["/bower_components/iron-a11y-announcer/index.html","88776a7513529faf429eebdb9fd7e716"],["/bower_components/iron-a11y-announcer/iron-a11y-announcer.html","a7481abe4e739db811c2f50a50c0af3a"],["/bower_components/iron-a11y-keys-behavior/index.html","f8e16b2a3282b3da28213336695b54ea"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","54c4fb4e39478fc1b6d09b4acbd0389a"],["/bower_components/iron-autogrow-textarea/index.html","516eb6756f60fa54f103881b3a0a7055"],["/bower_components/iron-autogrow-textarea/iron-autogrow-textarea.html","6134b66684578bc02e9d4d8e60047481"],["/bower_components/iron-behaviors/index.html","224d488d9de603f8a42e9eba8457cffa"],["/bower_components/iron-behaviors/iron-button-state.html","75da1ac0ca8d191caa798a65ec5a4c8b"],["/bower_components/iron-behaviors/iron-control-state.html","c05daf791e449749c5268bd95ec626aa"],["/bower_components/iron-checked-element-behavior/index.html","610778b47d072c4783f599220c046b29"],["/bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html","42c03c616d99e540b9ca824154d02d89"],["/bower_components/iron-collapse/index.html","8eed506c60b6fb7a6e8645212202ac5d"],["/bower_components/iron-collapse/iron-collapse.html","83adac3630822df246fb06e817208083"],["/bower_components/iron-flex-layout/index.html","196e49064318640b296a576da99dc554"],["/bower_components/iron-flex-layout/iron-flex-layout-classes.html","656314ffe981830043fe89b918e20371"],["/bower_components/iron-flex-layout/iron-flex-layout.html","151308b528090fb6c76b74d8943aa0b0"],["/bower_components/iron-form-element-behavior/index.html","af04489de5b0e8c97e460f662f1ceee4"],["/bower_components/iron-form-element-behavior/iron-form-element-behavior.html","8ffdd1ce0a492d317776bb1bb4a443a0"],["/bower_components/iron-input/index.html","53c06c55498dd515ef364a1c41a0ae9b"],["/bower_components/iron-input/iron-input.html","c9258caa5be1130df21efa8963b8bec2"],["/bower_components/iron-menu-behavior/index.html","45ccb0dd85090060ee5aafaf8cc32ea4"],["/bower_components/iron-menu-behavior/iron-menu-behavior.html","eb559df26fff29875fd0c65fc5b2dc51"],["/bower_components/iron-menu-behavior/iron-menubar-behavior.html","59f6e848e328387b68497b4860f8e57f"],["/bower_components/iron-meta/index.html","a6fc19e4a98626c80aeaf253c7c04624"],["/bower_components/iron-meta/iron-meta.html","7c6822b1fb9f3b07ca501087b0feda2f"],["/bower_components/iron-pages/index.html","aa1b5c22921fc76e13306213a01be8ae"],["/bower_components/iron-pages/iron-pages.html","b4703bfa70815dadeace04f3f713566a"],["/bower_components/iron-range-behavior/index.html","478c01bdc4ddd6b819aff3cb88699b4d"],["/bower_components/iron-range-behavior/iron-range-behavior.html","2dc52b4a9306724f8b477d1e3125dbae"],["/bower_components/iron-resizable-behavior/index.html","97869841e903c8dc4022a56bc4c9e777"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","25120519f04d669b70a0b04c2615d0b9"],["/bower_components/iron-selector/index.html","52ec8b51fac1f8bfb881c1164509ce20"],["/bower_components/iron-selector/iron-multi-selectable.html","e6100fe240603126deea4518f606821f"],["/bower_components/iron-selector/iron-selectable.html","c0be605c5a2fa78c436304dff82f3428"],["/bower_components/iron-selector/iron-selection.html","cc0797080a508370c26a7104a29433ca"],["/bower_components/iron-selector/iron-selector.html","c8946dcd397168b6ba3248f4ce7d0ca9"],["/bower_components/iron-validatable-behavior/index.html","230e2151859e88473e6cdb8fb186b107"],["/bower_components/iron-validatable-behavior/iron-validatable-behavior.html","7ab1d3a5f460d0e87c3aa9fb4fcdfe00"],["/bower_components/paper-behaviors/index.html","5f6135dc7ff835d11275c61a5e8d0655"],["/bower_components/paper-behaviors/paper-button-behavior.html","53c543a5496d4ccaaddc58a7a151f5c3"],["/bower_components/paper-behaviors/paper-checked-element-behavior.html","5e33a457606b1ac9703f9fd39ae49fdc"],["/bower_components/paper-behaviors/paper-inky-focus-behavior.html","577571a2641bd627cb10df0d87330441"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","eb03adf1fddd6f8e71cfc12af8f8d3ba"],["/bower_components/paper-button/index.html","05d0abe0ed8dad3699359b4102400b21"],["/bower_components/paper-button/paper-button.html","1d481dc2b55f2e2fdd7a31fcd20a87f0"],["/bower_components/paper-input/all-imports.html","9163c20ddfd457e2918b9a752097c152"],["/bower_components/paper-input/index.html","5a4ea8b440283bbeb5820070a537999d"],["/bower_components/paper-input/paper-input-addon-behavior.html","92fe877f9231f09bcde5b2298dc0536c"],["/bower_components/paper-input/paper-input-behavior.html","a08bc3bd30d52e1583e158dad185cbd1"],["/bower_components/paper-input/paper-input-char-counter.html","0e7fabfb78a0740fb3887dff8b032496"],["/bower_components/paper-input/paper-input-container.html","714fe3632a33a0a771a260298a63fced"],["/bower_components/paper-input/paper-input-error.html","47e38ab875f7bf6ca03648842f99d10d"],["/bower_components/paper-input/paper-input.html","d714836b0a66495e625dc9050833c324"],["/bower_components/paper-input/paper-textarea.html","d505ed5b41fa30e971f20c12760e6f26"],["/bower_components/paper-item/all-imports.html","3e8b391e3231bf46fa6b7e6e1311b3a9"],["/bower_components/paper-item/index.html","1cd219ab4a66cbd2be87dacd869c2de6"],["/bower_components/paper-item/paper-icon-item.html","3e178577f33aa347e669100e6fa1f713"],["/bower_components/paper-item/paper-item-behavior.html","0d347fdd78663fcfe74e44ac9897035f"],["/bower_components/paper-item/paper-item-body.html","c3dd432e0a2a14bf39ff3fd0df63dd43"],["/bower_components/paper-item/paper-item-shared-styles.html","04605960aa51d182c0754e2e77a16c9e"],["/bower_components/paper-item/paper-item.html","9ad26ee7aa203863b3a4ee725def342a"],["/bower_components/paper-listbox/index.html","359faca2f450008c3a9f6b231b898e49"],["/bower_components/paper-listbox/paper-listbox.html","177b31d4ac4fc4add9ca3b188221b3fe"],["/bower_components/paper-material/index.html","c1590824b451030e91c20376c5af0f47"],["/bower_components/paper-material/paper-material-shared-styles.html","69c1aafd30b9710e1f852fd677907bf8"],["/bower_components/paper-material/paper-material.html","3c53783a2f03a21a4e56ff2548a841dd"],["/bower_components/paper-progress/index.html","c6c484221daa1f675b659ee906a2542d"],["/bower_components/paper-progress/paper-progress.html","fb2ba12e2cdfd619d71da197baa358ca"],["/bower_components/paper-radio-button/index.html","8f91e4ee81d22f6445b057b0e1db8013"],["/bower_components/paper-radio-button/paper-radio-button.html","91bfcdeafdccf8f958354260c77adfc1"],["/bower_components/paper-ripple/index.html","1e14ddb92529ac8c6482c555b8dc6a6f"],["/bower_components/paper-ripple/paper-ripple.html","fec422b0e1275430809da68cc7c95fc5"],["/bower_components/paper-slider/index.html","bcf54a8d18bffac38736b24ae8b967bb"],["/bower_components/paper-slider/paper-slider.html","2c6c1293a88b22a78b0490487e1729d6"],["/bower_components/paper-styles/color.html","c416d52e3dddcb9259e7ffa65c829bcf"],["/bower_components/paper-styles/default-theme.html","4c77bbaac8b5b7f92e93286609a5debd"],["/bower_components/paper-styles/demo-pages.html","579e044c549f136283213044069c4181"],["/bower_components/paper-styles/index.html","667b76ca73c2a70105443a2151c49b7e"],["/bower_components/paper-styles/paper-styles-classes.html","152826dd4271452e7f557b5133a83b95"],["/bower_components/paper-styles/paper-styles.html","116f49145f929f7317e9ab63b5e8f8bd"],["/bower_components/paper-styles/shadow.html","2d664cdbcf148ced8806d53f7679b3a4"],["/bower_components/paper-styles/typography.html","1e421eceab74be3206d130933c0768fb"],["/bower_components/platinum-bluetooth/index.html","3df0f753a28514d5b354a6cac30237ea"],["/bower_components/platinum-bluetooth/platinum-bluetooth-characteristic.html","1f0f74dc7aa504bb6a7da5aeb3fff473"],["/bower_components/platinum-bluetooth/platinum-bluetooth-device.html","5acd525df1de0f58e66440d4faa89c6e"],["/bower_components/platinum-bluetooth/platinum-bluetooth-elements.html","bdf9ba2d70b667045b560597527debd5"],["/bower_components/platinum-bluetooth/platinum-bluetooth-service.html","c8dab354db8033a280b914f58ef5fd0e"],["/bower_components/polymer/polymer-micro.html","c0a6a1aea2d2b8c30431d6f8f02726e8"],["/bower_components/polymer/polymer-mini.html","b80b33997503559334cf2c5702f4e8b0"],["/bower_components/polymer/polymer.html","e64791b71ed76d6dd1977868460e86cc"],["/bower_components/promise-polyfill/Gruntfile.js","fb7a42e762b30d77211459fe6a2999b9"],["/bower_components/promise-polyfill/Promise-Statics.js","02005242df61471f6758e0d133a9acc7"],["/bower_components/promise-polyfill/Promise.js","6d72e76387d06f828797b0ce05a2feb7"],["/bower_components/promise-polyfill/Promise.min.js","ee760d0ffb6812135d81e678f4a190d2"],["/bower_components/promise-polyfill/promise-polyfill-lite.html","965c7e4a3b59ae6da112c36ef7fcaeb6"],["/bower_components/promise-polyfill/promise-polyfill.html","feed1daf4d696057f175ccb535ffd53d"],["/bower_components/webcomponentsjs/CustomElements.js","307b37f7a1788c31697b59c1188385d9"],["/bower_components/webcomponentsjs/CustomElements.min.js","10480cbc19e5c4ef0127c6e7aa0d96b0"],["/bower_components/webcomponentsjs/HTMLImports.js","024b667f081fbd609e9217ebf38857f3"],["/bower_components/webcomponentsjs/HTMLImports.min.js","65d8cf6494d79d87ec71e3450941b294"],["/bower_components/webcomponentsjs/MutationObserver.js","fb270c356ee7a93d3b24b5ee4ef63fab"],["/bower_components/webcomponentsjs/MutationObserver.min.js","5ad9184185a02abde843125cd99a3563"],["/bower_components/webcomponentsjs/ShadowDOM.js","6cd6b56e29caa266c3005c8a674b6570"],["/bower_components/webcomponentsjs/ShadowDOM.min.js","846cca6d315bedd14510ed41612a7d06"],["/bower_components/webcomponentsjs/webcomponents-lite.js","9bd9e8a827ca7ed9ce61425f1a7403f8"],["/bower_components/webcomponentsjs/webcomponents-lite.min.js","b0f32ad3c7749c40d486603f31c9d8b1"],["/bower_components/webcomponentsjs/webcomponents.js","374a564027fecf40044696642330db85"],["/bower_components/webcomponentsjs/webcomponents.min.js","fd5d02f9e1e7855ab9ddb4dd8047702d"],["/elements/color-wheel.html","b864ccb1baea6f90fd7992e3309c69c5"],["/elements/playbulb-app.html","a74d7bf6560b1f94e9f03ab63060014e"],["/elements/playbulb-app.js","f13dfd1709db1a1f1b254a3cb1ce2512"],["/elements/playbulb-element.html","4f6c3edd5b51f53441aaff986578bca0"],["/elements/playbulb-element.js","1fbee9c565b62bd930bacf514d16e8a6"],["/index.html","ea062eb50bf921076e1d4b91b92e37d8"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







