import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { RouteKey } from "@/config/route";
import { route } from "@/utils/route";

import DetailPage, { DetailPageProps } from "./DetailPage";
import { CreateMode } from "./common";

type DetailEventTypePageProps = DetailPageProps & CreateMode;

const DetailEventTypePage: FC<DetailEventTypePageProps> = (props) => {
  // const { id } = useParams();
  const navigate = useNavigate();

  // const {
  //   handleSubmit,
  //   register,
  //   control,
  //   formState: { errors },
  // } = useForm<EventTypeRequestDTO>();

  const { createMode = false, name = "loại sự kiện", ...rest } = props;

  // const capitalizedName = capitalized(name);

  // const submitText = getSubmitText(createMode, capitalizedName);

  const handleNavigateBack = () => navigate(route(RouteKey.UserPage));

  // const onSubmit: SubmitHandler<EventTypeRequestDTO> = (user) => {
  //   console.log(user);
  // };

  const body = (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start gap-2"
    ></form>
  );

  const detailPageProps: DetailPageProps = {
    ...rest,
    name,
    body,
    handleNavigateBack,
  };

  return <DetailPage {...detailPageProps} />;
};

export default DetailEventTypePage;
