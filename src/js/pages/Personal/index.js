import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import Accordeon from "components/Accordeon";
import { ValueLabel } from "components/ValueLabel";
import { connect } from "react-redux";
import dayjs from "dayjs";
import get from "lodash/get";

@connect((state) => ({
    myData: state.myData.myData,
}))
class Personal extends PureComponent {
    static propTypes = {
        myData: PropTypes.object,
    };

    render() {
        const { myData } = this.props;
        return (
            <div>
                <Accordeon
                    multiple={false}
                    elements={[
                        {
                            title: "Персональная информация",
                            value: (
                                <Fragment>
                                    <ValueLabel
                                        label={"ФИО"}
                                        value={get(
                                            myData,
                                            "person.fullName",
                                            "",
                                        )}
                                    />
                                    <ValueLabel
                                        label={"Дата рождения"}
                                        value={dayjs(
                                            get(myData, "person.birthday"),
                                        ).format("DD.MM.YYYY")}
                                    />
                                    <ValueLabel
                                        label={"Пол"}
                                        value={
                                            get(myData, "person.sex") === "MALE"
                                                ? "Мужской"
                                                : get(myData, "person.sex") ===
                                                  "FEMALE"
                                                ? "Женский"
                                                : ""
                                        }
                                    />
                                    <ValueLabel
                                        label={"Тип документа"}
                                        value={get(
                                            myData,
                                            "pbdDocument.typeName",
                                        )}
                                    />
                                    <ValueLabel
                                        label={
                                            "Данные документа, удостоверяющего личность"
                                        }
                                        value={`${get(
                                            myData,
                                            "pbdDocument.series",
                                        )} ${get(
                                            myData,
                                            "pbdDocument.number",
                                        )}`}
                                    />
                                </Fragment>
                            ),
                        },
                        {
                            title: "Данные полиса ОМС",
                            value: (
                                <Fragment>
                                    <ValueLabel
                                        label={"Тип полиса"}
                                        value={get(myData, "policy.typeTitle")}
                                    />
                                    <ValueLabel
                                        label={"Дата выдачи"}
                                        value={dayjs(
                                            get(myData, "policy.startDate"),
                                        ).format("DD.MM.YYYY")}
                                    />
                                    <ValueLabel
                                        label={"Номер полиса"}
                                        value={get(
                                            myData,
                                            "policy.actualNumber",
                                        )}
                                    />
                                </Fragment>
                            ),
                        },
                        {
                            title: "МО прикрепления общий",
                            value: (
                                <Fragment>
                                    <ValueLabel
                                        label={"Название"}
                                        value={get(myData, "mo.name")}
                                    />
                                    <ValueLabel
                                        label={"Адрес"}
                                        value={get(myData, "mo.address")}
                                    />
                                    <ValueLabel
                                        label={"Телефон"}
                                        value={get(myData, "mo.phone")}
                                    />
                                </Fragment>
                            ),
                        },
                        {
                            title: "МО прикрепления (стоматология)",
                            value: (
                                <Fragment>
                                    <ValueLabel
                                        label={"Название"}
                                        value={get(myData, "dentalMo.name")}
                                    />
                                    <ValueLabel
                                        label={"Адрес"}
                                        value={get(myData, "dentalMo.address")}
                                    />
                                    <ValueLabel
                                        label={"Телефон"}
                                        value={get(myData, "dentalMo.phone")}
                                    />
                                </Fragment>
                            ),
                        },
                        {
                            title: "Мои контакты",
                            value: (
                                <Fragment>
                                    <ValueLabel
                                        label={"Адрес"}
                                        value={get(
                                            myData,
                                            "entitledContacts.address",
                                        )}
                                    />
                                    <ValueLabel
                                        label={"Телефон"}
                                        value={get(
                                            myData,
                                            "entitledContacts.phone",
                                        )}
                                    />
                                    <ValueLabel
                                        label={"Email"}
                                        value={get(
                                            myData,
                                            "entitledContacts.email",
                                        )}
                                    />
                                </Fragment>
                            ),
                        },
                    ]}
                />
            </div>
        );
    }
}

export default Personal;
