import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./usersSlice/usersSlice";
import postsReducer from "./postsSlice";
import postTypesReducer from "./postTypeSlice";
import departmentsReducer from "./departmentsSlice/departmentsSlice";
import eventTypesSlice from "./eventTypesSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    postTypes: postTypesReducer,
    departments: departmentsReducer,
    eventTypes: eventTypesSlice,
  },
});
