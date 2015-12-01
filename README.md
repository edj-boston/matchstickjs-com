MatchstickJS.com [![Build Status](https://travis-ci.org/edj-boston/matchstickjs-com.svg?branch=master)](https://travis-ci.org/edj-boston/matchstickjs-com) [![Dependency Status](https://david-dm.org/edj-boston/matchstickjs-com.svg)](https://david-dm.org/edj-boston/matchstickjs-com) [![devDependency Status](https://david-dm.org/edj-boston/matchstickjs-com/dev-status.svg)](https://david-dm.org/edj-boston/matchstickjs-com#info=devDependencies)
================

The homepage for the [Matchstick](https://www.npmjs.org/package/matchstick) NodeJS library. See the site live at [https://matchstickjs.com](https://matchstickjs.com).

![Screen Shot](/assets/misc/screen-shot.png)


Installation
------------

These directions assume you already have working versions of [Node](http://nodejs.org/) and [NPM](https://www.npmjs.org/) installed.


### Dependencies

Install the dependancies with [NPM](https://www.npmjs.org/). you may need to use `sudo` depending on your local setup.

```sh
$ cd matchstickjs.com
$ npm install
```


Tasks
-----

Run the default gulp task to watch source files and dynamically rebuild the site.

```sh
$ gulp
```

Run the "build" task to do a one-time build. This task is also used by Travis CI for continuous integration.

```sh
$ gulp build
```


Test
----

Run the custom gulp "test" task. It will call mocha with the spec reporter option.

```sh
$ gulp test
```

You should see output like the following:

![Gulp Test](/assets/misc/gulp-test.png)


To Do
-----

* Wrap my Void module in a stream-friendly gulp module to perform Cloudfront cache ivalidation
* More tests