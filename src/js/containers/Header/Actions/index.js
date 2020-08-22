import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import map from "lodash/map";
import styled from "styled-components";
import Action from "containers/Header/Actions/Action";

class Actions extends PureComponent {
    componentDidMount() {
        const { items, activeActionsItem } = this.props;
        const id =
            activeActionsItem || activeActionsItem === 0
                ? activeActionsItem
                : items.findIndex((e) => e.defaultActive);

        if (id > -1) {
            this.setState({
                id,
            });
        }
    }

    state = {
        id: -1,
    };

    render() {
        const { items } = this.props;
        const { id } = this.state;

        return (
            <ActionsWrapper>
                {map(items, (item, i) => {
                    if (item.hide) return null;
                    return (
                        <Action
                            key={`action_${i}`}
                            onClick={(data) => {
                                this.handleClick(data.id);
                                item.action(data);
                            }}
                            tooltipTitle={item.tooltip}
                            icon={item.icon}
                            important={item.important}
                            id={i}
                            active={!item.inactive && id === i}
                            disabled={item.disabled}
                        />
                    );
                })}
            </ActionsWrapper>
        );
    }

    handleClick = (id) => {
        this.setState({
            id,
        });
    };
}

Actions.propTypes = {
    items: PropTypes.array.isRequired,
    activeActionsItem: PropTypes.number,
};

const ActionsWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
`;

export default Actions;
