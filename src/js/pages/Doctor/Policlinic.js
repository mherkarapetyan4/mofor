import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import WidgetBlock from "components/WidgetBlock";
import Row from "containers/Row";
import Column from "containers/Column";
import FormField from "components/FormField";
import Map from "components/Map";
import { connect } from "react-redux";
import { formatDate } from "utils/formatDate";

@connect((state) => ({
    address: state.myData.myData.mo?.address || "",
    smoName: state.myData.myData.smo?.name || "",
    moName: state.myData.myData.mo?.name || "",
    actualNumber: state.myData.myData.policy?.actualNumber || "",
    date: state.myData.myData.attachment?.date || "",
}))
class Policlinic extends PureComponent {
    static propTypes = {
        address: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
        smoName: PropTypes.string.isRequired,
        moName: PropTypes.string.isRequired,
        actualNumber: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
    };

    render() {
        const { address, smoName, moName, actualNumber, date } = this.props;
        return (
            <Wrapper>
                <Row>
                    <Column paddings={0} fraction={5}>
                        <WidgetBlock title={"Данные о полисе и поликлинике"}>
                            <Item>
                                <FormField
                                    label={"Номер полиса"}
                                    value={actualNumber}
                                    disabled
                                />
                            </Item>
                            <Item>
                                <FormField
                                    label={"Страховая мед. организация"}
                                    value={smoName}
                                    disabled
                                />
                            </Item>
                            <Item>
                                <FormField
                                    label={"Название поликлиники"}
                                    value={moName}
                                    disabled
                                />
                            </Item>
                            <Item>
                                <FormField
                                    label={"Адрес поликлиники"}
                                    value={address}
                                    disabled
                                />
                            </Item>
                            <Item>
                                <FormField
                                    label={"Прикрепление от"}
                                    value={formatDate(date)}
                                    disabled
                                />
                            </Item>
                        </WidgetBlock>
                    </Column>
                    <Column paddingRight={0} fraction={7} mobilePaddingLeft={0}>
                        <MapWrapper>
                            <Map address={address} />
                        </MapWrapper>
                    </Column>
                </Row>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%;
`;

const MapWrapper = styled.div`
    height: 500px;
    width: 100%;
`;

const Item = styled.div`
    margin-bottom: 16px;

    &:last-child {
        margin-bottom: 0;
    }
`;

export default Policlinic;
