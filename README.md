# ReactSurface

Creates a Surface + LiveView container for rendering and updating react components.

Includes a hook which will perform an initial render of the component - and when new props are provided, will hydrate the component.
This keeps the components internal state intact when props are updated from the server.

## Example

### On the Server in a Surface component

Where `props` is a map of JSON serializable values.

```
 <React component="HelloReactSurface" props={{ %{name: "Doug"} }}/>
```

This will result in the following DOM being generated in Elixir.

```html
<div
  id="HelloReactSurface"
  rs-comp='["HelloReactSurface",{"name": "Doug"}]'
  phx-hook="__ReactSurface"
>
  <div phx-update="ignore"></div>
</div>
```

### On the Client when intializing LiveView

```js
// import your react components (considering how to do dynamic importing of these to keep em out of main bundle..)
import HelloReactSurface from "./components/HelloReactSurface";
// use the buildHook function to build a hook for LiveView.
import { buildHook } from "react_surface";

// create a components object that our hook will use to resolve a component
const components = {HelloReactSurface};
const reactSurfaceHook = buildHook(components)
// OR: const {__ReactSurface} = buildHook(components)
...

// combine react surface hook with your other hooks
const hooks = {...someotherhooks, ...reactSurfaceHook }
// OR: const hooks = {__ReactSurface, ...someotherhooks }

// pass as liveSocket hook option.
let liveSocket = new LiveSocket("/live", Socket, {
  hooks,
  params: { _csrf_token: csrfToken },
});

```

## LiveView Hook event handling

LiveView events can be accessed via the `useLiveContext` React hook exported from the javascript package.
This hook returns an object with the functions: `{handleEvent, pushEvent, pushEventTo}`

See the `test/demo/assets/components/HelloReactSurface.js` component for an example.

## Installation

If [available in Hex](https://hex.pm/docs/publish), the package can be installed
by adding `react_surface` to your list of dependencies in `mix.exs`:

```elixir
def deps do
  [
    {:react_surface, "~> 0.1.0"}
  ]
end
```

From github:

```elixir
def deps do
  [
    {:react_surface, github: "harmon25/react_surface"}
  ]
end
```

Add `react_surface` as a dep in your package.json

```json
{
  ...
  "react_surface": "file:../deps/react_surface"
}
```

## How to add react to your phoenix app

In your assets dir:

```bash
npm install react react-dom --save
npm install @babel/preset-env @babel/preset-react --save-dev
```

Add `"@babel/preset-react"` as a babel preset in `.babelrc`

Add the following to your `assets/webpack.config.js` file to ensure only a single react + react-dom is included in your bundle:

```
module.exports = (env, options) => ({
  // add:
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom')
    }
  }
  //
});
```

## Inspiration

This library is inspired by [react-phoenix](https://github.com/geolessel/react-phoenix) and [phoenix_live_react](https://github.com/fidr/phoenix_live_react).

Check em out if you want to use react components in an eex or leex templates.
