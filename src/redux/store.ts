import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./usersSlice/usersSlice";
import postsReducer from "./postsSlice/postsSlice";
import postTypesReducer from "./postTypesSlice/postTypeSlice";
import departmentsReducer from "./departmentsSlice/departmentsSlice";
import eventTypesSlice from "./eventTypesSlice/eventTypesSlice";
import resourceTypesSlice from "./resourceTypesSlice/resourceTypesSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    postTypes: postTypesReducer,
    departments: departmentsReducer,
    eventTypes: eventTypesSlice,
    resourceTypes: resourceTypesSlice,
  },
});
