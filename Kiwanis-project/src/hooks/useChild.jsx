import { useState } from "react";

export const useChild = () => {
	const [lastName, setLastName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [school, setSchool] = useState("");
	const [cat, setCat] = useState("");

	return {
		lastName,
		setLastName,
		firstName,
		setFirstName,
		dateOfBirth,
		setDateOfBirth,
		email,
		setEmail,
		phone,
		setPhone,
		school,
		setSchool,
		cat,
		setCat,
	};
};
