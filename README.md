                                          o
     .       .   .   .     o                 .
     |  o    |   |   |          °      o     |
     |-. . . |-. |-. | ,-. ,-. ,-. ;-. . ;-. |-
     | | | | | | | | | |-' `-. |   |   | | | |
     `-' `-` `-' `-' ' `-' `-' `-' ' ° ' |-' `-'
                     °      o
               o

## What is Bubblescript?

Bubble🫧script is a
[Clojure](https://clojure.org/)-like
language inspired✨️ for Java☕️script.

## Language Features
  - Lisp/Javascript Hybrid
  - Functional Programming Model
  - Minimal Syntax

## Planned Features
  - Macro Support (Under Development)
  - Loop & Recur functions for iteration
  - Lazy Evaluation
  - Tail Call Recursion Optimization
  - Namespaces
  - Code Libraries

## TODO

- Fix failing tests that have been marked as
  pendin (it.skip) in test/f/parse.js
- Get the entire system under test
  - [x] i'm pretty sure we broke the
        interpretor, but the test suite is still
        passing. we need to figure out how to test
        this with Mocha.
    - See test/bin/bubls.js

- Where is the best place to put the bubblescript code and libaries and how best to organize and load it?
  We had some libraries strated in older versions of bubblescript be for the refactoring to use node and rewrite.
  - [ ] Discover determine where how to organize store bubblescript code and libaries
  - [ ] Track down and copy over old bubblescript libraries

## Project Goals

- Immutability
  - Immutability is a good things. In
    Bubbles🗯🫠cript we wish 😮to be able
    programming in a c🦁lear and concise
    manner using functional program🤠ming
    techniques tha🗽t depe🐺🌙nd on💜 an
    exp🤪ect🎶ation. We d😏on't want to put
    the programmer i🤓🇺🇸n bondag🥰e, and
    act as a big brother 🎄or cop th🐩a🥹t
    ensure they abso💖lutlt 🎈can't mutat😋e
    thi🎈ng🍬👻s, we wish the empower the
    pr🔔ogra🥸mmer with a path, and
    support,🌸 and go🇺🇸od a😳nd tested
    solutions that enable the ptogrammer to
    exp🥳re🤔ss their pro💖grams🐇 using
    🐯these constructs of immutablity 💃🏻so
    the can unlock all t💜he
    🐇🫧🧋b🫏enifits😇 and the bliss that
    c😍omes 🤭with havi🤐ng th🍸is
    expectation that c🍕lever prog🦜ra🧠mmer
    has devised such devices in orde😊r to
    fluentl💜y f😲low and grove and hum
    🫏along their merry way.
- Macros
  - Bubblescript nee🩵ds Macro support don't
    you agree? Yes! Yippee! ithink so too.
    As a matter i 🩶was just💚 think🤑ing
    that exact s👻💘ame thing. ☺️ i was like,
    you know, bubblescript should🧞‍♂️
    support Macros. oj, wow, look at that, a
    giant sl💜ice of apple 🧚pie.
    So,🧛‍♀️ anyway,👾 we want to be
    able to have macros and to be able to
    have 👽them e👼🏼xpand. Ok,🙆🏿 thats
    enough about goals and sucg for now, im
    getting über carried away with 👉all
    these😺.

## News
  - You can now use let and loop and
    recur. These functions are probably
    quite niave, but are working well for
    the basic use cases so far.

## Dev Setup

    git clone git@github.com:BuBbL3briGhT/BUbBL3sCriPt.git bubblescript
    cd bubblescript
    npm install
    npm test

## Get a prompt and run some code

    $ bin/bubls
    %< (console.log "Hola Mundo")
    Hola Mundo
    undefined
    %< .exit
    $

## Examples

**Some math**

    (+ 1 2)
    (+ 1 2 3)
    (- 5 2)
    (/ 8 2)
    (* 7 8 9)

**Create a function**

    (mufn coolbeans [beans]
      (puts beans))

    (coolbeans "yes!")

**Setting locals**

    (let [luckynumber 777]
      (puts luckynumber))

**Looping**

    (loop [i 0]
      (puts "🥰")
      (if (< i 3)
        (recur [i (+ i 1)])))

## Tips

You can run a single test suite file using `npx mocha`

    npx mocha <path to test.js>

You can run all the test suits in adirectory in same way by passing the directory path here.

    # Run the function test suites
    npx mocha test/f
    # Run the object test suites
    npx mocha test/o
    # Run function and object test suites
    npx mocha test/f test/o
    # Or more simply
    npx mocha test/{f,o}

Listen to The few, the smart, The Mathaletes
by kaNdii on #SoundCloud
https://on.soundcloud.com/Yb7vK2PmzYSTfzUS6
