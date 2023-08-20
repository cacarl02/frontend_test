"use client";
import Image from "next/image";
import styles from "./page.module.css";

import Gallery from "./gallery";
import { useEffect, useState } from "react";

import { User } from "./types/user";

export default function Home() {
  // data from https://jsonplaceholder.typicode.com/users

  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(res => setUsers(res))
      .catch(error => console.error("Error fetching users:", error));
  }, []);
  return (
    <main className={styles.main}>
      <Gallery users={users} />
    </main>
  );
}
