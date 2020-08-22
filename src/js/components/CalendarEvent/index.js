import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";

class CalendarEvent extends PureComponent {
    render() {
        const { image, title } = this.props;

        return (
            <Wrapper>
                {image && (
                    <EventImage>
                        <img
                            src={`data:image/gif;base64,${image}`}
                            alt="event_image"
                        />
                    </EventImage>
                )}
                <EventTitle>{title}</EventTitle>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const EventImage = styled.div`
    margin-right: 15px;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
    }
`;

const EventTitle = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
`;

CalendarEvent.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

export default CalendarEvent;
