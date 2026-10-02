# PlainScore

Paste text and get Flesch Reading Ease, Flesch-Kincaid grade, a plain-language band, word, sentence and syllable counts, reading time and the three longest sentences. Runs in the browser; nothing is uploaded.

Formulas (https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests): Reading Ease = 206.835 - 1.015 x (words / sentences) - 84.6 x (syllables / words); grade = 0.39 x (words / sentences) + 11.8 x (syllables / words) - 15.59. Bands from the same page (90-100 5th grade ... 10 or less professional). Reading time at 238 wpm (Brysbaert 2019, https://doi.org/10.1016/j.jml.2019.104047).
Tests: 40 checks. The toolboxkit worked example (11 words, 11 syllables, 116.65); the Wikipedia platypus sentence (13 words, 24 syllables, grade 11.3); extremes (121.22 and -3.40); Green Eggs and Ham (-1.3); all bands; syllable counts for 12 words; sentence and word splitting; reading time.
Deviations: syllables come from a vowel-group heuristic (words like "created" can be off by one); sentences split on . ! ? so abbreviations count as breaks; numbers count as one-syllable words. Scores can shift a few points versus other tools.

Static client-side. `node test-engine.js` runs the tests.
