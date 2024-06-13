import { configureStore } from "@reduxjs/toolkit";

import commonUiReducer from "./commonUiSlice/commonUiSlice";
import usersReducer from "./usersSlice/usersSlice";
import postsReducer from "./postsSlice/postsSlice";
import postTypesReducer from "./postTypesSlice/postTypeSlice";
import departmentsReducer from "./departmentsSlice/departmentsSlice";
import eventTypesReducer from "./eventTypesSlice/eventTypesSlice";
import resourceTypesReducer from "./resourceTypesSlice/resourceTypesSlice";
import resourcesReducer from "./resourcesSlice/resourcesSlice";
import resourceUsingsReducer from "./resourceUsingsSlice/resourceUsingsSlice";
import filesReducer from "./filesSlice/filesSlice";

export default configureStore({
  reducer: {
    common: commonUiReducer,
    users: usersReducer,
    posts: postsReducer,
    postTypes: postTypesReducer,
    departments: departmentsReducer,
    eventTypes: eventTypesReducer,
    resourceTypes: resourceTypesReducer,
    resources: resourcesReducer,
    resourceUsings: resourceUsingsReducer,
    files: filesReducer,
  },
});
