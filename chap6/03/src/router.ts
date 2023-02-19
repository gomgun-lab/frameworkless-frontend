type Component = (param?: any) => void;
type Param = Record<string, string>;

type Route = {
  fragment: string;
  component: Component;
  param?: Param;
  testRegExp?: RegExp;
};

type Router = {
  addRoute({ fragment, component }: Route): Router;
  setNotFound(cb: Component): Router;
  start(): void;
  navigate(fragment: string): void;
};

const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
const URL_FRAGMENT_REGEXP = "([^\\/]+)";

const extractUrlParams = (route: Route, windowHash: string) => {
  // if (!route.param) {
  //   return {};
  // }

  const params: Param = {};

  const matches = windowHash.match(route.testRegExp);

  console.log("m", matches);

  matches.shift();

  matches.forEach((paramValue, index) => {
    const paramName = route.param[index];
    params[paramName] = paramValue;
  });

  return params;
};

export default () => {
  const routes: Route[] = [];
  let notFound = () => {};

  const checkRoutes = () => {
    const { hash } = window.location;

    const currentRoute = routes.find((route) => {
      const { testRegExp } = route;
      return testRegExp.test(hash);
    });

    if (!currentRoute) {
      notFound();
      return;
    }

    const urlParams = extractUrlParams(currentRoute, window.location.hash);

    console.log(urlParams, currentRoute);

    currentRoute.component(urlParams);
  };

  const router: Router = {
    addRoute({ fragment, component }) {
      const params = [];

      const paredFragment = fragment
        .replace(ROUTE_PARAMETER_REGEXP, (_, paramName) => {
          params.push(paramName);
          return URL_FRAGMENT_REGEXP;
        })
        .replace(/\//g, "\\/");

      routes.push({
        testRegExp: new RegExp(`^${paredFragment}`),
        fragment,
        component,
      });

      console.log(routes);

      return router;
    },

    setNotFound(cb) {
      notFound = cb;
      return this;
    },

    start() {
      window.addEventListener("hashchange", checkRoutes);

      if (!window.location.hash) {
        window.location.hash = "#/";
      }

      checkRoutes();
    },

    navigate(fragment) {
      window.location.hash = fragment;
    },
  };

  return router;
};
