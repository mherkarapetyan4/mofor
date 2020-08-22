import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button } from "components/Button";
import WidgetBlock from "components/WidgetBlock";
import { FormikFormField } from "wrappers/Formik/FormField";
import FormFieldComponent from "components/FormField";
import StarBar from "components/StarBar";
import styled from "styled-components";
import { rewievFields } from "pages/Services/Item/meta";
import { form } from "wrappers/Formik";
import { connect } from "react-redux";
import { addReview } from "actions/services";
import { sendForm } from "utils/sendForm";

@form({
    fields: rewievFields,
})
@connect()
class Review extends PureComponent {
    static propTypes = {
        serviceItem: PropTypes.object.isRequired,
        tab: PropTypes.string.isRequired,
        item: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    addReview = () => {
        const { dispatch, tab, item } = this.props;
        sendForm(this.props, rewievFields).then((response) => {
            dispatch(addReview({ ...response, id: item.id }, tab));
        });
    };

    render() {
        const { serviceItem } = this.props;

        return (
            <>
                <WidgetWrapper>
                    <WidgetBlock title={"Отзыв"}>
                        <Item>
                            <FormFieldComponent
                                required
                                label={
                                    "Удовлетворены ли Вы качеством оказанной медицинской услуги"
                                }
                                type={"element"}
                                value={
                                    <FormikFormField
                                        name={"satisfaction"}
                                        component={(props) =>
                                            !serviceItem.item?.review?.date ? (
                                                <StarBar
                                                    {...props}
                                                    editable={true}
                                                />
                                            ) : (
                                                <StarBar
                                                    {...props}
                                                    value={
                                                        serviceItem.item.review
                                                            .satisfaction
                                                    }
                                                    editable={false}
                                                />
                                            )
                                        }
                                    />
                                }
                            />
                        </Item>
                        <Item>
                            <FormFieldComponent
                                required
                                label={"Оцените доступность медицинской услуги"}
                                type={"element"}
                                value={
                                    <FormikFormField
                                        name={"availability"}
                                        component={(props) =>
                                            !serviceItem.item?.review?.date ? (
                                                <StarBar
                                                    {...props}
                                                    editable={true}
                                                />
                                            ) : (
                                                <StarBar
                                                    {...props}
                                                    value={
                                                        serviceItem.item.review
                                                            .availability
                                                    }
                                                    editable={false}
                                                />
                                            )
                                        }
                                    />
                                }
                            />
                        </Item>
                    </WidgetBlock>
                </WidgetWrapper>
                {!serviceItem.item?.review?.date && (
                    <Buttons>
                        <Button
                            label={"Оставить отзыв"}
                            onClick={this.addReview}
                        />
                    </Buttons>
                )}
            </>
        );
    }
}

const WidgetWrapper = styled.div`
    margin-bottom: 16px;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 16px;
`;

const Item = styled.div`
    margin-bottom: 16px;

    &:last-child {
        margin-bottom: 0;
    }
`;

export default Review;
