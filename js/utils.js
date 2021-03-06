/*
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

// Add Modernizr webaudio test since third_party version doesn't include it.
Modernizr.addTest('webaudio',
    !!(window.AudioContext || window.webkitAudioContext));

/**
 * Converts a Santa LatLng object to a Maps API LatLng.
 *
 * @param {LatLng} o
 * @return {google.maps.LatLng}
 */
function mapsLatLng(o) {
  return new google.maps.LatLng(o.lat, o.lng);
}

/**
 * Pads an integer to have two digits.
 * @param {number} n
 * @return {string}
 */
function padDigits(n) {
  if (n > 9) {
    return '' + n;
  }
  return '0' + n;
}

/**
 * Returns a random number in the range [min,max).
 * @param {number} min
 * @param {number=} opt_max
 * @return {number}
 */
function randomRange(min, opt_max) {
  var max = opt_max || 0;
  return min + Math.random() * (max - min);
}

/**
 * Returns a random choice from the given array or array-like.
 * @param {!IArrayLike} array
 * @return {*}
 */
function randomChoice(array) {
  if (array.length) {
    var idx = Math.floor(Math.random() * array.length);
    return array[idx];
  }
  return null;
}

/**
  * Checks whether the passed dates are the same calendar day.
  * @param {!Date} date1
  * @param {!Date} date2
  * @return {boolean} whether the dates are the same calendar day
  */
function isSameDay(date1, date2) {
  return date1.getMonth() == date2.getMonth() &&
         date1.getDate() == date2.getDate() &&
         date1.getYear() == date2.getYear();
}

/**
 * Checks if the condition evaluates to true if window.DEV is true. If
 * window.DEV is false, assert call is removed by compiler as dead code.
 * @param {*} condition The condition to check.
 * @param {string=} opt_message Error message in case of failure.
 * @throws {Error} Assertion failed, the condition evaluates to false.
 */
function assert(condition, opt_message) {
  // TODO(bckenny): move DEV to JSCompiler --define
  if (window['DEV'] && !condition) {
    throw new Error('Assertion failed' +
        (opt_message ? ': ' + opt_message : ''));
  }
}

/**
 * @param {string} param URL parameter to look for.
 * @return {string|undefined} undefined if the URL parameter does not exist.
 */
function getUrlParameter(param) {
  if (!window.location.search) {
    return;
  }
  var m = new RegExp(param + '=([^&]*)').exec(window.location.search.substring(1));
  if (!m) {
    return;
  }
  return decodeURIComponent(m[1]);
}

/**
 * Sets the prefixed CSS property safely for webkit.
 * @param {!Element} el to apply property to
 * @param {string} prop to set
 * @param {string} value to set
 */
function webkitStyle(el, prop, value) {
  if (!prop.length) {
    return;
  }
  var prefixVersion = 'webkit' + prop.substr(0, 1).toUpperCase() + prop.substr(1);
  el.style[prefixVersion] = value;
  el.style[prop] = value;
}

/**
 * Throttle calls to a function
 * @param {function()} func
 * @param {number} ms at most one per this many ms
 */
function throttle(func, ms) {
  var timeout, last = 0;
  return function() {
    var a = arguments, t = this, now = +(new Date);
    var fn = function() { last = now; func.apply(t,a); };
    window.clearTimeout(timeout);
    (now >= last + ms) ? fn() : timeout = window.setTimeout(fn, ms);
  }
}
