import React, { PureComponent } from "react";
import styled from "styled-components";
import FormField from "components/FormField";
import { Button } from "components/Button";

import { connect } from "react-redux";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { formatDate } from "utils/formatDate";
import PropTypes from "prop-types";
import { BASE_URL } from "config/consts";
import { policyPaths } from "config/paths";
import { fontStyles } from "styledMixins/mixins";

@connect((state) => ({
    data: state.policy.currentItem,
    sendDate: state.policy.currentItem.sendDate,
    finishDate: state.policy.currentItem.finishDate,
    internalStatus: state.policy.currentItem.internalStatus,
    claimId: state.policy.currentItem.id,
}))
class PolisReportInfo extends PureComponent {
    render() {
        const {
            data,
            sendDate,
            finishDate,
            claimId,
            internalStatus,
        } = this.props;

        if (isEmpty(data)) return null;

        const sendDateVal = formatDate(sendDate, false, true) || "-";

        let medicalOrganization = "";
        const isSmo = get(data, "smoOffice");
        const isMfc = get(data, "mfc");
        if (isSmo) {
            medicalOrganization =
                "Пункт выдачи страховой медицинской организации";
        } else if (isMfc) {
            medicalOrganization = "Многофункциональный центр";
        }
        return (
            <Wrapper>
                <Item>
                    <FormField
                        label={"Место получения полиса"}
                        type={"textarea"}
                        value={medicalOrganization}
                        disabled
                    />
                </Item>
                <Item>
                    <FormField
                        label={"Название страховой"}
                        value={get(data, "smo.name", "")}
                        disabled
                    />
                </Item>
                {isMfc && (
                    <Item>
                        <FormField
                            label={"Название МФЦ"}
                            value={get(data, "mfc.name", "")}
                            disabled
                        />
                    </Item>
                )}
                <Item>
                    <FormField
                        label={"Адрес"}
                        type={"textarea"}
                        value={
                            isSmo
                                ? get(data, "smoOffice.address")
                                : get(data, "mfc.address")
                        }
                        disabled
                    />
                </Item>
                {isSmo && (
                    <Item>
                        <FormField
                            label={"Телефон"}
                            value={get(data, "smoOffice.phone", "")}
                            disabled
                        />
                    </Item>
                )}
                <Item>
                    <FormField
                        label={"Время работы"}
                        value={
                            isSmo
                                ? this._renderScheduleListSMO(
                                      get(data, "smoOffice.schedule") || "",
                                  )
                                : this._renderScheduleListMFC(
                                      get(data, "mfc.schedule") || "",
                                  )
                        }
                        disabled
                        type={"element"}
                    />
                </Item>
                <Item>
                    <FormField
                        label={"Дата подачи"}
                        value={sendDateVal}
                        disabled
                    />
                </Item>
                <Item>
                    <FormField
                        label={"Дата завершения"}
                        value={formatDate(finishDate, false, true) || "-"}
                        disabled
                    />
                </Item>
                <Item>
                    <FormField
                        label={"Текущий статус заявления"}
                        type={"textarea"}
                        value={`${sendDateVal} ${get(
                            data,
                            "statusTitle",
                            "Неизвестно",
                        )}`}
                        disabled
                    />
                </Item>
                {internalStatus !== "FINISHED" &&
                    data.tempCertificateAvailable && (
                        <Actions>
                            <ButtonWrapper>
                                <Button
                                    label={"Скачать временное свидетельство"}
                                    onClick={() => {
                                        window.open(
                                            `${BASE_URL}/${policyPaths.GET_TEMP_PDF}?claimId=${claimId}`,
                                            "_blank",
                                        );
                                    }}
                                />
                            </ButtonWrapper>
                            <ButtonWrapper>
                                <Button
                                    label={
                                        "Скачать подпись временного свидетельства"
                                    }
                                    onClick={() => {
                                        window.open(
                                            `${BASE_URL}/${policyPaths.GET_TEMP_SIGN}?claimId=${claimId}`,
                                            "_blank",
                                        );
                                    }}
                                />
                            </ButtonWrapper>
                        </Actions>
                    )}
                {internalStatus !== "FINISHED" &&
                    !data.tempCertificateAvailable && (
                        <Label>
                            Временное свидетельство будет доступно в личном
                            кабинете
                        </Label>
                    )}
            </Wrapper>
        );
    }

    _renderScheduleListSMO = (schedule) => {
        const splitSchedule = schedule.split("\n");
        return (
            <>
                {splitSchedule.map((part, index) => {
                    return <Label key={`smo-shedule-${index}`}>{part}</Label>;
                })}
            </>
        );
    };

    _renderScheduleListMFC = (schedule) => {
        const splitSchedule = schedule.split(/[а-яА-Я: ]{13}/g);
        const combinedSchedule = [];

        for (let i = 0; i < splitSchedule.length; i += 2) {
            combinedSchedule.push(
                splitSchedule[i].replace(/\n/, "") +
                    ": " +
                    splitSchedule[i + 1],
            );
        }

        return (
            <>
                {combinedSchedule.map((part, index) => {
                    return <Label key={`mfc-shedule-${index}`}>{part}</Label>;
                })}
            </>
        );
    };
}

const Label = styled.div`
    ${(props) =>
        fontStyles(props, {
            color: props.theme.colors.text.colorBlack,
        })};
    flex-shrink: 0;
    margin-right: 10px;
`;

const Wrapper = styled.div``;

const Actions = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 16px;
`;

const ButtonWrapper = styled.div`
    margin-right: 16px;

    &:last-child {
        margin-right: 0;
    }
`;

const Item = styled.div`
    margin-bottom: 16px;
`;

PolisReportInfo.propTypes = {
    data: PropTypes.object,
    sendDate: PropTypes.string,
    finishDate: PropTypes.string,
    internalStatus: PropTypes.string,
    claimId: PropTypes.string,
};
export default PolisReportInfo;
