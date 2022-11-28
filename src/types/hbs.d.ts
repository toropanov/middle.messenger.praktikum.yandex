declare module '*.hbs' {
  // const template: {
  //     compiler: [number, string];
  //     useData: true;
  //     main: () => void;
  // };
  declare function template(_props: Props): string;

  export default template(_props: unknown): string;
}


import { Props } from 'src/type_component';

// eslint-disable-next-line no-unused-vars
declare function template(_props: Props): string;

export default template;
