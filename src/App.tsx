import "./App.css";
import { Reflect } from "@rocicorp/reflect/client";
import { mutators } from "../reflect";
import { useSubscribe } from "replicache-react";

const socketOrigin: string | undefined = import.meta.env.VITE_WORKER_URL;
if (socketOrigin === undefined || socketOrigin === "") {
  throw new Error("VITE_WORKER_URL required");
}

const r = new Reflect({
  roomID: "test",
  socketOrigin,
  userID: "test",
  mutators,
});

function App() {
  const count = useSubscribe(
    r,
    async (tx) => {
      return ((await tx.get("count")) as number) ?? 0;
    },
    0,
    [r]
  );

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => r.mutate.increment({ key: "count", delta: 1 })}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
