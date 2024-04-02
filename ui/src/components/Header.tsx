import "./Header.css";
// import { signInWithGoogle, signOut } from "../firebase/firebaseConfig";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import { GithubList } from "./GithubList/GithubList";

function Header() {
	// const { user } = useContext(AuthContext);
	const [signOutToggle, setSignOutToggle] = useState("none");

	function signOutDisplay() {
		// if (signOutToggle === "none") {
		// 	setSignOutToggle("flex");
		// } else if (signOutToggle === "flex") {
		// 	setSignOutToggle("none");
		// }
	}

	// const navigate = useNavigate();
	// const handleClick = () => navigate("/favorites");

	return (
		<header className="AppHeader" id="header">
			<GithubList />
			<div className="TitleDiv">
				<div className="logoDiv">
					<a href="/">
						<img className="logo" src={process.env.PUBLIC_URL + "/WTF_Truck_Logo.png"} alt="WTF Truck Logo" />
					</a>
				</div>
				{/* {user && (
					<div className="GoogleUserPhoto">
						<div className="userPhoto" onClick={() => signOutDisplay()}>
							{!!user.photoURL && <img src={user.photoURL} alt="google avatar" id="profilePic" />}
						</div>
						<div className="headerBtn" style={{ display: signOutToggle }}>
							{user && (
								<button className="headerButton" onClick={handleClick}>
									Favorites
								</button>
							)}
						</div>
						<div className="headerBtn" style={{ display: signOutToggle }}>
							{user && (
								<button className="headerButton" id="signOut" onClick={signOut}>
									Sign out
								</button>
							)}
						</div>
					</div>
				)} */}

				<div className="GoogleAuth">
					{/* {!user && (
						<button className="headerButton" onClick={signInWithGoogle}>
							Sign in
						</button>
					)} */}
				</div>
			</div>
		</header>
	);
}

export default Header;
