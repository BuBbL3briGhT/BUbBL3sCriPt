
                                          o
     .       .   .   .     o                 .
     |  o    |   |   |          °      o     |
     |-. . . |-. |-. | ,-. ,-. ,-. ;-. . ;-. |-
     | | | | | | | | | |-' `-. |   |   | | | |
     `-' `-` `-' `-' ' `-' `-' `-' ' ° ' |-' `-'
                     °      o
               o

What is Bubblescript?
---------------------
Bubblescript is a small Clojure-like lisp-inspired
language that runs on Node.js.  It provides a concise
s-expression syntax and a tiny standard library for
working with lists, maps, functions, and the usual
functional primitives.

Install
-------
    npm install -g bubblescript

Run the REPL
------------
    $ bubls
    %< (console.log "Hello Bubble")
    Hello Bubble
    undefined
    %< .exit

Quick examples
--------------
Some math
    (+ 1 2)
    (+ 1 2 3)
    (- 5 2)
    (/ 8 2)
    (* 7 8 9)

Define a function
    (mufn greet [name]
      (puts name))

    (greet "Hi!")

Locals
    (let [n 777]
      (puts n))

Looping
    (loop [i 0]
      (puts "tick")
      (if (< i 3)
        (recur [i (+ i 1)])))

Modules and require
-------------------
Bubblescript supports modular code via the `require`
mechanism.

- You can `require` a module from `lib/` by its
basename:
    (const list (require "list"))

- You can extract specific exports:
    (const { map reduce } (require "list"))

Example: create a module (lib/hello.🫧)
    (module.exports {
      say-hello
    })

    (🫧 (say-hello name)
      (puts "Hello," name))

Then from your script:
    (const hello (require "hello"))
    (hello.say-hello "Bubbly")

Example: using list/bubblesort
------------------------------
(Assuming lib/list exports `bubblesort`.)

    (const { bubblesort } (require "list"))
    (const xs °(3 1 2 7 4))
    (puts (bubblesort xs)) ; -> °(1 2 3 4 7)

Developer setup
---------------
Clone, install dev deps and run tests:

    git clone \
      git@github.com:BuBbL3briGhT/BUbBL3sCriPt.git \
      bubblescript
    cd bubblescript
    npm install
    npm test

Running specific tests:
    npx mocha test/list.js

Notes & suggestions
-------------------
- lib/list.🫧 cleaned and a pure-BubbleScript
  `bubblesort` implementation was added; a JS
  fallback (lib/list.js) is provided for Node-side
  consumers/tests.
- The comparator convention: comparator(a b) returns
  true when a < b (default comparator uses
  numeric/string <).
- For runtime bootstrapping the tests use
  `require('../src/index')` (⛄️ branch).
- Consider normalizing non-ASCII names in a stable
  release; aliases can be provided for backward
  compatibility.

Contributing
------------
If you want me to push these changes and open the PR,
I can do that once you confirm and provide push
rights, or you can apply the patch locally using the
commands below.
