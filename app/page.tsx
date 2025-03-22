import Advantages from "./components/Main/Advantages";
import Info from "./components/Main/Info";
import Main from "./components/Main/Main";


export default function Home() {
  return (
    <div className="w-full">
      <Main />
      <Info />
      <Advantages />
    </div>
  );
}
