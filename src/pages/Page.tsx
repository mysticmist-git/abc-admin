import { Button } from "@/components/form";
import { postTypeDetailCleared } from "@/redux/postTypesSlice/postTypeSlice";
import { useAppDispatch } from "@/redux/storeUtils";
import { capitalized, newRoute } from "@/utils/text";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export type PageProps = {
  route?: string;
  name?: string;
  body?: JSX.Element;
  onCreateNew?: () => void;
};

const Page: FC<PageProps> = (props) => {
  const { name = "page", route = "/baseUrl", body, onCreateNew } = props;

  const navigate = useNavigate();

  const capitalizeName = capitalized(name);
  const addNewText = `Thêm ${capitalizeName}`;
  const addNewUrl = newRoute(route);

  const navigateToNewRoute = () => {
    if (onCreateNew) {
      onCreateNew();
    }
    navigate(addNewUrl);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-500">
          {capitalizeName}
        </h1>
        <Button onClick={navigateToNewRoute}>{addNewText}</Button>
      </div>
      {body}
    </>
  );
};

export default Page;
