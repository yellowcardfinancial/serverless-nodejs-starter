export const message = ({ time, ...rest }) => new Promise((resolve, reject) =>
  setTimeout(() => {
    resolve({message: rest.copy});
  }, time * 1000)
);
