import React, { PureComponent } from "react";
import styled from "styled-components";
import ArrowIcon from "icons/ArrowIcon";
import ContextList from "components/ContextList";
import { fontStyles } from "styledMixins/mixins";
import CloseIcon from "icons/CloseIcon";
import Actions from "containers/Header/Actions";
import PropTypes from "prop-types";

class TimeSelector extends PureComponent {
    static propTypes = {
        value: PropTypes.string.isRequired,
        onDelete: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        time: PropTypes.array.isRequired,
    };

    state = {
        isOpened: false,
    };

    timeActions = [
        {
            icon: <ArrowIcon rotate={-90} opacity={0.5} color={"#fff"} />,
            action: () => this.setState({ isOpened: !this.state.isOpened }),
            tooltip: "Выбрать время",
            inactive: true,
        },
        {
            icon: <CloseIcon opacity={0.5} color={"#fff"} />,
            action: () => this.props.onDelete(),
            tooltip: "Удалить время",
            inactive: true,
        },
    ];

    onChange = (item) => {
        const { onChange } = this.props;
        onChange(item);
        this.setState({ isOpened: !this.state.isOpened });
    };

    render() {
        const { isOpened } = this.state;
        const { value, time } = this.props;

        return (
            <Wrapper>
                <SelectorWrapper>
                    <Time>{value}</Time>
                    <TimeSelect>
                        <Actions items={this.timeActions} />
                    </TimeSelect>
                </SelectorWrapper>
                {time.length ? (
                    <ContextList
                        isOpened={isOpened}
                        items={time}
                        onChange={(item) => {
                            this.onChange(item);
                        }}
                    />
                ) : null}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    position: relative;
`;

const Time = styled.div`
    ${(props) => fontStyles(props, { color: "#fff" })};
    margin-right: 16px;
    margin-left: 16px;
    width: 50px;
`;

const TimeSelect = styled.div`
    line-height: 0;
    display: flex;
    align-items: center;
`;

const SelectorWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 3px;
    background-color: ${(props) => props.theme.userTheme.color};
    border-radius: 4px;
    overflow: hidden;
`;

export default TimeSelector;
