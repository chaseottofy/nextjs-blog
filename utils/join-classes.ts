const joinClasses = (
  styles: { readonly [key: string]: string; },
  classes: string[],
) => {
  return classes.map((className) => styles[className]).join(' ');
};

export default joinClasses;
