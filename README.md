# kintohub.com

The default repo for Kintohub.com! This is gonna be one hell of a project.
😎

* [Contribution guidelines for this project](./CONTRIBUTION.md)

## First time setup

* _(optional)(e2e)_ install [`java run time`](https://www.java.com/en/download/mac_download.jsp) for the e2e tests
* install [`nvm`](https://github.com/creationix/nvm)
* _(optional)(e2e)_ install `allure` to be able to view allure e2e test reports using `brew install allure`
* `nvm use`
* create `.env` file (it is ignored) and setup all the env vars in it, you can check`~/.env.sample` for reference
  * you need to fill out the app id and env name in order to connect with the backend
  * you need to create a github OAuth App and add the client id to `.env`

## Commands

The following command shortcuts are available during development:

* `npm install`: Installs all NPM dependencies.
* `npm start`: Starts a local web server at `http://localhost:3000`.
* `npm test`: Runs unit tests.
* `npm run test:e2e` Compile the app and runs all the e2e tests
* `npm run test:e2e:cache` Run all the e2e tests without compiling the app
* `npm run lint`: Runs linting
* `npm run allure`: open the e2e test allure report _(needs allure to be installed)_

## FAQ

### Setting up google analytics

you only need to assign the following env variable to enable google analytics

```
REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID=UA-xxx-1
```

> this won't affect development, you don't need to add it

### Setting up the backend url

dependening on the enviornment the backend supports different url types

* for example on live backend expects

```
microservice.api.kintoblock.com
```

* for localhost backend expects

```
localhost/microservice
```

we have different options for changing the schema by using the env variable `REACT_APP_URL_TYPE` you can set it to one of the following

* `append` used mainly for localhost by appending the microservice name - _sample url_ `localhost/microservice`
* `subdomain` used for production by adding the microservice as a subdomain - _sample url_ `microservice.localhost/`
* `null` the microservice will be ignored in the url - _sample url_ `localhost`

### Setting up and running E2E tests

* you need to have the client _(this project)_ and server _(restful-to-grpc-gateway-service)_ projects under the same directory as their siblings (if you want to rename the server folder name to another name, you need to update the `.env` file)
* you need to duplicate `.env.sample` and rename it to `.env`
* remove the line that have `REACT_APP_GITHUB_CLIENT_ID` from the `.env` for now
* good rule of practice whenever you pull run the e2e tests using `npm run test:e2e` this takes extra time because it compiles the client side code
* after that and when writing new e2e tests it is better to run e2e tests using `npm run test:e2e:cache`

> Note: whenever any code inside `/src` changes the app needs to be recompiled (use `npm run test:e2e` to do that)

### How to add a new blog post

you will need to update `./constants/blog` add a new object to `posts` array with the following

```
{
  url: 'http://blogurl',
  title: 'Blog Title',
  author: 'Author Name',
  department: 'Department Name', // Ex: Executive Team
  avatarClass: 'className', // you can use joseph|nadeem|francois|laura|raven|guillaume
  date: '2017-07-28' // Format: YYYY-MM-DD
}
```

to add a new avatar, you need to edit `_blog-gallery.scss` and add it under `.blog-gallery`

### Connect github

you need to make sure the `Authorize callback URL` for the github app is

```
http://clienturl.com/githubConnect
```

### How to hide a page/component from production

in `pageHelper` there is a function `isProduction()` defined, you will need to wrap the component with an if to hide it

Ex:

```
import {isProduction} from './helpers/pageHelper'

{!isProduction() ? <SecretComponent /> : null }
```

##### Note:

there is two env variables that affect this option

* `REACT_APP_SHOW_DEV_UI` you set to true if `NODE_ENV` is `PRODUCTION` (when doing `npm build`) to still show dev UI
* `REACT_APP_SHOW_PRODUCTION` you set to true if `NODE_ENV` is not `PRODUCTION` but you still want to show production UI
