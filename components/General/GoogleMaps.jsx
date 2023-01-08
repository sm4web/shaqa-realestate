import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import { useFormikContext } from "formik";
import "@reach/combobox/styles.css";

const libraries = ["places"];

const GoogleMaps = ({ form_name, lng, lat, withSearchBar }) => {
  const formikProps = useFormikContext();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBTgKas46Hnbj-hvCCVTU_PrdHxJ0Lyc7Q",
    libraries: libraries,
  });

  const [location, setLocation] = useState({
    lng: lng || 31.2357,
    lat: lat || 30.0444,
  });
  const [address, setAddress] = useState("");

  useEffect(() => {
    formikProps?.setFieldValue(form_name, location);
    formikProps?.setFieldValue("address", address);
  }, [location, address]);

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? (
    <div style={{ width: "100%", height: "100%" }}>
      {withSearchBar && !lat && (
        <>
          <h1 className="text-lg font-bold">Address</h1>
          <PlacesAutoComplete
            setLocation={setLocation}
            setAddress={setAddress}
          />
        </>
      )}
      <GoogleMap
        zoom={15}
        center={location}
        mapContainerClassName={"map-container"}
      >
        <Marker
          draggable
          onDragEnd={(pos) => {
            setLocation({ lat: pos.latLng.lat(), lng: pos.latLng.lng() });
          }}
          position={location}
        />
      </GoogleMap>
    </div>
  ) : (
    "loading"
  );
};

const PlacesAutoComplete = ({ setLocation, setAddress }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setAddress(address);
    setLocation({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        disabled={!ready}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={"mainInput mb-3 w-full"}
        placeholder={"Enter address"}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                style={{ fontSize: "16px" }}
                key={place_id}
                value={description}
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
export default GoogleMaps;
