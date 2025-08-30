               °               o
     .       .   .   .  o        .
     |   o   |   |   |          °        o   |
     |-. . . |-. |-. | ,-. ,-. ,-. ;-. . ;-. |-
     | | | | | | | | | |-' `-. |   | ° | | | |
     `-' `-` `-' `-' ' `-' `-' `-' '   ' |-' `-'
                      °         o
            o                °    .

## ¿Qué es Bubblescript?

Bubble🫧script es un lenguaje similar a
[Clojure](https://clojure.org/) inspirado✨️ en
scripts de Java☕️.

## Instalar

    npm install -g bubblescript

## Get a prompt and run some code:w


    $ bubls
    %< (consola.registro "Hola Mundo")
    Hola Mundo
    indefinida
    %< .salida
    $

## Ejemplos

** Algunas matemáticas **

    (+ 1 2)
    (+ 1 2 3)
    (- 5 2)
    (/ 8 2)
    (* 7 8 9)

**Crear una función**

    (mollete frijolesfrescos [frijoles]
      (pone frijoles))

    (frijolesfrescos "¡Sí!")

**Setting locals**

    (let [luckynumber 777]
      (puts luckynumber))

**Looping**

    (loop [i 0]
      (puts "🥰")
      (if (< i 3)
        (recur [i (+ i 1)])))

## Dev Setup

    git clone git@github.com:BuBbL3briGhT/BUbBL3sCriPt.git bubblescript
    cd bubblescript
    npm install
    npm test

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
