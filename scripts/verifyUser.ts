import { userHelper } from "./utilts";

const run = async (n = 1) => {
  for (let i = 0; i < n; i++) {
    const name = `user0`;
    const user = await userHelper.verifyUser({
      email: `${name}@email.com`,
      password: name,
    });
    console.log(user);
  }
};

run()
  .then(() => {
    console.log("done");
  })
  .catch((err) => console.error(err))
  .finally(() => process.exit());
