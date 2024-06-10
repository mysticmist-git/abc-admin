import { FC } from "react";
import TD from "./TD";

const LoadingRow: FC = () => {
  return (
    <>
      <tr className="border">
        <TD colSpan={100}>{<p>Loading</p>}</TD>
      </tr>
    </>
  );
};

export default LoadingRow;
