import "./App.css";

import { Route, BrowserRouter as Router } from "react-router-dom";

import { FavoriteContextProvider } from "./context/favorite-context";
import { FavoritesList } from "./components/FavoritesList";
import FoodTruckList from "./components/FoodTruckList";
import Header from "./components/Header";
// import WrappedMap from "./components/MapComponent";
import { Link } from "react-scroll";

function App() {
	return (
		<div className="App">
			<div className="landing">
				{/* <Routes> */}
				<FavoriteContextProvider>
					<Header />
					{/* <Route path="/favorites"> */}
					<FavoritesList />
					{/* </Route> */}
					{/* <Route path="/"> */}
					{/* <div className="map">
                  <WrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`}
                    loadingElement={<div style={{ height: "100%" }} />}
                    containerElement={<div style={{ height: "100%" }} />}
                    mapElement={<div style={{ height: "100%" }} />}
                  />
                  <div className="fade"></div>
                </div> */}
					<div className="listBtnContainer">
						<Link to="list" smooth={true} duration={500} isDynamic={true}>
							<button className="listView">List View</button>
						</Link>
					</div>
					<FoodTruckList />
					{/* </Route> */}
				</FavoriteContextProvider>
				{/* </Routes> */}
			</div>
		</div>
	);
}
export default App;
