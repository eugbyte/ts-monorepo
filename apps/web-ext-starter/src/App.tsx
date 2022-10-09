import { Banner } from "~/components/banner";
import { Button } from "@eugbyte-monorepo/components";

function App() {
  console.log("in pop up script");
  return (
    <div className="bg-slate-800 flex flex-col justify-center items-center">
      <Banner />
      <Button handleClick={() => alert("button clicked")}>Click me</Button>
    </div>
  );
}

export default App;
