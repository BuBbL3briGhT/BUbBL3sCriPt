
.       .   .   .                       .
|       |   |   |                 o     |
|-. . . |-. |-. | ,-. ,-. ,-. ;-. . ;-. |-
| | | | | | | | | |-' `-. |   |   | | | |
`-' `-` `-' `-' ' `-' `-' `-' '   ' |-' `-'

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

