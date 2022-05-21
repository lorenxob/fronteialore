import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header";

export default function Createmachine() {
  const [name_machine, setname_machine] = useState("");
  const [brand_machine, setbrand_machine] = useState("");
  const save_machine = () => {
    fetch("https://c1wkon.deta.dev/api/create_machine/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        machine_name: name_machine,
        marca: brand_machine,
      }),
    }).then((response) => {
      if (response.status === 200) {
        alert("Se Guardo el  con exito");
      } else {
        alert("Error");
      }
    });
  };
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

        <div className={styles.container_form}>
          <div className={styles.row_form}>
            <div className={styles.field_form}>
              <div className={styles.label_field}>Nombre Maquina:</div>
              <input
                id="input-1"
                placeholder="Ingrese el nombre de la maquina"
                type="text"
                className={styles.input_field}
                value={name_machine}
                onChange={(event) => setname_machine(event.target.value)}
              ></input>
            </div>
            <div className={styles.field_form}>
              <div className={styles.label_field}>Marca:</div>
              <input
                id="input-2"
                placeholder="Ingrese la marca de la maquina"
                type="text"
                className={styles.input_field}
                value={brand_machine}
                onChange={(event) => setbrand_machine(event.target.value)}
              ></input>
            </div>
          </div>
          <button className={styles.button_form} onClick={() => save_machine()}>
            GUARDAR
          </button>
        </div>
      </main>
    </div>
  );
}
