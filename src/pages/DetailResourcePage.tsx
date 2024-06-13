import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastOptions, toast } from "react-toastify";

import {
  ResourceRequestWithFileImagesDTO,
  ResourceRequestWithStringImages,
} from "@/config/dto/request";
import { StatusTypeArray } from "@/config/erd";
import { RouteKey } from "@/config/route";
import {} from "@/redux/postTypesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeUtils";
import { route } from "@/utils/route";
import { capitalized, getStatusTypeText, getSubmitText } from "@/utils/text";

import { CreateMode } from "./common";

import { fetchResourceTypes } from "@/redux/resourceTypesSlice/fetchResourceTypes";
import {
  resourceTypesSelector,
  resourceTypesStatusSelector,
} from "@/redux/resourceTypesSlice/resourceTypesSlice";
import fetchResourceById from "@/redux/resourcesSlice/fetchResourceById";
import {
  resourceDetailInActionSelector,
  resourceDetailSelector,
  resourceDetailStatusSelector,
} from "@/redux/resourcesSlice/resourcesSlice";

import uploadFiles from "@/api/common/uploadFiles";
import { Loading } from "@/components/feedback";
import { Button, Select, TextField, WithLabel } from "@/components/form";
import { commonInActionSelector } from "@/redux/commonUiSlice/commonUiSlice";
import createResource from "@/redux/resourcesSlice/createResource";
import updateResource from "@/redux/resourcesSlice/updateResource";
import clsx from "clsx";
import DetailPage, { DetailPageProps } from "./DetailPage";
import { createAction } from "@reduxjs/toolkit";

type DetailResourcePage = DetailPageProps & CreateMode;

type ImagesUploadProps = {
  files: (File | string)[];
  onChange?: (files: (File | string)[]) => void;
  disabled?: boolean;
};

const ImagesUpload: FC<ImagesUploadProps> = (props) => {
  const { files, onChange, disabled = false } = props;

  const [componentFiles, setComponentFiles] = useState<(File | string)[]>(
    files || []
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    if (!event.target.files) {
      onChange([]);
      return;
    }

    const changedFiles = Array.from(event.target.files);

    setComponentFiles((prev) => {
      const merged = [...prev, ...changedFiles];
      onChange(merged);
      return merged;
    });
  };

  const urls = useMemo(
    () =>
      componentFiles.map((file) =>
        typeof file === "string" ? file : URL.createObjectURL(file)
      ),
    [componentFiles]
  );

  return (
    <>
      <WithLabel label="Hình ảnh">
        <div
          className={clsx(
            "rounded p-2 font-bold bg-neutral-100",
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          )}
        >
          <p>Tải hình ảnh lên</p>
        </div>
        <input
          type="file"
          accept="image/*"
          className="border p-1 shadow hidden"
          onChange={handleChange}
          disabled={disabled}
        />
      </WithLabel>
      {urls && (
        <div className="flex gap-4">
          {urls.map((url, index) => {
            const handleRemove = () => {
              if (!onChange || disabled) return;
              setComponentFiles((prev) => {
                const changedFiles = prev.filter((_, i) => i !== index);
                onChange(changedFiles);
                return changedFiles;
              });
            };

            return (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt="resource image"
                  className="rounded border border-neutral-100 w-40 aspect-square object-cover"
                />
                <div
                  className={clsx(
                    "-top-3 -right-3 absolute rounded-full w-6 aspect-square bg-neutral-400 hover:bg-neutral-600 transition-all ",
                    {
                      "bg-neutral-600": disabled,
                    }
                  )}
                  onClick={handleRemove}
                >
                  <button
                    className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-light disabled:opacity-50"
                    disabled={disabled}
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

const DetailResourcePage: FC<DetailResourcePage> = (props) => {
  const { id } = useParams();
  const { createMode = false, name = "tài nguyên", ...rest } = props;

  const dispatch = useAppDispatch();

  const commonInAction = useAppSelector(commonInActionSelector);
  const detail = useAppSelector(resourceDetailSelector);
  const detailStatus = useAppSelector(resourceDetailStatusSelector);
  const detailInAction = useAppSelector(resourceDetailInActionSelector);

  const inAction = commonInAction || detailInAction;

  const { handleSubmit, register, reset, resetField, control } =
    useForm<ResourceRequestWithFileImagesDTO>({
      defaultValues: detail || {},
    });

  const resourceTypes = useAppSelector(resourceTypesSelector);
  const resourceTypesStatus = useAppSelector(resourceTypesStatusSelector);

  useEffect(() => {
    const isNoNeedToLoad =
      createMode ||
      (detailStatus === "succeeded" && resourceTypesStatus === "succeeded");

    if (isNoNeedToLoad) {
      return;
    }

    // get the stop function
    dispatch(fetchResourceById(id!))
      .unwrap()
      .then((payload) => reset(payload || {}));
  }, [createMode, detailStatus, dispatch, id, reset, resourceTypesStatus]);

  useEffect(() => {
    const execute = async () => {
      if (resourceTypesStatus === "idle") {
        const resourceTypes = await dispatch(fetchResourceTypes()).unwrap();
        const { id } = resourceTypes[0];
        resetField("resourceTypeId", {
          defaultValue: id,
        });
      }
    };
    execute();
  }, [dispatch, resetField, resourceTypesStatus]);

  const navigate = useNavigate();

  const capitalizedName = capitalized(name);
  const submitText = getSubmitText(createMode, capitalizedName);

  const handleNavigateBack = () => navigate(route(RouteKey.ResourcePage));

  const onSubmit: SubmitHandler<ResourceRequestWithFileImagesDTO> = async (
    values
  ) => {
    let isSuccess = false;

    const { images, ...rest } = values;

    const stringImages = images.filter(
      (image) => typeof image === "string"
    ) as string[];
    const fileImages = images.filter(
      (image) => typeof image !== "string" && image instanceof File
    ) as File[];

    let imageUrls: string[] = [];

    try {
      imageUrls =
        fileImages.length > 0
          ? await dispatch(uploadFiles(fileImages)).unwrap()
          : [];
    } catch (error) {
      console.log(error);
      toast("Đăng tải hình ảnh thất bại", {
        type: "error",
      });
      return;
    }

    const updateValues: ResourceRequestWithStringImages = {
      ...rest,
      images: [...stringImages, ...imageUrls],
      isFree: createMode ? true : rest.isFree,
    };

    console.log(updateValues);

    if (createMode) {
      const addedData = await dispatch(createResource(updateValues)).unwrap();
      isSuccess = !!addedData;
      if (addedData) {
        navigate(`/resources/${addedData.id}`);
      }
    } else {
      isSuccess = await !!dispatch(updateResource(updateValues)).unwrap();
    }

    let toastMessage = "";

    if (isSuccess) {
      toastMessage = createMode
        ? `Tạo ${name}  thành công`
        : `Cập nhật ${name} thành công`;
    } else {
      toastMessage = createMode
        ? `Tạo ${name} thất bại`
        : `Cập nhật ${name} thất bại`;
    }
    const toastOptions: ToastOptions = {
      type: isSuccess ? "success" : "error",
    };

    toast(toastMessage, toastOptions);
  };

  const body = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start gap-2"
    >
      <TextField
        {...register("id", {
          required: true,
        })}
        placeholder="Device"
        label="ID"
        disabled={inAction}
      />
      <TextField
        {...register("name", {
          required: true,
        })}
        placeholder="Thiết bị"
        label="Tên tài nguyên"
        disabled={inAction}
      />
      <WithLabel label="Mô tả">
        <textarea
          {...register("description", {
            required: true,
          })}
          placeholder="Mô tả tài nguyên"
          className="border p-1 shadow"
          rows={6}
          defaultValue={detail?.description}
          disabled={inAction}
        />
      </WithLabel>

      <Controller
        control={control}
        name="images"
        defaultValue={[]}
        render={({ field }) => (
          <ImagesUpload
            files={field.value}
            onChange={field.onChange}
            disabled={inAction}
          />
        )}
      />

      <Select
        label="Loại tài nguyên"
        options={resourceTypes.map((resourceType) => resourceType.id)}
        optionLabelConverter={(id) =>
          resourceTypes.find((type) => type.id === id)?.name || "Không tìm thấy"
        }
        {...register("resourceTypeId")}
        disabled={inAction}
      />

      {createMode && (
        <WithLabel label="Khả dụng" horizontal>
          <input
            {...register("isFree")}
            type="checkbox"
            disabled
            defaultChecked
          />
        </WithLabel>
      )}

      <Select
        {...register("status")}
        label="Trạng thái"
        options={StatusTypeArray}
        optionLabelConverter={getStatusTypeText}
        defaultValue={detail?.status}
        disabled={inAction}
      />

      <Button
        type="submit"
        className="disabled:cursor-not-allowed disabled:bg-neutral-400"
        disabled={inAction}
      >
        {inAction ? <Loading /> : submitText}
      </Button>
    </form>
  );

  const detailPageProps = {
    ...rest,
    name,
    body,
    handleNavigateBack,
    loading: detailStatus === "loading" || resourceTypesStatus === "loading",
    disabled: inAction,
  };

  return <DetailPage {...detailPageProps} />;
};

export default DetailResourcePage;
