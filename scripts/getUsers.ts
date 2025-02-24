import { userHelper } from "./utilts";

const run = async () => {
  const users = await userHelper.getUsers();
  console.log(users);
};

run()
  .then(() => {
    console.log("done");
  })
  .catch((err) => console.error(err))
  .finally(() => process.exit());
