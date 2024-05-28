import { FC } from "react";
import { useParams } from "react-router-dom";

import { Button } from "@/components/form";
import { capitalized } from "@/utils/text";

export type DetailPageProps = {
  body?: JSX.Element;
  handleNavigateBack?: () => void;
  name?: string;
};

const DetailPage: FC<DetailPageProps> = (props) => {
  const { id } = useParams();

  const { name = "pageName", body = <p>Body</p>, handleNavigateBack } = props;

  const capitalizedName = capitalized(name);

  return (
    <>
      <Button onClick={handleNavigateBack}>Quay lại</Button>
      <p className="inline ml-3 font-bold">
        {capitalizedName} - {id}
      </p>
      <div>
        <div className="w-full h-[1px] my-2 bg-dark/10" />
        {body}
      </div>
    </>
  );
};

export default DetailPage;
