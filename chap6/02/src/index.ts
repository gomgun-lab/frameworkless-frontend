import createRouter from "./router";
import createPages from "./pages";

// const $container = document.querySelector("main");
// const pages = createPages($container);
const router = createRouter();

// router
//   .addRoute({ fragment: "#/", component: pages.home })
//   .addRoute({ fragment: "#/list", component: pages.list })
//   .setNotFound(pages.notFound)
//   .start();

const NAV_BTN_SELECTOR = "button[data-navigate]";

document.body.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.matches(NAV_BTN_SELECTOR)) {
    const { navigate } = target.dataset;
    if (navigate) {
      router.navigate(navigate);
    }
  }
});
