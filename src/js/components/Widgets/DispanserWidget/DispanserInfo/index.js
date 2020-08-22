import React, { PureComponent } from "react";
import { Button } from "components/Button";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
// import { Modal } from "components/Modal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { hidePopup, showPopup } from "actions/popup";

@connect(
    (state) => ({
        data: state.widgets.dispanserWidget.state,
    }),
    { showPopup, hidePopup },
)
class DispanserInfo extends PureComponent {
    state = {
        popupIsOpen: false,
    };

    showPopup = () => {
        const { showPopup, hidePopup } = this.props;
        const { events } = this.props.data;

        showPopup(
            "Перечень медицинских услуг, предусмотренных при профилактическом осмотре",
            <Wrapper>
                <ItemsList>
                    {events.map((item, i) => {
                        return <EventItem key={i}>{item.title}</EventItem>;
                    })}
                </ItemsList>
                <ActionsWrapper>
                    <Button label={"Закрыть"} onClick={() => hidePopup()} />
                </ActionsWrapper>
            </Wrapper>,
        );
        this.setState({ popupIsOpen: true });
    };

    render() {
        const { events, nextMessage, links } = this.props.data;

        return (
            <>
                <Info>{nextMessage}</Info>
                {Array.isArray(events) && (
                    <DispanserButton>
                        <Button
                            label={
                                " Перечень медицинских услуг, предусмотренных при профилактическом осмотре"
                            }
                            onClick={() => this.showPopup()}
                        />
                    </DispanserButton>
                )}
                {links &&
                    links.length &&
                    links.map((e) => (
                        <DispanserButton key={`url-${e.url}`}>
                            <Button
                                label={e.title}
                                onClick={() => window.open(e.url, "_blank")}
                            />
                        </DispanserButton>
                    ))}
            </>
        );
    }
}

DispanserInfo.propTypes = {
    data: PropTypes.array,
    showPopup: PropTypes.func,
    hidePopup: PropTypes.func,
};

const Wrapper = styled.div`
    padding: 0 10px 10px;
`;

const Info = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    margin-bottom: 10px;
`;

const DispanserButton = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const ItemsList = styled.ul`
    padding: 0 0 0 10px;
    margin: 0;
`;

const EventItem = styled.li`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    margin-bottom: 10px;
`;

const ActionsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export default DispanserInfo;
