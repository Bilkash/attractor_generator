import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { MainPage } from "./pages";

export const routing = createBrowserRouter([
	{
		path: "/",
		element: <MainPage/>,
	},
]);
