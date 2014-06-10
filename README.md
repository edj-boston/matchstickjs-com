MatchstickJS.com
================

[![Build Status](https://travis-ci.org/edj-boston/matchstickjs-com.svg)](https://travis-ci.org/edj-boston/matchstickjs-com)

The homepage for the [Matchstick](https://www.npmjs.org/package/matchstick) NodeJS library. See the site live at [https://matchstickjs.com](https://matchstickjs.com).

![Screen Shot](/assets/misc/screen-shot.png)


Installation
------------

These directions assume you already have working versions of [Node](http://nodejs.org/) (0.10 or 0.11) and [NPM](https://www.npmjs.org/) installed.


### Dependencies

Install the dependancies with [NPM](https://www.npmjs.org/). you may need to use `sudo` depending on your local setup.

```sh
$ cd matchstickjs.com
$ npm install
```


### Globals

The following modules probably need to be installed globally to function properly:

```sh
$ npm install -g gulp
$ npm install -g bower
$ npm install -g mocha
```


### Bower

Bower is a front end dependency manager used to fetch and update assets like Boostrap, jQuery, and Font Awesome.

```sh
$ bower install
```


### AWS

The site is designed to be deployed to AWS S3, which serves as an origin for AWS CloudFront CDN. The successfully deploy you will need a file called `aws.json` in the site root which contains the following object:

```js
{
	"key" : "...",
	"secret" : "...",
    "dist" : "..."
}
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


Deploy
------

Run the custom gulp "deploy" task. It will automatically run the tests and stop of one fails. If the tests pass successfully you will be prompted to choose and environment to deploy to.

![Gulp Deploy](/assets/misc/gulp-deploy.png)


To Do
-----

* ~~Build~~
* ~~Watch~~
* ~~Deploy~~
* ~~Tests~~
* ~~Travis CI~~
* ~~404 page~~
* Convert CSS to SASS
* Wrap my Void module in a stream-friendly gulp module to perform Cloudfront cache ivalidation
* Serve via Express (rather than NGINX) locally
* Live reload in browser
* Continuous deployment?
* More tests