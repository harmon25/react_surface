const http = require("http");
const url = require("url");


const defaultOpts = { componentBase: `js/components`, componentExt: ".js", debug: false, port: 8080 }

function start(
  render,
  opts = defaultOpts
) {

  opts = {...defaultOpts, ...opts}
  http.createServer(requestHandler(render, opts)).listen(opts.port);
}



const contentTypeHeader = { "Content-Type": "application/json" };

function requestHandler(render, opts) {
  const { componentBase, componentExt } = opts;

  return async (req, res) => {
    // all requests need a response, make it.
    var resp;
    // render requests are posts.
    if (req.method === "POST") {
      // parse query params for component name
      const q = url.parse(req.url, true).query;
      try {
        if (q.component) {
          // try
          res.writeHead(200, contentTypeHeader);
          const props = await resolveBody(req);
          const componentPath = q.component.endsWith(componentExt)
            ? `${componentBase}/${q.component}`
            : `${componentBase}/${q.component}${componentExt}`;
          resp = render(componentPath, props);
        } else {
          resp = {
            error: "Must supply component query parameter",
            params: JSON.stringify(q),
          };
        }
      } catch (e) {
        console.error(e);
        res.writeHead(500, contentTypeHeader);
        resp = { error: e.message, params: JSON.stringify(q) };
      }
      // can perform a health check with a get to the /
    } else if (req.method === "GET") {
      res.writeHead(200, contentTypeHeader);
      resp = { message: "OK" };
    }
    let respString = JSON.stringify(resp);
    opts.debug && console.log(`SSR Response(${opts.port}):`, respString);
    res.end(respString); //end the response
  };
}

function resolveBody(req) {
  return new Promise((resolve, reject) => {
    let data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });
    req.on("end", () => {
      resolve(JSON.parse(data));
    });
  });
}

module.exports = start;
