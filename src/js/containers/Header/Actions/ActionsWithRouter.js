import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import map from "lodash/map";
import styled from "styled-components";
import Action from "containers/Header/Actions/Action";
import { withRouter } from "react-router-dom";

@withRouter
class ActionsWithRouter extends PureComponent {
    state = {
        id: -1,
    };

    componentDidMount() {
        const { items, location } = this.props;
        const id = items.findIndex((e) => e.path === location.pathname);
        this.setState({
            id,
        });
    }

    componentDidUpdate(prevProps) {
        const { items, location } = this.props;
        if (prevProps.location.pathname !== location.pathname) {
            const id = items.findIndex((e) => e.path === location.pathname);
            this.setState({
                id,
            });
        }
    }

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
                            staticColor={item.staticColor}
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

ActionsWithRouter.propTypes = {
    items: PropTypes.array.isRequired,
    location: PropTypes.object,
};

const ActionsWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
`;

export default ActionsWithRouter;
