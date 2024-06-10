/* eslint-disable @typescript-eslint/no-explicit-any */
export const mapDateToString = (obj: any) => {
  const clone: any = {};

  const keys = Object.keys(obj);

  for (const key of keys) {
    if (obj[key] instanceof Date) {
      clone[key] = obj[key].toISOString();
      continue;
    }

    clone[key] = obj[key];
  }

  return clone;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapStringToDate = (obj: any, keys: string[]) => {
  for (const key of keys) {
    if (obj[key] && typeof obj[key] === "string") {
      obj[key] = new Date(obj[key]);
    }
  }
};
