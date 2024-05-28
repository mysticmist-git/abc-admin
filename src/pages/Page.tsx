import { Button } from "@/components/form";
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

  const capitalizeName = capitalized(name);

  const navigate = useNavigate();
  const addNewText = `Thêm ${capitalizeName}`;
  const addNewUrl = newRoute(route);

  const navigateToNewRoute = () => navigate(addNewUrl);

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
