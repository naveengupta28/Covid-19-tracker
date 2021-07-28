import React from 'react'
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css'
import { showDataOnMap } from './util';


export default function Map({countries,center, casesType, zoom}) {

    console.log(">>>>>>>>>>>>>>MAp>",center)

    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom} scrollWheelZoom={false} >
            <TileLayer
             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             />
             {/* loop through countries and draw circle */}
             {showDataOnMap(countries,casesType)}
            </LeafletMap>

            
        </div>
    )
}


