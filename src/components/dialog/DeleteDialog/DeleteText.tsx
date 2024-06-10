import { FC } from "react";

export type DeleteTextProps = {
  id: number | string;
  text: string;
};

const DeleteText: FC<DeleteTextProps> = (props) => {
  const { id, text } = props;

  return (
    <p>
      Bạn có chắc muốn xoá <span className="font-bold">{text}</span> với ID{" "}
      <span className="font-bold">[{id}]</span>
    </p>
  );
};

export default DeleteText;
