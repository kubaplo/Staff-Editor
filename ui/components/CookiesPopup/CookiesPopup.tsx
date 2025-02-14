import { useState, useEffect } from "react";

export default function CookiePopup() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const cookiesAccepted = localStorage.getItem("cookiesAccepted");
		if (!cookiesAccepted) {
			setIsVisible(true);
		}
	}, []);

	const handleAcceptCookies = (type: "necessary" | "all") => {
		localStorage.setItem("cookiesAccepted", type);
		setIsVisible(false);
	};

	if (!isVisible) return null;

	return (
		<div className="fixed top-0 left-0 inset-0 z-50 flex items-center justify-center">
			{/* Tło półprzezroczyste */}
			<div aria-label="background blur" className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

			{/* Popup */}
			<div className="relative w-96 bg-[#F2F9F1] shadow-lg rounded-md overflow-hidden">
				{/* Pasek górny */}
				<div className="h-12 bg-[#5C715E] flex items-center justify-center text-white font-bold text-lg shadow-header">
					This website uses cookies
				</div>

				{/* Treść */}
				<div className="p-5 text-center text-dark text-sm">
					<p>This site may use cookies for analytical purposes.</p>
					<p>By continuing to use the site, you agree to their use.</p>
				</div>

				{/* Pasek dolny z przyciskami */}
				<div className="h-12 bg-[#5C715E] flex justify-between items-center px-5 shadow-header">
					<button
						onClick={() => handleAcceptCookies("necessary")}
						className="bg-black text-white font-medium py-1 px-3 rounded hover:bg-gray-800"
					>
						Accept necessary
					</button>
					<button
						onClick={() => handleAcceptCookies("all")}
						className="bg-black text-white font-medium py-1 px-3 rounded hover:bg-gray-800"
					>
						Accept all
					</button>
				</div>
			</div>
		</div>
	);
}
