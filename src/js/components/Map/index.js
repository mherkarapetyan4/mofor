import React, { PureComponent } from "react";
import styled from "styled-components";
import { YMAP_API_KEY } from "config/consts";
import {
    FullscreenControl,
    GeolocationControl,
    Map as YMap,
    Placemark,
    RulerControl,
    TrafficControl,
    TypeSelector,
    YMaps,
    ZoomControl,
} from "react-yandex-maps";
import PropTypes from "prop-types";
import axios from "axios";
import { geoPath } from "config/paths";

class Map extends PureComponent {
    state = {
        coords: [55.78403, 37.605822],
        zoom: 17,
    };
    getCoordsFromAddress = async () => {
        const { address } = this.props;
        if (!address) return;
        const res = await axios.get(geoPath.GET_COORDINATES, {
            params: { address },
        });

        const coords = [
            res.data.coordinates.latitude,
            res.data.coordinates.longitude,
        ];
        this.setState({
            coords,
        });
    };

    componentDidMount() {
        this.getCoordsFromAddress();
    }

    render() {
        const { coords, zoom } = this.state;

        return (
            <Wrapper>
                <YMaps
                    query={{
                        apikey: YMAP_API_KEY,
                    }}
                >
                    <YMap
                        instanceRef={(ref) => {
                            ref && ref.behaviors.disable("scrollZoom");
                        }}
                        width="100%"
                        height="100%"
                        defaultState={{
                            center: coords,
                            zoom,
                        }}
                    >
                        <Placemark
                            geometry={coords}
                            options={{
                                iconLayout: "default#image",
                                iconImageHref:
                                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAgCAYAAAB+ZAqzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKZSURBVHgBzZg9ctpAFMffSiJtVKhIEwfdIL4BnCDDDUyDx5Mi8QkIN3AqT5wivkGSE0BOgG8ATprMBM9slYZdrd9bI40ArXZXssf8G4RWWn5634LBgenV5aIrALpwSCKo5OufMR1HcCDSlgqD70KIAX0P4ABEUDIMpyyDa36WLukcg2dWDqUAlqvRUT8/7+VKbe4o/IDP8xYUcLYWk3/v0xtoqBJUV0jZL685W+whBsI5HsZbC0qdr07fXICnylC4xyfcY1Jed44x3GS8B0VibBx/W8TgoTKUUmq5C6XB6CKXzXCTE8NS3PnvXne2LIWSWdavui6QYfTOEY6bFlQnegkNoMiFeRbuga2l+CmDYOoAVxnk2hWj17/AFwrUTZULCzAizhib2eAwa4aU0vsr2Tl4QwEXMhvU3aODX0o5UYzFdXD0AJJSmgFl4Ax/5Bojv3d3mv4APyhgmdmFxTX5ge5R6HOGrgkxIP9abnRRFRQ90N3oaGi7tygXIhKf8YOj5bqOMecPhQ9N3nG5vwDjw5RjTdKFsi1cFRSJseCEO3piq8DmVmsDZ4LS1d0heyvBylZrAmeEspQGKxiJrFYuC65wJiiKK1tpcALTVlNyqzbZ4MyW8ourWjDSpjbNwAGuDso3rqxgJKr0sNMfd+HqoKhe+caVE5g2fykRduGwIPeMUFSvOtLaqupUOyjSnBWuwznze53CPiiPecvOUTsoUiKwB5c6Syk55I/QzqwT7OosnW0at10Y7Lam7irnmT+5up3rlxAz1AUGe6u4Kst55t8USV7NhEX0RdY4A6vkDKYHSqUmVVA0t+vC/IjyfuFNrn5P8aNXbLCWx23eLU3y/otAdOQg76U4iX58CqjGSi4XveTL7RieUPehtbDJv9z76gAAAABJRU5ErkJggg==",
                                iconImageSize: [37, 31],
                            }}
                        />
                        <FullscreenControl />
                        <TypeSelector options={{ float: "right" }} />
                        <TrafficControl options={{ float: "right" }} />
                        <GeolocationControl options={{ float: "left" }} />
                        <ZoomControl
                            options={{ float: "right", zoomDuration: 200 }}
                        />
                        <RulerControl options={{ float: "right" }} />
                    </YMap>
                </YMaps>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    overflow: hidden;
    border-radius: 10px;
    height: 100%;
`;

Map.propTypes = {
    address: PropTypes.string,
};

export default Map;
