# kintohub.com

The default repo for Kintohub.com! This is gonna be one hell of a project.
😎

- [Contribution guidelines for this project](./CONTRIBUTION.md)

## First time setup
- *(optional)(e2e)* install [`java run time`](https://www.java.com/en/download/mac_download.jsp) for the e2e tests
- install [`nvm`](https://github.com/creationix/nvm)
- *(optional)(e2e)* install `allure` to be able to view allure e2e test reports using `brew install allure`
- `nvm use`
- create `.env` file (it is ignored) and setup all the env vars in it, you can check`~/.env.sample` for reference
  - you need to create a github OAuth App and add the client id to `.env`

## Commands

The following command shortcuts are available during development:

* `npm install`: Installs all NPM dependencies.
* `npm start`: Starts a local web server at `http://localhost:3000`.
* `npm test`: Runs unit tests.
* `npm run test:e2e` Compile the app and runs all the e2e tests
* `npm run test:e2e:cache` Run all the e2e tests without compiling the app
* `npm run lint`: Runs linting
* `npm run allure`: open the e2e test allure report *(needs allure to be installed)*

## FAQ

### Setting up the backend url
dependening on the enviornment the backend supports different url types

- for example on live backend expects

```
microservice.api.kintoblock.com
```

- for localhost backend expects

```
localhost/microservice
```

we have different options for changing the schema by using the env variable `REACT_APP_URL_TYPE` you can set it to one of the following

- `append` used mainly for localhost by appending the microservice name - *sample url* `localhost/microservice`
- `subdomain` used for production by adding the microservice as a subdomain - *sample url* `microservice.localhost/`
- `null` the microservice will be ignored in the url - *sample url* `localhost`


### Setting up and running E2E tests
- you need to have the client *(this project)* and server *(restful-to-grpc-gateway-service)* projects under the same directory as their siblings (if you want to rename the server folder name to another name, you need to update the `.env` file)
- you need to duplicate `.env.sample` and rename it to `.env`
- remove the line that have `REACT_APP_GITHUB_CLIENT_ID` from the `.env` for now
- good rule of practice whenever you pull run the e2e tests using `npm run test:e2e` this takes extra time because it compiles the client side code
- after that and when writing new e2e tests it is better to run e2e tests using `npm run test:e2e:cache`

> Note: whenever any code inside  `/src` changes the app needs to be recompiled (use `npm run test:e2e` to do that)

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

### How to hide a page/component from production

in `pageHelper` there is a function `isProduction()` defined, you will need to wrap the component with an if to hide it

Ex:
```
import {isProduction} from './helpers/pageHelper'

{!isProduction() ? <SecretComponent /> : null }
```

##### Note:

if you wanna compile a build and still show dev UI, you can set the following env variable
```
REACT_APP_SHOW_DEV_UI=true
```
this is useful for e2e tests & staging

