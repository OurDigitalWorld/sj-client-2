# sj-client-2

sj-client-2 is a front-end web client which provides a search engine for accessing [DigitalNZ's Supplejack](http://digitalnz.github.io/supplejack/) API.
This client is built using the [Ember.js](https://emberjs.com/) (3.5) framework .

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd sj-client-2`
* `npm install`

## Setup

In order to utilise this front-end web client, it must be pointed at an active Supplejack API service.

* rename `environment.build` to `environment.js`
* in `environment.js`:
  * customise `APP.host`, `fastboot.hostWhitelist` to point to your Supplejack API url
  * customise `App.api_key` to use your Supplejack API key.

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

This client is being deployed via scp with a node cli script. To deploy this app the same way:

* customise the `deploy` cli script in `package.json` to ensure that it is pointing at the correct username, server, and directory.
* use `npm run deploy` to deploy.

If it's the first deploy:

* `ssh` into your web server and navigate to the web directory
* Ensure `screen` is installed on your web server
* `screen -S fastboot`
* `sudo node fastboot-server.js`
* detach screen


Depending on your need, other deployment methods could be used instead.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* [Supplejack](http://digitalnz.github.io/supplejack/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
