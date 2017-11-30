# kintohub.com

The default repo for Kintohub.com! This is gonna be one hell of a project.
😎

- [Contribution guidelines for this project](./CONTRIBUTION.md)

## First time setup
- install [`java run time`](https://www.java.com/en/download/mac_download.jsp) for the e2e tests
- install [`nvm`](https://github.com/creationix/nvm)
- `nvm use`
- create `.env` file (it is ignored) and setup all the env vars in it, you can check`~/.env.sample` for reference
  - you need to create a github OAuth App and add the client id to `.env`

## Commands

The following command shortcuts are available during development:

* `npm install`: Installs all NPM dependencies.
* `npm start`: Starts a local web server at `http://localhost:3000`.
* `npm test`: Runs unit tests.
* `npm run test:e2e` Runs all the e2e tests
* `npm run lint`: Runs linting


## FAQ

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

