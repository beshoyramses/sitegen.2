import { getWebsiteContent } from "@/lib/actions/website.actions";
import { verifiySession } from "@/lib/session";
import { redirect } from "next/navigation";
import WebsiteSettings from "./WebsiteSettings";

const page = async (props: { params: { websiteId: string } }) => {
  const session = await verifiySession();
  if (!session.userId) redirect("/sign-in");

  const { websiteId } = await props.params;
  const website = await getWebsiteContent(websiteId);

  return (
    <>
      <WebsiteSettings website={website}/> 
    </>
  )
}

export default page
