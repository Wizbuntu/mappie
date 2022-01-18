import { React, useState, } from "react"


// Leaflet
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet"
import 'leaflet/dist/leaflet.css';

// pure modal
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css'

// // commaNumber
// import commaNumber from 'comma-number'

// div icon 
import L from 'leaflet'


// init MapDisplay
function MapDisplay({ metaDataList }) {

  //init markerIcon
  const markerIcon = new L.divIcon({
    className: "title-text",
    iconAnchor: [12, 25],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -10],
    iconSize: [25, 41],
    html: `<div><img src="https://img.icons8.com/fluency/48/000000/place-marker.png"/></div>`
  });


  // init viewPort state
  const [viewport, setViewport] = useState({
    latitude: 7.1881,
    longitude: 21.0936,
    zoom: 2.6,
    width: '100vw',
    height: '100vh',
    scrollWheelZoom: false
  })


  // modal state
  const [modal, setModal] = useState(false);

  // init selectedMetaData state 
  const [selectedMetaData, setSelectedMetaData] = useState({})

  // init openModal function
  const openModal = (data) => {

    console.log(data)

    // update selectedData state 
    setSelectedMetaData(data)

    // open Modal
    setModal(true)

  }


  return (
    <div>

      <MapContainer
        center={[viewport.latitude, viewport.longitude]}
        zoom={viewport.zoom}
        scrollWheelZoom={viewport.scrollWheelZoom}

      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {[...metaDataList].length > 0 && [...metaDataList].map((data, index) => {
          return <Marker key={index} position={[data.latitude, data.longitude]} icon={markerIcon}>
            <Tooltip interactive={true} direction="top" offset={[10, -10]} opacity={1} permanent className="px-2">
              <h5 className="text-center fw-bold tooltip-text">{data.country}</h5>
              <small className="text-center tooltip-text">{data.categoryName}</small>
              <h6 className="text-center fw-bold tooltip-text">{data._metaTotal}</h6>
              <div className="text-center">
                <a className="text-center fw-bold tooltip-text" style={{ cursor: "pointer" }} onClick={() => openModal(data)}>View</a>
              </div>
            </Tooltip>
          </Marker>
        })}

      </MapContainer>




      {/* modal */}
      <PureModal
        header={selectedMetaData.country}
        footer={
          <div className="text-end">
            <button className="btn btn-secondary" onClick={() => setModal(false)}>Close</button>
          </div>
        }
        width={"100%"}
        isOpen={modal}
        closeButton="X"
        closeButtonPosition="header"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <div className="container px-2">
          <div className="row">
            {selectedMetaData && selectedMetaData._meta && [...selectedMetaData._meta].map((meta, index) => {
              return <div key={index} className="col-12 col-md-4  mt-2">
                <div className="card">
                  <div className="card-body p-3">
                    {Object.entries(meta.data).map((mt, index) => {
                      return <div key={index}>
                        <h6 className="card-subtitle mb-2 text-muted text-truncate fw-bold" style={{ fontSize: 15 }}>{mt[0]}</h6>
                        <p className="card-text text-truncate fw-normal mb-3" style={{fontSize: 15}}>{mt[1]}</p>
                      </div>
                    })}


                  </div>
                </div>
              </div>
            })}



          </div>
        </div>
      </PureModal>;

    </div>
  )
}




// export
export default MapDisplay