MatchstickJS.com [![Build Status](https://travis-ci.org/edj-boston/matchstickjs-com.svg?branch=master)](https://travis-ci.org/edj-boston/matchstickjs-com) [![Dependency Status](https://david-dm.org/edj-boston/matchstickjs-com.svg)](https://david-dm.org/edj-boston/matchstickjs-com) [![devDependency Status](https://david-dm.org/edj-boston/matchstickjs-com/dev-status.svg)](https://david-dm.org/edj-boston/matchstickjs-com#info=devDependencies)
================

The homepage for the [Matchstick](https://www.npmjs.org/package/matchstick) NodeJS module. See the site live at [https://matchstickjs.com](https://matchstickjs.com).

![Screen Shot](/src/misc/screen-shot.png)


Installation
------------

Switch to your local copy, install gulp globally, then install the rest of the dependancies with [NPM](https://www.npmjs.org/).

```sh
$ cd matchstickjs.com
$ npm install -g gulp
$ npm install
```


Tasks
-----

Run the default gulp task to watch source files and automatically rebuild the site.

```sh
$ gulp
```

Optionally pass a port to control the local server.

```sh
$ gulp -p 3001
```
You should see output like this:

![Gulp Test](/src/misc/gulp-test.png)


To Do
-----

* More tests
