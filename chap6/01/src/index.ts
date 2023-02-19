import createRouter from "./router";
import createPages from "./pages";

const $container = document.querySelector("main");
const pages = createPages($container);
const router = createRouter();

router
  .addRoute({ fragment: "#/", component: pages.home })
  .addRoute({ fragment: "#/list", component: pages.list })
  .setNotFound(pages.notFound)
  .start();
