import { FC } from "react";
import { useParams } from "react-router-dom";

import { Button } from "@/components/form";
import { capitalized } from "@/utils/text";

export type DetailPageProps = {
  loading?: boolean;
  body?: JSX.Element;
  handleNavigateBack?: () => void;
  name?: string;
};

const DetailPage: FC<DetailPageProps> = (props) => {
  const { id } = useParams();

  const {
    name = "pageName",
    body = <p>Body</p>,
    handleNavigateBack,
    loading = false,
  } = props;

  const capitalizedName = capitalized(name);

  return (
    <>
      <Button onClick={handleNavigateBack}>Quay lại</Button>
      <p className="inline ml-3 font-bold">
        {capitalizedName} - {id}
      </p>
      <div>
        <div className="w-full h-[1px] my-2 bg-dark/10" />
        {loading ? <p>Loading...</p> : body}
      </div>
    </>
  );
};

export default DetailPage;
