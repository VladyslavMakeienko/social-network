import React from "react";
import preloader from "../../../assets/images/preloader.svg";

let Preloader: React.FC = () => {
  return (
    <div>
      <img src={preloader} />
    </div>
  );
};

export default Preloader;
