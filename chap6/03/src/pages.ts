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

  const detail = (params: { id: string }) => {
    const { id } = params;
    contanier.textContent = `this is detail page with id ${id}`;
  };

  const anotherDetail = (params: { id: string; anotherId: string }) => {
    const { id, anotherId } = params;
    contanier.textContent = `this is detail page with id ${id} and anotherId ${anotherId}`;
  };

  return { home, list, notFound, detail, anotherDetail };
};
