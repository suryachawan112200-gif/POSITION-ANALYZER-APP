import { auth } from "/lib/firebase";

export default function TestFirebase() {
  return <div>Firebase Auth Initialized: {auth ? "Success" : "Failed"}</div>;
}