import { ComponentCreator, State, Registry } from "./type";

const DATA_COMPONENT = "[data-component]";

const registry: Registry = {};

/**
 * @param function that create new component
 * @feature_01 reads the values of the data-component attribute
 * @feature_02 automatically invokes the right function
 */

const renderWrapper = (component: ComponentCreator) => {
  return (targetElement: HTMLElement, state: State) => {
    const element = component(targetElement, state) as HTMLElement;

    const childComponents = element.querySelectorAll(DATA_COMPONENT);

    Array.from(childComponents).forEach((target: HTMLElement) => {
      const name = target.dataset.component;

      const child = registry[name];

      if (!child) {
        return;
      }

      target.replaceWith(child(target, state));
    });

    return element;
  };
};

const add = (name: string, component: ComponentCreator) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (root: HTMLElement, state: State) => {
  const cloneComponent = (root: HTMLElement) => {
    return root.cloneNode(true) as HTMLElement;
  };

  return renderWrapper(cloneComponent)(root, state);
};

export default {
  add,
  renderRoot,
  registry,
};
