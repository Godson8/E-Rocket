import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="bg-purple-300 w-screen h-screen flex flex-col space-y-6 items-center justify-center p-10">
      <h2>Login As</h2>
      <div className="space-x-6">
        <Link href="/clientlogin">Client</Link>
        <Link href="/login">Admin</Link>
      </div>
    </div>
  );
}

export default page;
