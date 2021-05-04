import { Button } from "@chakra-ui/button";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const { query } = useRouter()
  function handlerSubmit() {
   
  }
return (<>
  <Head>
    <title>Dashboard | {query.slug}</title>
  </Head>
  <Link as="/dashboard/next" href="/dashboard/[...slug]">
    <a>next</a>
  </Link>
  <Button onClick={handlerSubmit}>SET</Button>
  </>
)
}