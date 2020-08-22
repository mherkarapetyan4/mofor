import React, { PureComponent } from "react";
import styled from "styled-components";
import WidgetBlock from "components/WidgetBlock";
import TextBlock from "components/TextBlock";
import { Button } from "components/Button";
import { newsPath } from "config/paths";
import axios from "axios";
import { hide } from "actions/anchorPopup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NoData from "components/NoData";
import { fetchActual } from "actions/user";

@connect((state) => ({
    data: state.user.actual,
}))
class ServiceUpdate extends PureComponent {
    state = {
        isFetching: false,
    };
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        data: PropTypes.object,
    };

    async closeSubmit() {
        const { dispatch, data } = this.props;
        dispatch(hide());
        dispatch(fetchActual({}));
        const bodyFormData = new FormData();
        bodyFormData.append("id", data.id);
        await axios.post(newsPath.SUPPRESS, bodyFormData);
    }

    render() {
        const { data } = this.props;

        if (!data.title) {
            return (
                <NoData
                    title={"Нет данных"}
                    message={"Для данного объекта отсутствуют данные"}
                />
            );
        }
        const { text, title } = data;

        return (
            <Wrapper>
                <WidgetBlock title={title}>
                    <TextBlock>{text}</TextBlock>
                </WidgetBlock>
                <ButtonWrapper>
                    <Button
                        label={"Закрыть"}
                        onClick={() => this.closeSubmit()}
                    />
                </ButtonWrapper>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div``;

const ButtonWrapper = styled.div`
    display: inline-block;
`;

export default ServiceUpdate;
