import React from "react";

const ChildContext = React.createContext(null);

export const ChildProvider = ({ children, value }) => {
	return (
		<ChildContext.Provider value={value}>{children}</ChildContext.Provider>
	);
};

export const useChild = () => {
	const context = React.useContext(ChildContext);
	if (context === null) {
		throw new Error("useTypes must be used within a TypesProvider");
	}
	return context;
};
