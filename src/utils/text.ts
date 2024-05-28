export const capitalized = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const newRoute = (baseRoute: string) => `${baseRoute}/new`;

export const getSubmitText = (
  createMode: boolean = false,
  resourceText: string,
) => (createMode ? `Tạo ${resourceText}` : `Cập nhật ${resourceText}`);
