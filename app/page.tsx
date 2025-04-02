import Advantages from "./components/Main/Advantages";
import Info from "./components/Main/Info";
import Main from "./components/Main/Main";
import Reviews from "./components/Reviews/Reviews";


export default function Home() {
  return (
    <div className="w-full">
      <Main />
      <Info />
      <Reviews />
      <Advantages />
    </div>
  );
}
