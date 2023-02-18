let template: HTMLTemplateElement;

const createAppElement = () => {
  template = document.querySelector(".todo-app") as HTMLTemplateElement;

  return template.content.firstElementChild.cloneNode(true);
};

const addEvents = (targetElement: HTMLElement, events: any) => {
  targetElement
    .querySelector(".new-todo")
    .addEventListener("keypress", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        events.addItem((e.currentTarget as HTMLInputElement).value);
      }
    });
};

export default (targetElement: HTMLElement, _, events: any) => {
  console.log(events);
  const newApp = targetElement.cloneNode(true) as HTMLElement;
  newApp.innerHTML = "";
  newApp.appendChild(createAppElement());
  addEvents(newApp, events);
  return newApp;
};
