import { Banner } from "~/components/banner";
import { Button } from "@eugbyte-monorepo/components";

function App() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Banner />
      <br />
      <Button>Click me</Button>
    </div>
  );
}

export default App;
