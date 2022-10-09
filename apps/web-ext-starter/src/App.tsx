import { Banner } from "~/components/banner";
import { Button } from "@eugbyte-monorepo/components";

function App() {
  return (
    <div className="bg-slate-800 flex flex-col justify-center items-center">
      <Banner />
      <Button>Click me</Button>
    </div>
  );
}

export default App;
