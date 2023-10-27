const fakeUser = {
  username: "prueba",
  password: "12345",
};

export const authenticate = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === fakeUser.username && password === fakeUser.password) {
        resolve(true);
      } else {
        reject(new Error("Credenciales incorrectas"));
      }
    }, 1000);
  });
};
