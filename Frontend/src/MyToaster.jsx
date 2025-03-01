import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState } from "react";

const MyToaster = () => {
  const [position, setPosition] = useState("top-center");
  const [firstToast, setFirstToast] = useState(true);

  useEffect(() => {
    const updatePosition = () => {
      if (window.innerWidth >= 640) {
        setPosition("top-right"); // PC
      } else {
        setPosition("top-right"); // Mobile
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return (
    <Toaster
      position={position}
      duration={3000}
      reverseOrder={false}
    
      // toastOptions={{
      //   style: {
      //     // marginTop: firstToast && window.innerWidth < 640 ? "50px" : "0px", // Push 1st toast down
      //   },
        // onOpen: () => setFirstToast(false), // Set false after first toast appears
      // }}
    />
  );
};

export default MyToaster;

