import React, { PureComponent } from "react";
import Row from "containers/Row";
import Column from "containers/Column";
import FlatPopup from "components/FlatPopup";
import WidgetBlock from "components/WidgetBlock";
import InlineFormField from "components/InlineFormField";
import styled from "styled-components";
import InlineFormFieldTextarea from "components/InlineFormFieldTextarea";
import { Button } from "components/Button";
import { form } from "wrappers/Formik";
import { newsFields } from "./meta";
import { withRouter } from "react-router-dom";
import { FormikFormField } from "wrappers/Formik/FormField";
import { sendForm } from "utils/sendForm";
import { createOrUpdateNews } from "actions/admin";
import PropTypes from "prop-types";
import { connect } from "react-redux";

@withRouter
@form({
    fields: newsFields,
})
@connect()
class NewUpdate extends PureComponent {
    MIN_DAY = 1;
    MAX_DAY = 28;
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        changeInitialValues: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
    };

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.item) {
            const { item } = this.props.location.state;
            const initial = {
                id: item.id,
                title: item.title,
                text: item.text,
                publicationDays: +item.publicationDays,
            };
            this.props.changeInitialValues(initial);
        }
    }

    onSubmit = () => {
        sendForm(this.props, newsFields).then((response) => {
            if (
                this.MIN_DAY <= response.publicationDays &&
                this.MAX_DAY >= response.publicationDays
            ) {
                const { dispatch } = this.props;
                dispatch(createOrUpdateNews(response));
            }
            return false;
        });
    };

    render() {
        return (
            <FlatPopup
                title={
                    this.props.location.state && this.props.location.state.item
                        ? "Редактирование обновления системы"
                        : "Новое обновление системы"
                }
            >
                <Row fullHeight>
                    <Column>
                        <WidgetBlock title={"Информация об обновлении системы"}>
                            <Wrapper>
                                <Row>
                                    <FormikFormField
                                        name={"title"}
                                        component={(props) => (
                                            <InlineFormField
                                                {...props}
                                                label={"Название обновления:"}
                                                placeholder={
                                                    "Название обновления"
                                                }
                                                required
                                            />
                                        )}
                                    />
                                </Row>
                                <Row>
                                    <FormikFormField
                                        name={"text"}
                                        component={(props) => (
                                            <InlineFormFieldTextarea
                                                label={"Описание обновления:"}
                                                {...props}
                                                placeholder={
                                                    "Напишите подробное описание обновления"
                                                }
                                                required
                                                maxLength={4000}
                                            />
                                        )}
                                    />
                                </Row>
                                <Row>
                                    <FormikFormField
                                        name={"publicationDays"}
                                        component={(props) => (
                                            <InlineFormField
                                                type={"number"}
                                                min={this.MAX_DAY}
                                                max={this.MAX_DAY}
                                                label={
                                                    "Кол-во дней активности:"
                                                }
                                                {...props}
                                                placeholder={"Количество дней"}
                                                required
                                            />
                                        )}
                                    />
                                </Row>
                                <Button
                                    label={"Сохранить как черновик"}
                                    onClick={this.onSubmit}
                                />
                            </Wrapper>
                        </WidgetBlock>
                    </Column>
                </Row>
            </FlatPopup>
        );
    }
}

const Wrapper = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export default NewUpdate;
