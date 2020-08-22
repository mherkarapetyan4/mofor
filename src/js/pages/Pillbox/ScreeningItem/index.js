import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconPlate from "components/IconPlate";
import Actions from "containers/Header/Actions";
import AllergicIcon from "icons/incompatibilities/AllergicIcon";
import GenderIcon from "icons/incompatibilities/GenderIcon";
import AgeIcon from "icons/incompatibilities/AgeIcon";
import DoubleIcon from "icons/incompatibilities/DoubleIcon";
import AlcoholIcon from "icons/incompatibilities/AlcoholIcon";
import DrugsIcon from "icons/incompatibilities/DrugsIcon";
import FoodIcon from "icons/incompatibilities/FoodIcon";
import DiseaseIcon from "icons/incompatibilities/DiseaseIcon";
import { fontStyles } from "styledMixins/mixins";
import { rgba } from "polished";
import CloseIcon from "icons/CloseIcon";
import AssignmentIcon from "icons/AssignmentIcon";
import DescriptionIcon from "icons/mydata/DescriptionIcon";
import FormField from "components/FormField";
import Row from "containers/Row";
import Column from "containers/Column";
import { Desktop, Tablet } from "wrappers/responsive";
import MenuIcon from "icons/MenuIcon";
import ContextList from "components/ContextList";
import { LK_MENU_ELEMENTS } from "config/menu";
import { withRouter } from "react-router-dom";
import dayjs from "dayjs";
import { formatDate } from "utils/formatDate";
import { connect } from "react-redux";
import { deletePillboxDrug } from "actions/pillbox";
import { showPopup, hidePopup } from "actions/popup";
import { Button } from "components/Button";
import { getSeverityColor } from "pages/Pillbox/ScreeningItem/utils";
import get from "lodash/get";
import PregnancyIcon from "icons/PregnancyIcon";
import BreastfeedIcon from "icons/BreastfeedIcon";
import Tooltip from "react-tooltip-lite";
import Icon from "pages/Pillbox/ScreeningItem/Icon";
import capitalize from "lodash/capitalize";

const icons = [
    {
        icon: <DrugsIcon opacity={0.5} color={"#000"} />,
        tooltip: "Несовместимость между лекарственными средствами",
        key: "drugDrugInteractions",
    },
    {
        icon: <FoodIcon opacity={0.5} color={"#000"} />,
        tooltip: "Несовместимости с продуктами",
        key: "drugFoodInteractions",
    },
    {
        icon: <AlcoholIcon opacity={0.5} color={"#000"} />,
        tooltip: "Несовместимости с алкоголем",
        key: "drugAlcoholInteractions",
    },
    {
        icon: <AllergicIcon opacity={0.5} color={"#000"} />,
        tooltip: "Аллергические реакции",
        key: "allergicReactions",
    },
    {
        icon: <DiseaseIcon opacity={0.5} color={"#000"} />,
        tooltip: "Противопоказания к заболеваниям",
        key: "diseaseContraindications",
    },
    {
        icon: <GenderIcon opacity={0.5} color={"#000"} />,
        tooltip: "Несовместимости по полу",
        key: "genderContraindications",
    },
    {
        icon: <PregnancyIcon opacity={0.5} color={"#000"} />,
        tooltip: "Беременность",
        key: "pregnancyContraindications",
    },
    {
        icon: <BreastfeedIcon opacity={0.5} color={"#000"} />,
        tooltip: "Кормление грудью",
        key: "lactationContraindications",
    },
    {
        icon: <AgeIcon opacity={0.5} color={"#000"} />,
        tooltip: "Несовместимости по возрасту",
        key: "ageContraindications",
    },
    {
        icon: <DoubleIcon opacity={0.5} color={"#000"} />,
        tooltip: "Дублирующая терапия",
        key: "duplicateTherapies",
    },
];

@withRouter
@connect(
    (state) => ({
        profileId: state.pillbox.currentPillbox.profile.id,
    }),
    {
        deletePillboxDrug,
        showPopup,
        hidePopup,
    },
)
class ScreeningItem extends PureComponent {
    state = {
        incompatibilityName: "",
        contextMenuOpened: false,
    };

    componentDidMount() {
        document.addEventListener("mousedown", this.onClickOutside, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onClickOutside, false);
    }

    onClickOutside = (e) => {
        if (this.list && !this.list.contains(e.target)) {
            const { contextMenuOpened } = this.state;
            if (contextMenuOpened) {
                this.setState({
                    contextMenuOpened: false,
                });
            }
        }
    };

    actions = [
        {
            icon: <DescriptionIcon opacity={0.5} />,
            action: () => {
                this.props.history.push({
                    pathname: `${LK_MENU_ELEMENTS.MEDICINES_PAGE.path}/instruction`,
                    state: { code: this.props.item.drug.code },
                });
            },
            tooltip: "Инструкции",
        },
        {
            icon: <AssignmentIcon opacity={0.5} />,
            action: () => {
                this.props.history.push({
                    pathname: `${LK_MENU_ELEMENTS.MEDICINES_PAGE.path}/course`,
                    state: {
                        drug: this.props.item.drug,
                        id: this.props.item.id,
                    },
                });
            },
            tooltip: "Курс приема",
        },
        {
            icon: <CloseIcon opacity={0.5} />,
            action: () => {
                this.props.showPopup(
                    "Удалить курс приема?",
                    <ActionsWrapper>
                        <Button
                            label={"Отмена"}
                            onClick={this.props.hidePopup}
                        />
                        <Button
                            label={"Удалить"}
                            onClick={() => {
                                this.props.deletePillboxDrug(
                                    this.props.item.id,
                                    this.props.profileId,
                                );
                                this.props.hidePopup();
                            }}
                        />
                    </ActionsWrapper>,
                );
            },
            tooltip: "Удалить",
        },
    ];

    mobileActions = [
        {
            icon: <MenuIcon opacity={0.5} />,
            action: () => {
                this.setState({
                    contextMenuOpened: !this.state.contextMenuOpened,
                });
            },
            // tooltip: "Меню",
        },
    ];

    contextMenuItems = [
        {
            value: "instructions",
            label: "Инструкции",
        },
        {
            value: "course",
            label: "Курс приема",
        },
        {
            value: "delete",
            label: "Удалить",
        },
    ];

    render() {
        const { showIcons, item, screeningElements } = this.props;
        const { displayName } = item.drug;
        const { fromDate } = item;

        const { incompatibilityName, contextMenuOpened } = this.state;

        return (
            <Wrapper>
                <DrugInfo>
                    <DrugWrapper>
                        <Plate>
                            <IconPlate
                                title={<Icon data={item.drug} />}
                                tooltip={
                                    item.drug.form?.name &&
                                    capitalize(item.drug.form?.name)
                                }
                            />
                        </Plate>
                        <Info>
                            {fromDate && (
                                <Date>{formatDate(dayjs(fromDate))}г.</Date>
                            )}
                            <DrugName>{displayName}</DrugName>
                            {showIcons && (
                                <Incompatibilities>
                                    <Title>Несовместимости:</Title>
                                    <IncompatibilitiesList>
                                        {icons.map((item, index) => {
                                            const incompatibility =
                                                screeningElements[item.key];
                                            const disabled = !incompatibility;
                                            // если нужно будет выделить элемент на который кликнули
                                            // const selected = item.key === incompatibilityName;
                                            const importance = disabled
                                                ? -1
                                                : getSeverityColor(
                                                      incompatibility.severity,
                                                  );
                                            return (
                                                <ItemWrapper
                                                    key={`incompatibilities-${item.key}-${index}`}
                                                    importance={importance}
                                                >
                                                    <Tooltip
                                                        content={item.tooltip}
                                                    >
                                                        <IconWrapper
                                                            onClick={() =>
                                                                disabled
                                                                    ? {}
                                                                    : this.setState(
                                                                          {
                                                                              incompatibilityName:
                                                                                  item.key ===
                                                                                  incompatibilityName
                                                                                      ? ""
                                                                                      : item.key,
                                                                          },
                                                                      )
                                                            }
                                                            importance={
                                                                importance
                                                            }
                                                        >
                                                            {item.icon}
                                                        </IconWrapper>
                                                    </Tooltip>
                                                </ItemWrapper>
                                            );
                                        })}
                                    </IncompatibilitiesList>
                                </Incompatibilities>
                            )}
                        </Info>
                    </DrugWrapper>
                    <Desktop>
                        <Actions items={this.actions} />
                    </Desktop>
                    <Tablet>
                        <Actions items={this.mobileActions} />
                        <div ref={(el) => (this.list = el)}>
                            <ContextList
                                isOpened={contextMenuOpened}
                                items={this.contextMenuItems}
                                onChange={(val) => {
                                    this.onItemClick(val);
                                }}
                            />
                        </div>
                    </Tablet>
                </DrugInfo>
                {incompatibilityName && (
                    <DrugIncompatibility visible={true}>
                        {this.renderIncompatibilities(incompatibilityName)}
                    </DrugIncompatibility>
                )}
            </Wrapper>
        );
    }

    onItemClick = (val) => {
        switch (val) {
            case "instructions":
                this.props.history.push({
                    pathname: `${LK_MENU_ELEMENTS.MEDICINES_PAGE.path}/instruction`,
                    state: { code: this.props.item.drug.code },
                });
                break;
            case "course":
                this.props.history.push({
                    pathname: `${LK_MENU_ELEMENTS.MEDICINES_PAGE.path}/course`,
                    state: {
                        drug: this.props.item.drug,
                        id: this.props.item.id,
                    },
                });
                break;
            case "delete":
                this.props.showPopup(
                    "Удалить курс приема?",
                    <ActionsWrapper>
                        <Button
                            label={"Отмена"}
                            onClick={this.props.hidePopup}
                        />
                        <Button
                            label={"Удалить"}
                            onClick={() => {
                                this.props.deletePillboxDrug(
                                    this.props.item.id,
                                    this.props.profileId,
                                );
                                this.props.hidePopup();
                            }}
                        />
                    </ActionsWrapper>,
                );
                break;
            default:
                return null;
        }
    };

    renderIncompatibilities = (incompatibilityName) => {
        const incompatibility = this.props.screeningElements[
            incompatibilityName
        ];
        return (
            <>
                <Item>
                    <ItemText>
                        <SeverityDot
                            importance={getSeverityColor(
                                incompatibility.severity,
                            )}
                        />
                        <Text>{incompatibility.alert}</Text>
                    </ItemText>
                    <ItemSummary>
                        <Row>
                            <Column paddingLeft={0} fraction={2}>
                                <FieldWrapper>
                                    <FormField
                                        label={"Риск:"}
                                        value={get(
                                            incompatibility,
                                            "severity.name",
                                            "Нет данных",
                                        )}
                                        disabled={true}
                                        type={"text"}
                                    />
                                </FieldWrapper>
                            </Column>
                            <Column paddingLeft={0} fraction={2}>
                                <FieldWrapper>
                                    <FormField
                                        label={"Скорость:"}
                                        value={get(
                                            incompatibility,
                                            "onset.name",
                                            "Не данных",
                                        )}
                                        disabled={true}
                                        type={"text"}
                                    />
                                </FieldWrapper>
                            </Column>
                            <Column paddingLeft={0} fraction={2}>
                                <FieldWrapper>
                                    <FormField
                                        label={"Доказанность:"}
                                        value={get(
                                            incompatibility,
                                            "documentation.name",
                                            "Нет данных",
                                        )}
                                        disabled={true}
                                        type={"text"}
                                    />
                                </FieldWrapper>
                            </Column>
                            <Column paddingLeft={0} fraction={6}>
                                <FieldWrapper>
                                    <FormField
                                        label={"Действия:"}
                                        value={get(
                                            incompatibility,
                                            "management.name",
                                            "Не данных",
                                        )}
                                        disabled={true}
                                        type={"text"}
                                    />
                                </FieldWrapper>
                            </Column>
                        </Row>
                    </ItemSummary>
                </Item>
            </>
        );
    };
}

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

const SeverityDot = styled.div`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: ${(props) => calculateColor(props)};
    flex: 0 0 auto;
    margin-right: 10px;
    margin-top: 3px;
`;

const Text = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    flex: 1 1 auto;
`;

const Item = styled.div``;

const ItemText = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 16px;
`;

const ItemSummary = styled.div`
    width: 100%;
    padding: 0 16px;
`;

const FieldWrapper = styled.div`
    padding-bottom: 16px;
`;

const ItemWrapper = styled.div`
    margin-right: 10px;

    &:last-child {
        margin-right: 0;
    }
`;

const DrugWrapper = styled.div`
    display: flex;
    width: 100%;
    flex: 1;
`;

const calculateColor = (props) => {
    switch (props.importance) {
        case 0:
        case -1:
            return rgba(0, 0, 0, 0.3);
        case 1:
            return props.theme.colors.notifications.regular;
        case 2:
            return props.theme.colors.notifications.success;
        case 3:
            return props.theme.colors.notifications.warning;
        case 4:
            return props.theme.colors.notifications.alert;
        case 5:
            return props.theme.colors.notifications.alert;
        default:
            return props.theme.colors.text.colorBlack;
    }
};

const IconWrapper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    transition: background-color ${(props) => props.theme.animations.transition};
    cursor: ${(props) =>
        props.importance === 0 || props.importance === -1
            ? "initial"
            : "pointer"};

    svg {
        height: 30px;
        transition: fill, fill-opacity,
            ${(props) => props.theme.animations.transition};
        fill: ${(props) => calculateColor(props)};
        fill-opacity: 1;
    }

    &:hover {
        background-color: ${(props) =>
            props.importance === 0 || props.importance === -1
                ? "transparent"
                : calculateColor(props)};

        svg {
            fill: ${(props) =>
                props.importance === 0 || props.importance === -1
                    ? rgba(0, 0, 0, 0.3)
                    : "#fff"};
            fill-opacity: 1;
        }
    }
`;

const Title = styled.div`
    ${(props) => fontStyles(props)};
    margin-right: 16px;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
`;

const Plate = styled.div`
    margin-right: 16px;
`;

const Date = styled.div`
    ${(props) => fontStyles(props)};
    margin-bottom: 5px;
`;

const DrugName = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
`;

const Incompatibilities = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const IncompatibilitiesList = styled.div`
    display: flex;
    align-items: center;
    margin-top: 5px;
    flex-wrap: wrap;
`;

const DrugInfo = styled.div`
    display: flex;
    justify-content: space-between;
    padding: ${(props) => props.theme.paddings.normal};
    width: 100%;
`;

const DrugIncompatibility = styled.div`
    width: 100%;
    display: ${(props) => (props.visible ? "block" : "none")};
`;

const Info = styled.div`
    width: 100%;
`;

ScreeningItem.propTypes = {
    item: PropTypes.object.isRequired,
    history: PropTypes.array,
    profileId: PropTypes.number,
    deletePillboxDrug: PropTypes.func,
    showPopup: PropTypes.func,
    hidePopup: PropTypes.func,
    showIcons: PropTypes.bool.isRequired,
    screeningElements: PropTypes.object.isRequired,
};

export default ScreeningItem;
