import { Button } from "@/components/form";

export type DefaultDialogButtonsProps = {
  deleteText?: string;
  /**
   * This will be use to generate deleteText
   * If deleteText is set, this won't be used
   */
  deleteObjectText?: string;
  onDeleteClick?: () => void;
  onCloseClick?: () => void;
};

const DEFAULT_DELETE_TEXT: string = "Xoá";

const generateDeleteObjectText = (deleteObjectText: string) =>
  `Xoá ${deleteObjectText}`;

const defaultDialogButtons = (props: DefaultDialogButtonsProps) => {
  const {
    deleteText: propDeleteText,
    deleteObjectText,
    onCloseClick,
    onDeleteClick,
  } = props;

  const deleteText =
    propDeleteText ||
    (deleteObjectText
      ? generateDeleteObjectText(deleteObjectText)
      : DEFAULT_DELETE_TEXT);

  return [
    <Button key="danger" color="danger" onClick={onDeleteClick}>
      {deleteText}
    </Button>,
    <Button key="close" color="neutral" onClick={onCloseClick}>
      Đóng
    </Button>,
  ];
};

export default defaultDialogButtons;
