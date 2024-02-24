import React, { createContext } from "react";

export const IsLogContext = createContext();

export const IsLogProvider = ({ children, values }) => {
	return (
		<IsLogContext.Provider value={values}>{children}</IsLogContext.Provider>
	);
};

export const useLogContext = () => {
	const context = React.useContext(IsLogContext);
	if (context === null) {
		throw new Error("must be used within a TypesProvider");
	}
	return context;
};
