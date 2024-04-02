import "./FoodTruckList.css";

import { Button, Modal } from "react-bootstrap";
import { animateScroll as scroll } from "react-scroll";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/auth-context";
import { Favorite } from "../model/dbFavModel";
import { FavoriteButton } from "./FavoriteButton";
import { FavoriteContext } from "../context/favorite-context";
import FoodTruckCard from "./FoodTruckCard";
import { Truck } from "../model/dbModel";
import { getTruckData } from "../service/WtfApiService";
import { foodTruckList } from "../model/tests/truckTest";

// commented out for CI/CD until favbutton is working 100%
// import { FavoriteButton } from "./FavoriteButton";

function FoodTruckList() {
	// commented out for CI/CD until favbutton is working 100%
	// const { user } = useContext( AuthContext );

	// const history = useHistory();
	// history.push("/list");

	// const { favorites } = useContext( FavoriteContext );
	// For each truck, search through favorite array to find same id
	// array.some -- looks for certain callback
	const { favorites, removeFavorite } = useContext(FavoriteContext);

	const [foodTrucks, setFoodTrucks] = useState<Truck[]>([]);
	const [foodTrucksLoaded, setFoodTrucksLoaded] = useState(false);
	const [foodTruck, setFoodTruck] = useState<Truck | null>(null);
	// thinking we just use setFoodTrucks to put either favs or list trucks in
	// const [favoriteTrucks, setFavoriteTrucks] = useState<Truck[]>([]);

	useEffect(() => {
		//TODO: ternary for which route user comes from?
		loadTrucks();
		// else
		// loadFavorites();
	}, []);

	function loadTrucks() {
		getTruckData().then((trucksFromApi) => {
			setFoodTrucks(trucksFromApi);
			setFoodTrucksLoaded(true);
		});
	}

	// function loadFavorites() {
	//   getFavorites().then((trucksFromFavorites) => {
	//     //TODO: get type of trucksFromFavs to match trucksFromApi
	//     // probably have to change the model
	//     // trucksFromFav should be type Truck[]
	//     setFoodTrucks(trucksFromFavorites);
	//     setFoodTrucksLoaded(true);
	//   })
	// }

	function timeSinceLastPhoto(truck: Truck) {
		const truckTimestamp: any = truck.lastLocation.timestamp;
		const currentTimestamp = Math.round(new Date().getTime() / 1000);
		let timeDiffSeconds = currentTimestamp - truckTimestamp;
		let hours = timeDiffSeconds / 60 / 60;
		let days = Math.round(hours / 24);
		if (hours > 24) {
			return `${Math.round(days)} days ago`;
		}
		return `${Math.round(hours)} hours ago`;
	}

	// favorites.forEach( fav => fav = foodTrucks.filter( truckId => truckId.iGId === fav.truckId ) );

	const openModal = (truck: Truck): void => setFoodTruck(truck);
	const closeModal = () => setFoodTruck(null);

	return (
		<div className="container">
			<div className="FoodTruckList">
				{!foodTrucksLoaded ? (
					<p id="loading">Loading...</p>
				) : foodTrucks.length === 0 ? (
					<p>No Food Trucks available.</p>
				) : (
					<div className="listContainer" id="list">
						<div className="listDiv">
							<header>
								<h1>Food Trucks</h1>
							</header>
							{foodTruckList
								.sort((a, b) => (a.lastLocation.timestamp < b.lastLocation.timestamp ? 1 : -1))
								.map((truckInList) => (
									<div key={truckInList._id} className="truck">
										{favorites.some((fav) => fav.truckId === truckInList.iGId) && <img className="favIcon" src={process.env.PUBLIC_URL + "/Fav_Icon.png"} />}
										<img src={truckInList.profilePhoto} alt="Food Truck Instagram Profile Image" className="imgInList" />
										<p id="name">{truckInList.name}</p>
										<p id="igHandle">{`@${truckInList.instagramHandle}`}</p>
										<p id="timestamp">{`Last updated ${timeSinceLastPhoto(truckInList)}`}</p>
										<div className="buttons">
											<button className="details" onClick={() => openModal(truckInList)}>
												More Details
											</button>
											<div className="favbtn">
												{/* commented out for CI/CD until favbutton is working 100% */}
												{/* {user && <FavoriteButton truck={truckInList} />} */}
											</div>
										</div>
									</div>
								))}
						</div>
					</div>
				)}
				<Modal show={foodTruck !== null} className="mymodal" overlayClassName="myoverlay" centered>
					{foodTruck !== null && <FoodTruckCard truck={foodTruck} handleClose={closeModal} />}
				</Modal>
			</div>
			<button id="scrollToTop" onClick={() => scroll.scrollToTop()}>
				<i className="material-icons">arrow_upward</i>
			</button>
		</div>
	);
}

export default FoodTruckList;
