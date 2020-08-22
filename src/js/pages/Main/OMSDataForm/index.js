import React, { PureComponent } from "react";
import styled from "styled-components";
import FormField from "components/FormField";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import get from "lodash/get";
import { formatDate } from "utils/formatDate";
import { fontStyles } from "styledMixins/mixins";

@connect((state) => ({
    smo: state.myData.myData.smo,
    entitledPolicy: state.myData.myData.entitledPolicy,
    policy: state.myData.myData.policy,
}))
class OMSDataForm extends PureComponent {
    static propTypes = {
        smo: PropTypes.object,
        entitledPolicy: PropTypes.object,
        policy: PropTypes.object,
    };

    static defaultProps = {
        entitledPolicy: {},
        smo: {},
        policy: {},
    };
    render() {
        const { smo, entitledPolicy, policy } = this.props;
        return (
            <FormWrapper>
                <Item>
                    <FormField
                        disabled
                        label={"Название СМО"}
                        value={get(smo, "name") || "Нет данных"}
                    />
                </Item>
                <Item>
                    <FormField
                        disabled
                        label={"Территория страхования"}
                        value={get(policy, "territory") || "Нет данных"}
                    />
                </Item>
                <Item>
                    <FormField
                        disabled
                        label={"Серия и номер полиса ОМС"}
                        value={
                            get(entitledPolicy, "unmaskedActualNumber") ||
                            "Нет данных"
                        }
                    />
                </Item>
                <Item>
                    <FormField
                        disabled
                        label={"Вид полиса"}
                        value={get(entitledPolicy, "typeTitle") || "Нет данных"}
                    />
                </Item>
                <Item>
                    <FormField
                        disabled
                        label={"Дата выдачи полиса ОМС"}
                        value={formatDate(entitledPolicy.startDate)}
                    />
                </Item>
                <Item>
                    <FormField
                        disabled
                        label={"Статус полиса ОМС"}
                        value={"Активен"}
                    />{" "}
                </Item>
                <Item>
                    <FormField
                        disabled
                        label={"Количество застрахованных лиц в СМО"}
                        value={
                            get(smo, "clientsCount", false)
                                ? `${smo.clientsCount} человека`
                                : "Нет данных"
                        }
                    />
                </Item>
                <Item>
                    <SmoLabel>Ссылка на сайт СМО</SmoLabel>
                    <SmoLink>
                        {get(smo, "webSite") ? (
                            <a
                                href={get(smo, "webSite")}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {get(smo, "webSite")}
                            </a>
                        ) : (
                            "Нет данных"
                        )}
                    </SmoLink>
                </Item>
                <Item>
                    <FormField
                        disabled
                        label={"Телефон горячей линии СМО"}
                        value={get(smo, "hotlinePhone") || "Нет данных"}
                    />
                </Item>
            </FormWrapper>
        );
    }
}

const FormWrapper = styled.div`
    padding: 20px 20px 20px 50px;
`;

const Item = styled.div`
    margin-bottom: 16px;
`;

const SmoLabel = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 7px;
`;

const SmoLink = styled.div`
    width: 100%;
    ${(props) =>
        fontStyles(props, {
            color: props.theme.colors.text.colorBlack,
        })};
    padding: 10px 0;
    border-radius: 4px;
`;

export default OMSDataForm;
