import { FC } from "react";
import WithLabel from "./WithLabel";
import { WithLabelProperty } from "./componentCommonType";
import { UseFormReturn } from "react-hook-form";

type ImageUploadProps = WithLabelProperty & {
  src: string;
  registerValues: ReturnType<UseFormReturn["register"]>;
};

/**
 *
 * @todo Not finished
 */
const ImageUpload: FC<ImageUploadProps> = (props) => {
  const { src = "", registerValues = {} } = props;

  return (
    <WithLabel label="Avatar">
      <img
        src={src}
        className="w-80 border rounded-lg shadow cursor-pointer transition-colors hover:border-neutral-300"
      />
      <input
        {...registerValues}
        type="file"
        accept="image/*"
        className="border p-1 shadow hidden"
      />
    </WithLabel>
  );
};

export default ImageUpload;
