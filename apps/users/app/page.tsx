// import { PrismaClient } from "@repo/db/client";
// const client = new PrismaClient();
import {Appbar} from '@repo/ui/appbar'

export default function Home() {
  return (
    <div className="text-2xl">
       <Appbar/>
    </div>
  );
}
