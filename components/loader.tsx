import { PulseLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <PulseLoader color="#fffff" size={20} />
    </div>
  );
};

export default Loader;
