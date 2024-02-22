import { useState, useEffect } from "react";

export const useIsLog = () => {
	const [isLogged, setIsLogged] = useState(false);

	return { isLogged, setIsLogged };
};
