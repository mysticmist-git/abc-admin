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
};

const Page: FC<PageProps> = (props) => {
  const { name = "page", route = "/baseUrl", body } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const capitalizeName = capitalized(name);
  const addNewText = `Thêm ${capitalizeName}`;
  const addNewUrl = newRoute(route);

  const navigateToNewRoute = () => {
    dispatch(postTypeDetailCleared());
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
