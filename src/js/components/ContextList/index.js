import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import map from "lodash/map";
import styled from "styled-components";
import { darken } from "polished";
import FloatWrapper from "containers/FloatWrapper";
import { fontStyles } from "styledMixins/mixins";

class ContextList extends PureComponent {
    render() {
        const {
            items,
            position,
            onChange,
            elementLabel,
            elementValue,
            globalPosition,
            yearsPicker,
            currentValue,
            isOpened,
        } = this.props;
        return (
            <FloatWrapper
                globalPosition={globalPosition}
                isOpened={isOpened}
                position={position}
                yearsPicker={yearsPicker}
                items={items}
                currentValue={currentValue}
                el={this.el}
            >
                {map(items, (item, i) => (
                    <ListItem
                        ref={(el) => {
                            this.el = el;
                        }}
                        key={`item-${i}-${item[elementValue]}`}
                        onClick={() => {
                            onChange(item[elementValue], item[elementLabel]);
                        }}
                    >
                        {item[elementLabel]}
                    </ListItem>
                ))}
            </FloatWrapper>
        );
    }
}

ContextList.propTypes = {
    onChange: PropTypes.func,
    isOpened: PropTypes.bool.isRequired,
    elementLabel: PropTypes.string,
    elementValue: PropTypes.string,
    items: PropTypes.array.isRequired,
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),
    globalPosition: PropTypes.string,
    yearsPicker: PropTypes.bool,
    currentValue: PropTypes.any,
};

ContextList.defaultProps = {
    onChange: () => {},
    elementValue: "value",
    elementLabel: "label",
};

const ListItem = styled.div`
    ${(props) =>
        fontStyles(props, {
            size: props.theme.fonts.sizes.normal,
            color: props.theme.colors.text.colorBlack,
        })};
    background-color: ${(props) => props.theme.colors.background.white};
    border-radius: 2px;
    cursor: pointer;
    transition: background-color ${(props) => props.theme.animations.transition};
    padding: 10px;

    &:hover {
        background-color: ${(props) =>
            darken(0.05, props.theme.colors.background.white)};
    }
`;

export default ContextList;
