import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import React from "react";
import toast from "react-hot-toast";

function HomePage() {
  // fetch some data- without using tanstack
  // refetch
  // when you focus on the window- it fetches data immediatly
  // with tanstack, they have some tanstack query
  return (
    <div>
      <button
        className="btn btn-secondary"
        onClick={() => toast.error("This is a error toast")}
      >
        Click me
      </button>
      <SignedOut>
        <SignInButton mode="modal">
          <button>Login</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <UserButton />
    </div>
  );
}

export default HomePage;
