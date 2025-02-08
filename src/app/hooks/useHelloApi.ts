import { client } from "@/app/hono-client";

export const useHelloApi = () => {
  const fetchHello = async () => {
    const res = await client.hello.$get();
    const { message } = await res.json();
    return message;
  };

  return { fetchHello };
};
