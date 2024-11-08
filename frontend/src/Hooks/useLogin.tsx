import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.tsx";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (email:string, password:string) => {
		const success = handleInputErrors(email, password);
		if (!success) return;
		setLoading(true);
		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error:any) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

function handleInputErrors(email:string, password:string) {
	if (!email || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}