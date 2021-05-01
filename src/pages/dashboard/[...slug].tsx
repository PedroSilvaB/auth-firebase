import Head from "next/head";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { query } = useRouter()
  return (<Head>
    <title>Dashboard | {query.slug}</title>
  </Head>

  )
}