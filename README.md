MatchstickJS.com [![Build Status](https://travis-ci.org/edj-boston/matchstickjs-com.svg?branch=master)](https://travis-ci.org/edj-boston/matchstickjs-com) [![Dependency Status](https://david-dm.org/edj-boston/matchstickjs-com.svg)](https://david-dm.org/edj-boston/matchstickjs-com) [![devDependency Status](https://david-dm.org/edj-boston/matchstickjs-com/dev-status.svg)](https://david-dm.org/edj-boston/matchstickjs-com#info=devDependencies)
================

The homepage for the [Matchstick](https://www.npmjs.org/package/matchstick) NodeJS library. See the site live at [https://matchstickjs.com](https://matchstickjs.com).

![Screen Shot](/src/misc/screen-shot.png)


Installation
------------

These directions assume you already have working versions of [Node](http://nodejs.org/) and [NPM](https://www.npmjs.org/) installed.


### Dependencies

Install the dependancies with [NPM](https://www.npmjs.org/). Install gulp globally.

```sh
$ cd matchstickjs.com
$ npm install -g gulp
$ npm install
```


Tasks
-----

Run the default gulp task to watch source files and dynamically rebuild the site.

```sh
$ gulp
```

Optionally pass a port option to control the local server.

```sh
$ gulp -p 3001
```

Gulp will watch files and automatically build, test, lint, and check dependencies for you.

![Gulp Test](/src/misc/gulp-test.png)


To Do
-----

* More tests
