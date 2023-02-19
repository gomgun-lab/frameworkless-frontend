type Component = () => void;

type Route = {
  fragment: string;
  component: Component;
};

type Router = {
  addRoute({ fragment, component }: Route): Router;
  setNotFound(cb: Component): Router;
  start(): void;
  navigate(fragment: string): void;
};

export default () => {
  const routes: Route[] = [];
  let notFound = () => {};

  const checkRoutes = () => {
    const currentRoute = routes.find((route) => {
      return route.fragment === window.location.hash;
    });

    if (!currentRoute) {
      notFound();
      return;
    }

    currentRoute.component();
  };

  const router: Router = {
    addRoute({ fragment, component }) {
      routes.push({ fragment, component });

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
