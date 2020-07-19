---
date: 2019-01-27
summary: "A first pass at abstracting out Firebase e-mail & password auth via a custom React hook."
tags: [authentication, firebase, hooks, react]
title: "Firebase authentication via a custom React hook"
---

I’m sure I don’t have to tell anyone that [hooks](https://reactjs.org/docs/hooks-intro.html "React docs: Hooks") are the topic of much discussion in the React community of late. Members of the React core team introduced hooks at React Conf 2018, and Ryan Florence followed up with a deeper dive into some real-world examples. (You can watch all the hooks-related talks conveniently packaged together [in this video](https://www.youtube.com/watch?v=dpw9EHDh2bM&t=125s "React Today and Tomorrow and 90% Cleaner React with Hooks")[^1].)

I’ve got a personal project that uses [Firebase](https://firebase.google.com/ "Firebase") for authentication and persistence, and I was already planning to start the front end from scratch for the fourth time[^2], so I decided to try doing it with hooks. The project is my personal data cloud—diabetes data, fitness tracker data, &c—and one of my desiderata in version 4 of the front end is to have the authentication piece(s)[^3] modularized so that I can extract it/them to spin off single-view, standalone, independently deployed (i.e., at different URLs from the main app) data visualizations of particular datasets. Since hooks are the new hotness as far as modular, composable React abstractions, I thought I’d start off v4 with an attempt at creating a custom `useFirebaseAuth` hook.

After some trial and error—including a massive memory leak in my browser at one point <span role='img' aria-label='sweat smile emoji'>😅</span>—I’ve got a `useFirebaseAuth` custom hook that I think is pretty nice. Read on for the details!

<span role='img' aria-label='caution sign emoji'>⚠️</span> Remember: [don't rewrite your (production) apps with hooks!](https://reactjs.org/docs/hooks-faq.html#adoption-strategy "React Hooks FAQ: Adoption strategy") This is a personal project and a greenfield app, so experimenting with hooks here is very much justified.

## prerequisites

This blog post assumes familiarity with:

- current (ES6+) JavaScript, as configured in [create-react-app](https://facebook.github.io/create-react-app/docs/supported-browsers-features#supported-language-features "CRA Docs: Supported Language Features")
- React, including the hooks RFC (I recommend that you watch [the talks](https://www.youtube.com/watch?v=dpw9EHDh2bM&t=125s) mentioned above before reading this, and/or read Dan Abramov’s [“Making Sense of React Hooks”](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889 "Medium: Making Sense of React Hooks"))

(Normally I put an offer here to help if you’re interested in this material but don’t meet the prereqs, but in this case I don’t feel it’s appropriate: this is an advanced React blog post and only really appropriate for intermediate to advanced React users.[^4])

## Firebase auth via a custom hook

<span role='img' aria-label='memo emoji'>📝</span>: I’m not providing any complete code examples for this post because that would require wiring up an actual Firebase app, and in any case I think code snippets and/or pseudocode are sufficient to get the gist across.

### the html

`useFirebaseAuth` is a custom hook for logging in, so the render block JSX is just a couple of inputs and a submit button:

```jsx
<div>
  <form onSubmit={onSubmit}>
    <input type="email" />
    <input type="password" />
    <button type="submit">login</button>
  </form>
</div>
```

### the inputs

Out of laziness more than a real need to abstract out the logic, I copied the `useFormInput` custom hook from Dan Abramov’s React Conf talk. Here’s what it looks like:

```jsx
import { useState } from "react"

export default function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue || "")

  function handleChange(e) {
    setValue(e.target.value)
  }

  return {
    onChange: handleChange,
    value,
  }
}
```

Hooking these up to the HTML is just like in Dan’s talk:

```jsx
import React from "react"

import useFormInput from "./hooks/useFormInput"

export default function App() {
  const email = useFormInput()
  const password = useFormInput()

  return (
    <form>
      <input {...email} />
      <input {...password} />
    </form>
  )
}
```

### sketching the custom Firebase auth hook

So that’s the e-mail and password inputs taken care of. We can pass `email.value` and `password.value` to a custom hook that contains all the Firebase-specific code.

Authentication for a Firebase app is a little different than standard auth via an HTTP `POST` that returns a `user` object in the response. Instead, you use a `signInWithEmailAndPassword` method from the Firebase client library, passing in the `email` and `password` credentials. Error handling—via `catch`—after that call is expected, but you don’t get a response containing the logged-in user’s info on the happy path. Instead, you set up an observer that listens for auth state changes, and on such an event (such as shortly after a successful `signInWithEmailAndPassword` call), _then_ you get the `user` via a callback. Here’s the whole flow:

```jsx
firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .catch((err) => {
    // do something to surface the error
  })

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // do something to set the current user in the app's state
  } else {
    // do something to clear current user info/redirect to login page
  }
})
```

So what do we need to wrap up this Firebase-specific logic in a custom hook? Even though the above code doesn’t contain any explicit API calls, that’s still what’s going on under the hood, and such requests out to external resources are side effects, which means we’ll need [the `useEffect` hook](https://reactjs.org/docs/hooks-effect.html "Using the Effect Hook").

So, a very rough sketch:

```jsx
import firebase from "firebase/app"
import "firebase/auth"
import { useEffect } from "react"

firebase.initializeApp({
  // Firebase app init, deets unimportant here
})

export default function useFirebaseAuth(email, password) {
  useEffect(() => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        // do something to surface the error
      })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // do something to set the current user in the app's state
      } else {
        // do something to clear current user info/redirect to login page
      }
    })
  }, [email, password])

  // return something???
}
```

### form submission

This first sketch of `useFirebaseAuth` has a major problem. I’ve supplied a second argument to `useEffect`—the array `[email, password]`, which ensures that the function supplied as the first argument of `useEffect` will only be called when `email` or `password` has changed instead of on every render cycle of the component in which the custom hook is called. But the problem is that here the function will still fire on every single character typed in by the user to complete their `email` or `password`—i.e., after every `onChange` that triggers an update to `email` or `password`. This will absolutely hammer the Firebase APIs with login requests that will mostly fail until the final one that perhaps doesn’t (if the user types it correctly and Firebase API throttling hasn’t kicked in <span role='img' aria-label='sweat smile emoji'>😅</span>). So what’s missing? At its root, the problem is that this custom hook doesn’t yet handle the form _submission_ step—that is, clicking the “log in” button.

Dan spent a lot of time in his talk working on examples involving `<input>`s, but he never worked with a `<form>` with this kind of button-click submission step. After noodling on this problem for a bit, I came to the conclusion that it’s necessary to use some kind of sentinel variable tracking form submission state (i.e., submitted or not) as part of the trigger for the `useEffect` hook that’s at the core of `useFirebaseAuth`.

### the full auth hook

So here's the full `useFirebaseAuth` custom hook that I’ve ended up with, including three additional `useState` calls to track not just the form submission status but also the results of login—i.e., the current logged-in user—and any login errors that might occur:

```jsx
import _ from "lodash"
import firebase from "firebase/app"
import "firebase/auth"
import { useEffect, useState } from "react"

firebase.initializeApp({
  // Firebase app init, deets unimportant here
})

export default function useFirebaseLogin(email, password) {
  const [loginError, setLoginError] = useState(null)
  const [user, setUser] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    if (e) {
      e.preventDefault()
    }
    setSubmitted(true)
  }

  useEffect(() => {
    if (email && password && submitted) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((err) => {
          setLoginError(_.pick(err, ["code", "message"]))
          setSubmitted(false)
        })

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUser(user)
          setSubmitted(false)
        } else {
          setUser(null)
          setSubmitted(false)
        }
      })
    }
  }, [email, password, submitted])

  return { loginError, onSubmit: handleSubmit, submitted, user }
}
```

Now let’s break this down. The hook takes two params: `email` and `password`. These are created by the `useFormInput` hooks. You could have instead employed `useState` to create `email` and `setEmail` within the Firebase auth hook, but I think that a more sophisticated `useFormInput` that handles and tracks all sorts of input validation and state (touched, focused, blurred, &c) could be something I want eventually, so there’s value in keeping that abstraction separate.

As mentioned above, the Firebase hook does still employ `useState` to create variables as well as setters to track auth errors, the logged-in user, and the `submitted` state:

```jsx
const [loginError, setLoginError] = useState(null)
const [user, setUser] = useState(null)
const [submitted, setSubmitted] = useState(false)
```

We create a submit handler function to be returned and used in the `<Login>` component employing the `useFirebaseAuth` hook:

```jsx
function handleSubmit(e) {
  if (e) {
    e.preventDefault()
  }
  setSubmitted(true)
}
```

Finally, the `useEffect` call, which is similar, but not quite the same as before:

```jsx
useEffect(() => {
  if (email && password && submitted) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        setLoginError(_.pick(err, ["code", "message"]))
        // reset submitted state to allow for trying again
        setSubmitted(false)
      })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        // no need to setSubmitted(false); here
        // assuming page will redirect from /login elsewhere...
      } else {
        setUser(null)
      }
    })
  }
}, [email, password, submitted])
```

Now we’ve got the `submitted`variable to tell us whether the user has clicked the login button yet or not, and so we don’t actually employ the Firebase client library methods—`signInWithEmailAndPassword` and `onAuthStateChanged`—until we have non-empty `email` and `password` _and_ a truthy `submitted` flag. Before I added this conditional logic and put _both_ client library method calls inside it, I created a tab-killing memory leak by setting up a new auth observer on every render! Note how I’ve also added `submitted` to the list of variables (in the second argument to `useEffect`) that will trigger a call of the effect function if they change.

Finally, the custom hook returns the caught login error, if any, the submit handler function, and the `user` and `submitted` state to be used in the `<Login>` component that employs the hook.

Which brings us to the `<Login>` component itself! Showing just the important details, it will look something like the following:

```jsx
import useFirebaseAuth from "./hooks/useFirebaseAuth"
import useFormInput from "./hooks/useFormInput"

export default function Login() {
  const email = useFormInput()
  const password = useFormInput()

  const { loginError, onSubmit, submitted, user } = useFirebaseAuth(
    email.value,
    password.value
  )

  if (user) {
    return <Redirect to="/home" />
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input {...email} />
        <input {...password} />
        <button type="submit">{submitted ? "logging in..." : "log in"}</button>
      </form>
      <h1>{user ? "Logged in!" : "Not logged in"}</h1>
      {loginError ? <h2>{`Login error: ${loginError.message}`}</h2> : null}
    </div>
  )
}
```

Note how using the sentinel variable `submitted` to prevent the effect function from firing too often has the bonus side effect of giving us state to use to update the login button text—from ‘log in’ to ‘logging in…’—when the login request is in process, helping us to provide a nicely <span role='img' aria-label='sparkles emoji'>✨</span>polished<span role='img' aria-label='sparkles emoji'>✨</span> login UX.

<span role='img' aria-label='finger pointing up emoji'>☝</span>: Remember that[^5] you need to install `react@next` (and `react-dom@next`) to try out hooks/be able to import any of the built-in hooks like `useState`.

<hr style="border: 0; height: 1px; background-color: #FF5D73;/>

[^1]: I recommend watching at 1.25x speed because I’m one of those weirdos.
[^2]: Why I’ve restarted the front end to the project so many times is a story for another time…
[^3]: For now just normal, e-mail & password Firebase login, but eventually I plan to implement Firebase’s anonymous login feature, which I expect to be the main login type used on the standalone “apps.”
[^4]: If you aren’t familiar with React, I recommend starting with [the official tutorial](https://reactjs.org/tutorial/tutorial.html "React Tutorial") and leveling up from there! If you need advice regarding how to level up after completing the tutorial, feel free to [reach out](mailto:jana.eliz.beck@gmail.com "E-mail jana.eliz.beck@gmail.com").
[^5]: As of the time of this writing, in January 2019.
