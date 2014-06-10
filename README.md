MatchstickJS.com
================

The homepage for the [Matchstick](https://www.npmjs.org/package/matchstick) NodeJS library. See the site live at [https://matchstickjs.com](https://matchstickjs.com).

![Screen Shot](/assets/img/screen-shot.png)


Installation
------------

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
    "distributionId" : "..."
}
```


Test
----

Run the custom gulp "test" task. It will call mocha with the spec reporter option.

```sh
$ gulp test
```

You should see output like the following:

![Gulp Test](/assets/img/gulp-test.png)


Deploy
------

Run the custom gulp "deploy" task. It will automatically run the tests and stop of one fails. If the tests pass successfully you will be prompted to choose and environment to deploy to.

![Gulp Deploy](/assets/img/gulp-deploy.png)


To Do
-----

* ~~Build~~
* ~~Watch~~
* ~~Deploy~~
* ~~Tests~~
* Wrap my Void module in a stream-friendly gulp module to perform Cloudfront cache ivalidation
* Serve via Express (rather than NGINX) locally
* Live reload in browser
* More tests