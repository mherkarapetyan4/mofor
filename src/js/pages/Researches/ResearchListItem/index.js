import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import IconPlate from "components/IconPlate";
import styled from "styled-components";
import ListData from "components/List/ListData";
import { fontStyles } from "styledMixins/mixins";
import { RESPONSIVE } from "config/consts";
import { formatDate } from "utils/formatDate";
import LabResearchIcon from "icons/LabResearchIcon";
import { connect } from "react-redux";
import InquiryIcon from "icons/InquiryIcon";
import VaccinationIcon from "icons/VaccinationIcon";
import DischargeIcon from "icons/DischargeIcon";
import InspectionIcon from "icons/InspectionIcon";
import RadiologyIcon from "icons/RadiologyIcon";
import Actions from "containers/Header/Actions";
import DeleteIcon from "icons/DeleteIcon";
import { showPopup, hidePopup } from "actions/popup";
import { Button } from "components/Button";

@connect(
    (state) => ({
        researchesTypes: state.directory.researchesTypes,
    }),
    {
        showPopup,
        hidePopup,
    },
)
class ResearchListItem extends PureComponent {
    actions = [
        {
            icon: (
                <DeleteIconWrapper>
                    <DeleteIcon opacity={0.5} />
                </DeleteIconWrapper>
            ),
            action: () => {
                this.props.showPopup(
                    "Удалить исследование?",
                    <ActionsWrapper>
                        <Button
                            label={"Отмена"}
                            onClick={this.props.hidePopup}
                        />
                        <Button
                            label={"Удалить"}
                            onClick={() =>
                                this.props.onDelete(this.props.data.id)
                            }
                        />
                    </ActionsWrapper>,
                );
            },
            tooltip: "Удалить",
        },
    ];

    render() {
        const { data, onClick } = this.props;

        return (
            <Wrapper key={`item-id-${data.id}`} onClick={() => onClick(data)}>
                <Plate>
                    <IconPlate title={this.renderIcon()} />
                </Plate>
                <Information>
                    <ExecutionDate>
                        {formatDate(data.executionDate)}
                    </ExecutionDate>
                    <Title>{data.title}</Title>
                    <AdditionalInfo>
                        <Type>
                            <ListData
                                label={"Тип документа:"}
                                data={data.kind.title}
                            />
                        </Type>
                        <Date>
                            <ListData
                                label={"Дата загрузки:"}
                                data={formatDate(data.uploadDate, true)}
                            />
                        </Date>
                        <Comment>
                            <ListData
                                label={"Комментарий:"}
                                data={data.comment || "Нет комментария"}
                            />
                        </Comment>
                    </AdditionalInfo>
                </Information>
                <Actions items={this.actions} />
            </Wrapper>
        );
    }

    renderIcon = () => {
        const { data } = this.props;

        switch (data.kind.title) {
            case "Радиологическое":
                return <RadiologyIcon color={"#fff"} />;
            case "Результаты диспансеризации":
                return <InspectionIcon color={"#fff"} />;
            case "Выписка":
                return <DischargeIcon color={"#fff"} />;
            case "Лабораторное":
                return <LabResearchIcon color={"#fff"} />;
            case "Вакцинация":
                return <VaccinationIcon color={"#fff"} />;
            case "Справка":
                return <InquiryIcon color={"#fff"} />;
            default:
                return <LabResearchIcon color={"#fff"} />;
        }
    };
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    width: 100%;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        align-items: flex-start;
    }
`;

const Date = styled.div`
    margin-right: 30px;
    margin-bottom: 5px;
`;

const Type = styled.div`
    margin-right: 30px;
    margin-bottom: 5px;
`;

const Title = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
            size: props.theme.fonts.sizes.normal,
        })};
    margin-bottom: 7px;
`;

const ExecutionDate = styled.div`
    ${(props) => fontStyles(props)};
    margin-bottom: 7px;
`;

const Comment = styled.div`
    margin-bottom: 5px;
    width: 100%;
`;

const Plate = styled.div`
    margin-right: ${(props) => props.theme.paddings.normal};

    @media print {
        display: none;
    }
`;

const Information = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    flex: 1;
`;

const AdditionalInfo = styled.div`
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
`;

const ActionsWrapper = styled.div`
    padding: 0 10px;
    display: flex;

    > div {
        margin-right: 16px;
        :last-child {
            margin-right: 0;
        }
    }
`;

const DeleteIconWrapper = styled.div`
    width: 100%;
    height: 100%;

    @media print {
        display: none;
    }
`;

ResearchListItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    researchesTypes: PropTypes.array,
    showPopup: PropTypes.func,
    hidePopup: PropTypes.func,
    onDelete: PropTypes.func,
};

export default ResearchListItem;
