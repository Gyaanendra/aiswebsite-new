import { redirect } from "next/navigation";

const Page = () => {
  redirect("/home");
  return null;
};

export default Page;
