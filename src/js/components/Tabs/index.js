import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "components/Button";
import { fontStyles } from "styledMixins/mixins";

class Tabs extends PureComponent {
    state = {
        id: 0,
    };

    static propTypes = {
        elements: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                    .isRequired,
                label: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                    PropTypes.element,
                ]).isRequired,
            }),
        ).isRequired,
        tab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onChange: PropTypes.func.isRequired,
        rigid: PropTypes.bool,
    };

    render() {
        const { elements, onChange, tab, rigid } = this.props;
        return (
            <TabsWrapper rigid={rigid}>
                {elements.map((item, index) => {
                    return (
                        <TabContentWrapper key={`tab-${item.value}-${index}`}>
                            <Button
                                onClick={() => onChange(item)}
                                label={item.label}
                                active={item.value === tab}
                            />
                            {item.count !== undefined && (
                                <TabCountWrapper>{item.count}</TabCountWrapper>
                            )}
                        </TabContentWrapper>
                    );
                })}
            </TabsWrapper>
        );
    }
}

const TabContentWrapper = styled.div`
    position: relative;
`;

const TabCountWrapper = styled.div`
    display: flex;
    position: absolute;
    top: -10px;
    right: 0;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.userTheme.color};
    justify-content: center;
    align-content: center;
    align-items: center;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorWhite,
        })};
`;

const TabsWrapper = styled.div`
    display: flex;
    flex-wrap: ${(props) => (props.rigid ? "nowrap" : "wrap")};
    position: relative;
    flex: ${(props) => (props.rigid ? "1 0 auto" : "1 1 auto")};

    > div {
        margin-right: 10px;
    }

    > div:last-child {
        margin-right: 0;
    }
`;

export { Tabs };
