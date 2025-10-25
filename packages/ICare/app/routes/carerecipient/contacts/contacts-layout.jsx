import React from "react";
import { json } from "@remix-run/node";
import { getAllMessages } from "../../../utils/db/get-all-messages";
import { Outlet, useLoaderData } from "react-router";
import styles from "../../../styles/pages/messages-home.module.scss";
import MessagesSidebar from "../../../components/messages/messages-sidebar-component";

// export const handle = { breadcrumb: "Contacts" };

export async function loader() {

  const data = await getAllMessages();
  return json(data);
}


export default function ContactsLayout() {
  const { data } = useLoaderData();

  return (
    <>
      <div className={styles.container}>
        <MessagesSidebar threads={data} />
        <div
          aria-hidden="true"
          style={{
            width: "1px",
            background: "#e6e6e6",
            margin: "0 1.5rem",
            height: "80vh",
            alignSelf: "center"
          }}
        />
        <div className={styles.rightColumnWrapper}>
          <div className={styles.contentArea}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
