# ReactSurface

Creates a Surface + LiveView container for rendering and updating React components.

- Includes a liveview js hook which will perform an initial render of the component
  - New props provided in an update performs hydration, this keeps the components internal state intact when props are updated from the server
- A React LiveView Context that is injected with each render/update providing access to liveview functions
- An optional SSR macro that can assist with generating placeholder or static react markup at compile time
  - This runs a hydrate when mounting, as it was rendered server side

## Client Setup

Create a components object to be passed into the hook generation function

*It is recommended to create a module that exports all your components.*

```js 
import {lazy} from "react"
import Component1 from "./component1"
import Component2 from "./component2" 

// you can add some lazy loading here to keep the components out of your main bundle
// lazily loaded components must be wrapped in a `React.Suspense` container to provide loading fallback
export default {
  Component1,
  Component2,
  Component3: lazy(()=> import("./component3"))
}
```

```js 
import components from "./components" 
import { buildHook } from "react-surface";

// pass component mapping to buildHook function
const reactSurfaceHook = buildHook(components)
// setup liveview as normal, merging your hooks with react-surface hooks.
let liveSocket = new LiveSocket("/live", Socket, {
  {...otherhooks, ...reactSurfaceHook},
  params: { _csrf_token: csrfToken },
});
```

## SSR Setup

If not performing SSR via `use ReactSurface.SSR` this can be skipped.

### Run mix task to create SSR script inside your asset directory.

```
mix gen_ssr_script
```

### Define `node_ssr` config in config.exs

This is used to configure `node_ssr` at compile time to understand where your components are, and how many instances you are running

```elixir
config :node_ssr,
   script_path: "#{File.cwd!()}/assets/ssr.js" # REQUIRED - this should do in most cases unless you rename or move the generated ssr.js script
```

Optional requirements:
``` elixir
  component_path: "js/components" # this is the default, relative path from assets.
  component_ext: ".js" # this is the default, to help with nodejs require statements.
  count: 1 # this is the number of node processes to launch - likely not necessary to have more than 1, unless rendering lots of components
```

## Example

### On the Server in a Surface component

Where `props` is a map of JSON serializable values.

```
 <React component="HelloReactSurface" props={{ %{name: "Doug"} }}/>
```

This will result in the following DOM being generated in Elixir.

```html
<div
  id="SHA1:8"
  rs-c="HelloReactSurface"
  rs-p="eyJuYW1lIjogIkRvdWcifQo"
  rs-m="r"
  phx-hook="_RS"
>
  <div id="r <> SHA1:8" phx-update="ignore"></div>
</div>
```

The props are being base64 encoded (no padding) for the DOM attribute
The ids are generated sha1 hashes, based on the component name, and optional rid prop

When server rendering it is similar - but with the rendered component contents as a child of the inner div on initial render, and a different hook

```html
<div
  id="SHA1:8"
  rs-c="HelloReactSurface"
  rs-p="eyJuYW1lIjogIkRvdWcifQo"
  rs-m="h"
  phx-hook="_RS"
>
  <div id="r <> SHA1:8" phx-update="ignore"><!-- REACT ROOT --></div>
</div>
```

## LiveView event handling

LiveView events can be accessed via the `useLiveContext` React hook exported from the javascript package.
This hook returns an object with the functions: `{handleEvent, pushEvent, pushEventTo}`

See the `demo/assets/components/HelloReactSurface.js` component for an example.

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

Add `react-surface` as a dep in your package.json

```json
{
  "react-surface": "file:../deps/react_surface"
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
