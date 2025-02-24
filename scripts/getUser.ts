import { userHelper } from "./utilts";

const run = async (n = 1) => {
  for (let i = 0; i < n; i++) {
    const user = await userHelper.getUserById(1);
    console.log(user);
  }
};

run()
  .then(() => {
    console.log("done");
  })
  .catch((err) => console.error(err))
  .finally(() => process.exit());
