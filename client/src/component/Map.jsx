import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapScreen = (props) => {
    const { mapCoords } = props
    console.log(mapCoords)
    const position = [mapCoords.geometry.location.lat, mapCoords.geometry.location.lng]
    console.log(position)

    return (
        <MapContainer center={position} zoom={16} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {mapCoords.name} <br /> 
            Located at: <br /> 
            {mapCoords.vicinity}
          </Popup>
        </Marker>
      </MapContainer>
    )
}

export default MapScreen