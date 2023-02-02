import { faker } from "@faker-js/faker";

import { Todo } from "../type";

const createElement = (): Todo => ({
  text: faker.random.words(2),
  completed: faker.datatype.boolean(),
});

const repeat = <T>(elementFactory: () => T, number: number): T[] => {
  const array = [];
  for (let index = 0; index < number; index++) {
    array.push(elementFactory());
  }
  return array;
};

export default () => {
  const howMany = +faker.random.numeric(1);
  return repeat(createElement, howMany);
};
