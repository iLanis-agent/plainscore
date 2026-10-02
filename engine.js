(function (root) {
  'use strict';
  var WPM = 238; // average silent reading speed, adult non-fiction (Brysbaert 2019, Journal of Memory and Language 109: 104047)
  function syllables(word) {
    var w = word.toLowerCase().replace(/[^a-z]/g, '');
    if (!w) return 1;
    if (w.length <= 3) return 1;
    w = w.replace(/eau/g, 'o').replace(/(?:[^laeiouysxzch]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
    var m = w.match(/[aeiouy]{1,2}/g);
    return Math.max(1, m ? m.length : 1);
  }
  function words(text) { return text.match(/[A-Za-z0-9\u00C0-\u024F][A-Za-z0-9\u00C0-\u024F'\u2019-]*/g) || []; }
  function sentences(text) {
    var parts = text.replace(/\s+/g, ' ').trim().split(/(?<=[.!?])["')\]]*\s+(?=[A-Z0-9"'(\[])|\n+/), out = [];
    parts.forEach(function (p) { p = p.trim(); if (p && words(p).length) out.push(p); });
    return out;
  }
  // Flesch Reading Ease and Flesch-Kincaid Grade Level (Wikipedia: Flesch-Kincaid readability tests)
  function fre(wps, spw) { return 206.835 - 1.015 * wps - 84.6 * spw; }
  function fk(wps, spw) { return 0.39 * wps + 11.8 * spw - 15.59; }
  var BANDS = [[90, '5th grade', 'Very easy to read'], [80, '6th grade', 'Easy to read'], [70, '7th grade', 'Fairly easy to read'], [60, '8th and 9th grade', 'Plain English'], [50, '10th to 12th grade', 'Fairly difficult to read'], [30, 'College', 'Difficult to read'], [10, 'College graduate', 'Very difficult to read'], [-Infinity, 'Professional', 'Extremely difficult to read']];
  function band(score) { for (var i = 0; i < BANDS.length; i++) if (score >= BANDS[i][0]) return { grade: BANDS[i][1], label: BANDS[i][2] }; return { grade: BANDS[7][1], label: BANDS[7][2] }; }
  function analyze(text) {
    var ws = words(text), ss = sentences(text);
    if (!ws.length) return null;
    var syl = 0; ws.forEach(function (w) { syl += syllables(w); });
    var nS = Math.max(1, ss.length), wps = ws.length / nS, spw = syl / ws.length, score = fre(wps, spw);
    var longest = ss.map(function (s) { return { text: s, words: words(s).length }; }).sort(function (a, b) { return b.words - a.words; }).slice(0, 3);
    return { words: ws.length, sentences: nS, syllables: syl, wps: wps, spw: spw, fre: score, grade: fk(wps, spw), band: band(score), minutes: ws.length / WPM, longest: longest };
  }
  var api = { syllables: syllables, words: words, sentences: sentences, fre: fre, fk: fk, band: band, analyze: analyze, WPM: WPM };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Plain = api;
})(typeof window !== 'undefined' ? window : this);
