import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header";
import Graph from "../components/Graph";
import { GiElectric } from "react-icons/gi";

var mqtt = require("mqtt");
var options = {
  protocol: "mqtts",

  clientId: "User1",
  username: "smart",
  password: "FzSjl27L9Ac9VVlk",
};
export default function Dashboard({ data }) {
  const [current_val, setcurrent] = useState("");
  let currentref = useRef("");
  currentref.current = current_val;
  useEffect(() => {
    var client = mqtt.connect("mqtt://smart.cloud.shiftr.io", options);
    client.subscribe("Termofijadora01/fase3/corriente");
    var note;
    client.on("message", function (topic, message) {
      note = message.toString();
      setcurrent(note);
      if (currentref.current === "") {
        client.end();
      }
    });
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>IOT EIA</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header></Header>
        <SideMenu></SideMenu>

        <Graph data={data["listado de puntos"]}></Graph>
        <div className={styles.container_widgets}>
          <div className={styles.widget}>
            <div className={styles.title_widget}>Corriente</div>
            <div className={styles.row_widget}>
              <GiElectric
                className="icon_bar"
                style={{ fontSize: "100px" }}
              ></GiElectric>
              <div className={styles.title_widget}>{current_val}</div>
            </div>
          </div>
          <div className={styles.widget}></div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const apiResponse = await fetch(
    "http://192.168.153.144:8000/api/get_dots/1/"
  );
  const data = await apiResponse.json();

  return { props: { data } };
};
