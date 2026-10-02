var E = require('./engine.js'), n = 0, bad = 0;
function near(a, b, tol, m) { n++; if (!(Math.abs(a - b) <= tol)) { bad++; console.log('FAIL', m, a, b); } }
function is(a, b, m) { n++; if (a !== b) { bad++; console.log('FAIL', m, a, b); } }
// toolboxkit worked example: "The cat sat on the mat. It was a warm day." = 2 sentences, 11 words, 11 syllables, Reading Ease 116.65
var a = E.analyze('The cat sat on the mat. It was a warm day.'); is(a.words, 11, 'cat words'); is(a.sentences, 2, 'cat sentences'); is(a.syllables, 11, 'cat syllables'); near(a.fre, 116.65, 0.01, 'cat FRE');
// Wikipedia: "The Australian platypus is seemingly a hybrid of a mammal and reptilian creature" has 24 syllables and 13 words, Flesch-Kincaid grade 11.3
var p = E.analyze('The Australian platypus is seemingly a hybrid of a mammal and reptilian creature.'); is(p.words, 13, 'platypus words'); is(p.syllables, 24, 'platypus syllables'); near(p.grade, 11.3, 0.05, 'platypus grade');
// Wikipedia extremes: highest Reading Ease 121.22 (one one-syllable word per sentence), lowest grade -3.40 ("Go. See. Stop. Rest.")
near(E.fre(1, 1), 121.22, 0.005, 'max FRE'); near(E.fk(1, 1), -3.40, 0.005, 'min grade'); var g = E.analyze('Go. See. Stop. Rest.'); is(g.sentences, 4, 'go sentences'); near(g.grade, -3.40, 0.005, 'go grade');
// Wikipedia: Green Eggs and Ham averages 5.7 words per sentence and 1.02 syllables per word, grade -1.3
near(E.fk(5.7, 1.02), -1.3, 0.05, 'green eggs');
// bands from the Wikipedia table
is(E.band(95).grade, '5th grade', '95'); is(E.band(85).label, 'Easy to read', '85'); is(E.band(65).label, 'Plain English', '65'); is(E.band(55).grade, '10th to 12th grade', '55'); is(E.band(40).label, 'Difficult to read', '40'); is(E.band(20).grade, 'College graduate', '20'); is(E.band(5).grade, 'Professional', '5'); is(E.band(-20).grade, 'Professional', 'neg');
// syllable heuristic on common words
[['the', 1], ['table', 2], ['made', 1], ['hybrid', 2], ['reptilian', 3], ['beautiful', 3], ['readability', 5], ['jumped', 1], ['boxes', 2], ['creature', 2], ['simple', 2], ['a', 1]].forEach(function (x) { is(E.syllables(x[0]), x[1], 'syl ' + x[0]); });
// sentences and words
is(E.sentences('One. Two! Three? Four').length, 4, 'split'); is(E.words("Don't stop - it's well-known").length, 4, 'words'); is(E.analyze('   '), null, 'empty'); is(E.analyze('...'), null, 'punct only');
// reading time at 238 wpm: 476 words = 2 minutes
near(E.analyze(new Array(477).join('word ') + '.').minutes, 2, 1e-9, 'minutes'); near(E.analyze(new Array(239).join('word ')).minutes, 1, 1e-9, 'minutes2');
// longest sentences list
var l = E.analyze('Short one. This sentence is quite a bit longer than the first one. Mid length here.'); is(l.longest[0].words, 11, 'longest first'); is(l.longest.length, 3, 'three');
console.log((n - bad) + '/' + n + ' passed'); process.exit(bad ? 1 : 0);
