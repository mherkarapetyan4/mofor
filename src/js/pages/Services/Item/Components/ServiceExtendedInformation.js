import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import { formatDate } from "utils/formatDate";
import { placeHolder } from "config/consts";
import FormField from "components/FormField";
import styled from "styled-components";

class ServiceExtendedInformation extends PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
        person: PropTypes.object,
    };

    render() {
        const { item, person } = this.props;

        return (
            <>
                <Item>
                    <FormField
                        label={"ФИО"}
                        value={get(person, "fullName", placeHolder)}
                        disabled
                    />
                </Item>
                <Item>
                    <FormField
                        label={"Полис ОМС"}
                        value={get(person, "actualNumber", placeHolder)}
                        disabled
                    />
                </Item>
                <Item>
                    <FormField
                        label={"Наименование медицинской услуги"}
                        value={get(item, "service.type.name", placeHolder)}
                        type={"textarea"}
                        disabled
                    />
                </Item>
                <Item>
                    <FormField
                        label={"Медицинская организация"}
                        value={get(item, "serviceMo.name", placeHolder)}
                        disabled
                    />
                </Item>
                <Item>
                    <FormField
                        label={"Стоимость"}
                        value={get(item, "service.cost", placeHolder) + "р."}
                        type={"textarea"}
                        disabled
                    />
                </Item>
                <Item>
                    <FormField
                        label={"Дата"}
                        value={
                            formatDate(get(item, "service.startDate", "")) +
                            "г."
                        }
                        disabled
                    />
                </Item>
                <Item>
                    <FormField
                        label={"Диагноз"}
                        value={get(item, "diagnosis.name", placeHolder)}
                        type={"textarea"}
                        disabled
                    />
                </Item>
                <Item>
                    <FormField
                        label={"Код диагноза"}
                        value={get(item, "diagnosis.code", placeHolder)}
                        disabled
                    />
                </Item>
                <Item>
                    <FormField
                        label={"ФИО врача"}
                        value={get(item, "doctor.fullName", placeHolder)}
                        disabled
                    />
                </Item>
            </>
        );
    }
}

const Item = styled.div`
    margin-bottom: 16px;
`;

export default ServiceExtendedInformation;
