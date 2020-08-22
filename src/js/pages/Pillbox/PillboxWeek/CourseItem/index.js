import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import IconPlate from "components/IconPlate";
import ListData from "components/List/ListData";
import styled, { withTheme } from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import dayjs from "dayjs";
import get from "lodash/get";
import { INTAKE_CONDITION, RESPONSIVE } from "config/consts";
import {
    DATE_MORNING,
    DATE_DAY,
    DATE_EVENING,
    DATE_NIGHT,
} from "config/consts";
import { Button } from "components/Button";
import { rgba } from "polished";
import Tooltip from "react-tooltip-lite";
import Icon from "pages/Pillbox/ScreeningItem/Icon";
import capitalize from "lodash/capitalize";

@withTheme
class CourseItem extends PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
        changeConfirmDrug: PropTypes.func.isRequired,
        theme: PropTypes.object,
    };

    getDayStep = (data, dayPart) => {
        const time = dayjs(data).format("H");
        return (
            (dayPart === DATE_MORNING && time >= 6 && time < 12) ||
            (dayPart === DATE_DAY && time >= 12 && time < 18) ||
            (dayPart === DATE_EVENING && time >= 18 && time <= 23) ||
            (dayPart === DATE_NIGHT && time >= 0 && time < 6)
        );
    };

    render() {
        const { item, changeConfirmDrug } = this.props;
        let intakeCondition = get(item, "intakeCondition", "");
        if (intakeCondition) {
            intakeCondition = intakeCondition.map(
                (item) => INTAKE_CONDITION[item],
            );
        }

        return (
            <ListItem>
                <ContentWrapper>
                    <Time>{dayjs(item.date).format("HH:mm")}</Time>
                    <ItemInformationWrapper>
                        <PlateWrapper>
                            <IconPlate
                                title={<Icon data={item.drug} />}
                                tooltip={
                                    item.drug.form?.name &&
                                    capitalize(item.drug.form?.name)
                                }
                            />
                        </PlateWrapper>
                        <ItemInformation>
                            <ItemName>
                                {get(item, "drug.displayName", "")}
                            </ItemName>
                            <AdditionalData>
                                <ItemData>
                                    <ListData
                                        label={"Количество:"}
                                        data={
                                            get(item, "dose.size", "") +
                                            " " +
                                            get(
                                                item,
                                                "dose.unit.displayName",
                                                "",
                                            )
                                        }
                                    />
                                </ItemData>
                                <ItemData>
                                    {intakeCondition &&
                                        intakeCondition.length && (
                                            <ListData
                                                label={"Условия приема:"}
                                                data={
                                                    intakeCondition
                                                        ? intakeCondition.join(
                                                              ", ",
                                                          )
                                                        : ""
                                                }
                                            />
                                        )}
                                </ItemData>
                            </AdditionalData>
                        </ItemInformation>
                    </ItemInformationWrapper>
                </ContentWrapper>
                <ActionsWrapper>
                    <NoPrint>
                        {dayjs(item.date)
                            .startOf("day")
                            .toString() ===
                            dayjs()
                                .startOf("day")
                                .toString() && (
                            <Actions>
                                {item.confirmed ? (
                                    <Button
                                        label={"Отменить прием"}
                                        onClick={() =>
                                            changeConfirmDrug(item, false)
                                        }
                                    />
                                ) : (
                                    <Button
                                        label={"Подтвердить прием"}
                                        onClick={() =>
                                            changeConfirmDrug(item, true)
                                        }
                                    />
                                )}
                            </Actions>
                        )}
                    </NoPrint>
                </ActionsWrapper>
                <CourseList>
                    {[DATE_MORNING, DATE_DAY, DATE_EVENING, DATE_NIGHT].map(
                        (el, index) => {
                            return (
                                <Course key={index}>
                                    {this.getDayStep(item.date, el) ? (
                                        <Tooltip
                                            content={this.calculateTooltip(
                                                item,
                                            )}
                                        >
                                            <Dot
                                                active={this.getDayStep(
                                                    item.date,
                                                    el,
                                                )}
                                                color={this.calculateColor(
                                                    item,
                                                )}
                                            />
                                        </Tooltip>
                                    ) : (
                                        <Dot
                                            active={this.getDayStep(
                                                item.date,
                                                el,
                                            )}
                                            color={this.calculateColor(item)}
                                        />
                                    )}
                                </Course>
                            );
                        },
                    )}
                </CourseList>
            </ListItem>
        );
    }

    calculateTooltip = (item) => {
        if (!item.confirmed && dayjs(item.date) < dayjs())
            return "Лекарство не принято";
        if (item.confirmed) return "Лекарство принято";
        return "Лекарство надо принять";
    };

    calculateColor = (item) => {
        const { theme } = this.props;

        if (!item.confirmed && dayjs(item.date) < dayjs())
            return theme.colors.notifications.alert;
        if (item.confirmed) return theme.colors.notifications.success;
        return theme.colors.notifications.regular;
    };
}

const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const ActionsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        justify-content: flex-start;
    }
`;

const NoPrint = styled.div`
    @media print {
        display: none;
    }
`;

const ListItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 0;
    flex-wrap: wrap;
`;

const Time = styled.div`
    ${(props) => fontStyles(props)};
    margin-right: 16px;
    flex: 0 0 auto;
    width: 40px;
`;

const PlateWrapper = styled.div`
    margin-right: 16px;

    @media print {
        display: none;
    }
`;

const ItemInformationWrapper = styled.div`
    display: flex;
    align-items: center;
    flex: 1 1 auto;
`;

const ItemInformation = styled.div`
    display: flex;
    flex-direction: column;
`;

const ItemName = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 5px;
`;

const ItemData = styled.div`
    margin-right: 16px;

    &:last-child {
        margin-right: 0;
    }
`;

const AdditionalData = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Dot = styled.div`
    width: ${(props) => (props.active ? "16px" : "10px")};
    height: ${(props) => (props.active ? "16px" : "10px")};
    background-color: ${(props) =>
        props.active ? props.color : rgba("#000", 0.2)};
    border-radius: 50%;
    overflow: hidden;
`;

const CourseList = styled.div`
    flex: 0 0 auto;
    display: flex;
    align-items: center;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        display: none;
    }

    @media print {
        display: none;
    }
`;

const Course = styled.div`
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Actions = styled.div`
    display: flex;
`;

export default CourseItem;
