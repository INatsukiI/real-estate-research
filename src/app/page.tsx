"use client";
import { useEffect, useState } from "react";
import { useHelloApi } from "./hooks/useHelloApi";

export default function Home() {
  const [message, setMessage] = useState<string>();
  const { fetchHello } = useHelloApi();

  useEffect(() => {
    fetchHello().then(setMessage);
  }, []);

  if (!message) return <p>Loading...</p>;

  return <p>{message}</p>;
}
