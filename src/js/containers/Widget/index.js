import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { darken, rgba } from "polished";
import { Link } from "react-router-dom";
import { Button } from "components/Button";
import IconPlate from "components/IconPlate";
import ArrowIcon from "icons/ArrowIcon";

@withTheme
class Widget extends PureComponent {
    render() {
        const { widget, title, linkTo, opened, onToggle, icon } = this.props;

        return (
            <WidgetWrapper>
                <WidgetHeader
                    onClick={() => (opened ? onToggle("") : onToggle(title))}
                >
                    <PlateWrapper>
                        <IconPlate title={icon} />
                    </PlateWrapper>
                    <WidgetTitle>{title}</WidgetTitle>
                    <WidgetToggle>
                        <ArrowIcon
                            opacity={0.5}
                            rotate={this.props.opened ? 90 : -90}
                        />
                    </WidgetToggle>
                </WidgetHeader>
                <WidgetContent opened={opened}>
                    {widget}
                    {linkTo && (
                        <WidgetButton>
                            <Link to={linkTo}>
                                <Button
                                    label={"Подробнее"}
                                    onClick={() => {}}
                                />
                            </Link>
                        </WidgetButton>
                    )}
                </WidgetContent>
            </WidgetWrapper>
        );
    }
}

const PlateWrapper = styled.div`
    margin-right: 16px;
`;

const WidgetWrapper = styled.div`
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    width: 100%;
    margin-bottom: 10px;
    background-color: ${(props) =>
        rgba(props.theme.colors.background.white, 0.9)};
    transition: border ${(props) => props.theme.animations.transition};

    &:hover {
        border: 1px solid ${(props) => props.theme.colors.borderColorHover};
    }
`;

const WidgetHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    transition: background-color ${(props) => props.theme.animations.transition};

    &:hover {
        background-color: ${(props) =>
            darken(0.05, props.theme.colors.background.white)};
    }
`;

const WidgetContent = styled.div`
    max-height: ${(props) => (props.opened ? "1700px" : 0)};
    overflow: hidden;
    transition: max-height ${(props) => props.theme.animations.transition};
`;

const WidgetTitle = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "news",
            size: props.theme.fonts.sizes.large,
            color: props.theme.userTheme.color,
        })};
    flex: 1;
    text-align: right;
    letter-spacing: 0.5px;
`;

const WidgetToggle = styled.div`
    line-height: 0;
    cursor: pointer;
    margin-left: 10px;
    margin-top: 5px;

    svg {
        transition: transform ${(props) => props.theme.animations.transition};
    }
`;

const WidgetButton = styled.div`
    display: flex;
    justify-content: flex-end;
`;

Widget.propTypes = {
    title: PropTypes.string.isRequired,
    widget: PropTypes.element.isRequired,
    linkTo: PropTypes.string,
    opened: PropTypes.bool,
    onToggle: PropTypes.func,
    icon: PropTypes.element,
};

Widget.defaultProps = {
    closable: true,
};

export default Widget;
