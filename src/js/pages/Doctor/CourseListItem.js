import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import IconPlate from "components/IconPlate";
import ListData from "components/List/ListData";
import { Button } from "components/Button";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import DoctorIcon from "icons/services/DoctorIcon";
import { Desktop } from "wrappers/responsive";
import { RESPONSIVE } from "config/consts";

class CourseListItem extends PureComponent {
    render() {
        const { item } = this.props;

        return (
            <Wrapper>
                <Desktop>
                    <PlateWrapper>
                        <IconPlate title={<DoctorIcon color={"#fff"} />} />
                    </PlateWrapper>
                </Desktop>
                <InfoWrapper>
                    <DoctorType>{item.specialityName}</DoctorType>
                    <AdditionalInfoWrapper>
                        <Item>
                            <ListData
                                label={"ФИО:"}
                                data={item.doctorFullName}
                            />
                        </Item>
                        <Item>
                            <ListData
                                label={"Поликлиника:"}
                                data={item.moName}
                            />
                        </Item>
                        <Item>
                            <ListData
                                label={"Направление:"}
                                data={item.number}
                            />
                        </Item>
                        <Item>
                            <ListData
                                label={"Дата окончания:"}
                                data={item.toDate}
                            />
                        </Item>
                    </AdditionalInfoWrapper>
                </InfoWrapper>
                <ButtonsWrapper>
                    <Button label={"Записаться"} onClick={() => {}} />
                </ButtonsWrapper>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    padding: 16px;
`;

const Item = styled.div`
    margin-bottom: 8px;
    padding-right: 16px;
    width: 50%;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        width: 100%;
    }
`;

const PlateWrapper = styled.div`
    margin-right: 16px;
    flex: 0 0 auto;
`;

const InfoWrapper = styled.div`
    flex: 1 1 0%;
`;

const DoctorType = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 5px;
`;

const AdditionalInfoWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const ButtonsWrapper = styled.div`
    flex: 0 0 auto;
    display: flex;
    align-items: center;
`;

CourseListItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default CourseListItem;
