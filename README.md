## redux-first-router Navigator component

In the project directory, you can run:

### `yarn add redux-first-router-navigator`

(or `npm install redux-first-router-navigator`)

#### Redux first router as usual :

```javascript
// store.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRoutes } from 'redux-first-router';
import createHistory from 'history/createBrowserHistory';

const history = createHistory({ basename: '/' });

const routes = {
  HOME: '/',
  POSTS: {
    path: '/posts'
  },
  POST: {
    path: '/posts/:id'
  },
};

const {
  reducer: location,
  middleware: locationMiddleware,
  enhancer: locationEnhancer,
} = connectRoutes(history, routes);

const store = createStore(
  combineReducers(config, {
    location,
  }),
  compose(
    locationEnhancer,
    applyMiddleware(locationMiddleware)
  )
);

export default store;
```


```javascript
// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
```

### With redux-first-router-navigator

```javascript
// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Navigator from 'redux-first-router-navigator';
import store from './store';

const renderDefault = ({ payload }) => (<div>Your default component</div>} />);

ReactDOM.render(
  <Provider store={store}>
    <Navigator renderDefault={renderDefault} />
  </Provider>,
  document.getElementById('root')
);
```

in your routes configuration :
```javascript
// store.js

import PostList from './components/PostList';
import Post from './components/Post';

/* ... */

const routes = {
  HOME: '/',
  POSTS: {
    path: '/posts',
    Component: PostList
  },
  POST: {
    path: '/posts/:id',
    Component: Post
  },
};

/* ... */
```

```javascript
// ./components/Post.js

import React from 'react';

export default ({ id }) => (<div>{ id }</div>); // prop "id" is your route payload
```

### Default component
If you don't define any component (like "Home" route in the exemple above), the default component will be rendered, that's why ```renderDefault``` must be defined.

### Error Handler !!
React v16.0 introduce the "Error Boundaries" concept, redux-first-router-navigator implement this concept to display a fallback UI.
To use your own, simply use ```renderError``` property in the NavigatorComponent

### Decorate your component
Finaly you should easaly decorate all of your component with a global layout for exemple thanks to the ```renderComponent``` property 

#### exemple :
```javascript
// ./components/Layout.js';

import React from 'react';
import Link from 'redux-first-router-link';

export default ({ Component, payload, children }) => (
  <div>
    <Link to="/">Home</Link>
    <div>
      { Component && <Component {...payload} /> }
      { children }
    </div>
  </div>
);
```

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navigator from 'redux-first-router-navigator';
import Layout from './components/Layout';
import Home from './components/Home';

const renderComponent = (props) => (<Layout {...props} />);

const renderError = (error, info) => (
  <Layout>
    <div>{ error.message }</div>
    <div>{ info.componentStack }</div>
  </Layout>
);
const renderDefault = ({ payload }) => (<Layout Component={Home} payload={payload} />);

ReactDOM.render(
  (
    <Provider store={store}>
      <Navigator
        renderComponent={renderComponent}
        renderError={renderError}
        renderDefault={renderDefault}
      />
    </Provider>
  ), document.getElementById('root')
);
```

