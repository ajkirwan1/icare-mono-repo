import React from "react";
// import { json } from "@remix-run/node";
// import { getAllMessages } from "../../../../utils/db/get-all-messages";
import { Outlet } from "react-router";
// import styles from "../../../../styles/pages/messages-home.module.scss";
// import MessagesSidebar from "../../../../components/messages/messages-sidebar-component";

export const handle = { breadcrumb: "Contacts" };

// export async function loader() {

//   const data = await getAllMessages();
//   return json(data);
// }


export default function ContactsLayout() {
  // const { data } = useLoaderData();

  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}
