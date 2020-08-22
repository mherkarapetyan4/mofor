import React, { PureComponent } from "react";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import { YMAP_API_KEY } from "config/consts";
import PropTypes from "prop-types";
import { Map as YMap, Placemark, YMaps } from "react-yandex-maps";
import { FormikFormField } from "wrappers/Formik/FormField";
import ListData from "components/List/ListData";

class PolisPlaceOfReceiptMap extends PureComponent {
    render() {
        const {
            title,
            children,
            activePlaceCode,
            activePlaceDetails,
            mapCenter,
            activeMoDistrictCode,
            offices,
            onClickPlacemark,
            adressesOptions,
            values,
        } = this.props;
        return (
            <InfoWrapper>
                <Title>{title}</Title>
                {children}
                {activeMoDistrictCode && (
                    <FieldWrapper>
                        <FormikFormField
                            name={
                                values.issuePlace.type === "SMO"
                                    ? "issuePlace.smoOfficeId"
                                    : "issuePlace.mfcId"
                            }
                            component={(props) => (
                                <InlineFormFieldSelect
                                    {...props}
                                    options={adressesOptions}
                                    required
                                    // value={activePlaceCode}
                                    placeholder={"Выберите филиал"}
                                    label={"Филиал:"}
                                />
                            )}
                        />
                    </FieldWrapper>
                )}
                {activePlaceCode && (
                    <PlaceWrapper>
                        <PlaceTitle>Подробная информация:</PlaceTitle>
                        <ListData
                            label={"Адрес:"}
                            data={activePlaceDetails.address}
                        />
                        <ListData
                            label={"Район:"}
                            data={activePlaceDetails.district}
                        />
                        {activePlaceDetails.phone && (
                            <ListData
                                label={"Телефон:"}
                                data={activePlaceDetails.phone}
                            />
                        )}
                        <ListData
                            label={"График работы:"}
                            data={activePlaceDetails.schedule}
                        />
                    </PlaceWrapper>
                )}
                <MapWrapper>
                    <YMaps
                        query={{
                            apikey: YMAP_API_KEY,
                        }}
                    >
                        <YMap
                            width="100%"
                            height="100%"
                            state={{
                                center: mapCenter,
                                zoom: 10,
                            }}
                        >
                            {activeMoDistrictCode
                                ? offices.map((item, index) => {
                                      return (
                                          <Placemark
                                              properties={{ code: item.code }}
                                              key={index}
                                              options={
                                                  item.code === activePlaceCode
                                                      ? {
                                                            iconColor: "red",
                                                            zIndex: 10,
                                                        }
                                                      : {
                                                            iconColor: "blue",
                                                            zIndex: 1,
                                                        }
                                              }
                                              geometry={[
                                                  item.coordinates.latitude,
                                                  item.coordinates.longitude,
                                              ]}
                                              onClick={(e) =>
                                                  onClickPlacemark(e)
                                              }
                                          />
                                      );
                                  })
                                : null}
                        </YMap>
                    </YMaps>
                </MapWrapper>
            </InfoWrapper>
        );
    }
}

const PlaceWrapper = styled.div`
    padding: 16px 0;
`;

const PlaceTitle = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 10px;
`;

const MapWrapper = styled.div`
    height: 400px;
`;

const Title = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 20px;
`;

const InfoWrapper = styled.div``;

const FieldWrapper = styled.div`
    margin-bottom: 10px;
`;

PolisPlaceOfReceiptMap.propTypes = {
    title: PropTypes.string,
    children: PropTypes.object,
    activePlaceCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    activePlaceDetails: PropTypes.object,
    mapCenter: PropTypes.array,
    activeMoDistrictCode: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    offices: PropTypes.array,
    onClickPlacemark: PropTypes.func,
    adressesOptions: PropTypes.array,
    values: PropTypes.object.isRequired,
    // onChangeAddress: PropTypes.func,
};

export default PolisPlaceOfReceiptMap;
