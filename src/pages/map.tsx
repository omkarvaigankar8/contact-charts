import React from "react";
import MarkerClusterGroup from "react-leaflet-cluster";
import { divIcon, LatLngTuple } from "leaflet";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { Spinner } from "@material-tailwind/react";

const customIcon = L.icon({
    iconUrl: require("../assets/Images/mapPin.png"),
    iconSize: [38, 38]
});


const createClusterCustomIcon = function (cluster: any) {
    return divIcon({
        html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
        className: "custom-marker-cluster",
        iconSize: L.point(33, 33, true)
    });
};
export default function Map({ countries, isLoading }: any) {
    const countryData = countries.map((country: any) => {
        return (
            {
                country: country.country,
                deaths: country.deaths,
                recovered: country.recovered,
                active: country.active,
                lat: country.countryInfo.lat,
                long: country.countryInfo.long
            }
        )
    });
    const markers2 = countryData.map((country: any) => {
        return {
            geocode: [country.lat, country.long] as LatLngTuple,
            popup: {
                country: country.country,
                recovered: country.recovered,
                deaths: country.deaths
            }
        }
    });
    return (
        <>
            {isLoading && <div className="container mx-auto flex items-end gap-8 spinner-container">
                <Spinner className="h-12 w-12" />
            </div>}

            {!isLoading && <MapContainer center={[48.8566, 2.3522]} zoom={2}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup
                    chunkedLoading
                    iconCreateFunction={createClusterCustomIcon}
                >
                    {markers2.map((marker: any, index: number) => (
                        <Marker
                            key={index}
                            position={marker.geocode}
                            icon={customIcon}
                        >
                            <Popup>
                                <p>{marker.popup.country}</p>
                                <p>{marker.popup.recovered}</p>
                                <p>{marker.popup.deaths}</p>

                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>}</>
    );
}
