import Link from "next/link";
import React, { FC } from "react";
import { useSnapshot } from "valtio";

import { signOut } from "@/lib/firebase/auth";
import { state } from "@/lib/store/valtio";

const Header: FC = () => {
  const { currentUser } = useSnapshot(state);
  return (
    <header className="border-b border-black bg-white px-5">
      <div className="container mx-auto  flex h-10 items-center gap-20">
        <h2 className="text-lg font-semibold">FCM demo</h2>
        <div className="flex flex-1 justify-between">
          <nav className="space-x-5 text-sm">
            {currentUser ? (
              <>
                <Link className="hover:underline" href="/">
                  Home
                </Link>
                <Link className="hover:underline" href="/form">
                  Form
                </Link>
              </>
            ) : null}
          </nav>

          <div className="space-x-5 text-sm">
            {!currentUser ? (
              <>
                <Link className="hover:underline" href="/auth?type=signin">
                  SignIn
                </Link>
                <Link className="hover:underline" href="/auth?type=signup">
                  SignUp
                </Link>
              </>
            ) : (
              <button className="hover:underline" onClick={() => signOut()}>
                SignOut
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
