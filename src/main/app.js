import { json } from "../presentation/middlewares/json.js";
import { routes } from "./routes.js";
import { extratQueryParams } from "./utils/extract-query-params.js";

export async function application(request, response) {
  const { method, url } = request;

  await json(request, response);

  const route = routes.find(
    (route) => route.method === method && route.path.test(url)
  );

  if (route) {
    const routeParams = request.url.match(route.path);
    const { query, ...params } = routeParams.groups;

    request.params = params;
    request.query = query ? extratQueryParams(query) : {};

    return route.handler(request, response);
  }

  return response.writeHead(404).end();
}
