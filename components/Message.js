import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Header.module.css";

import { BsCheckAll } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

export default function Message(props) {
  return (
    <div className={styles.container_message}>
      <BsCheckAll
        className="icon_bar"
        style={{ color: "blue", fontSize: "30px" }}
      ></BsCheckAll>
      <div className={styles.client_test}>{props?.sender}: </div>
      <div className={styles.text_message}> {props?.message}</div>
    </div>
  );
}
