export default (contanier: HTMLElement) => {
  const home = () => {
    contanier.textContent = "this is a home page";
  };

  const list = () => {
    contanier.textContent = "this is list page";
  };

  const notFound = () => {
    contanier.textContent = "page not found";
  };

  return { home, list, notFound };
};
