import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import CloseIcon from "icons/CloseIcon";
import { plainColorPicker } from "utils/colorPicker";
import { rgba } from "polished";
import { Link } from "react-router-dom";
import { Button } from "components/Button";
import Stroke from "components/Stroke";
import Actions from "containers/Header/Actions";

@withTheme
class StrokeWidget extends PureComponent {
    constructor(props) {
        super(props);

        this.strokeColor = plainColorPicker(props);
    }

    closeIcon = [
        {
            icon: <CloseIcon opacity={0.5} />,
            tooltip: "Закрыть",
            action: () => this.props.onClose(),
        },
    ];

    render() {
        const { widget, title, closable, linkTo } = this.props;

        return (
            <WidgetWrapper>
                <WidgetHeader>
                    <Stroke color={this.strokeColor} />
                    <WidgetTitle>{title}</WidgetTitle>
                    {closable && (
                        <WidgetClose>
                            <Actions items={this.closeIcon} />
                        </WidgetClose>
                    )}
                </WidgetHeader>
                <WidgetContent>{widget}</WidgetContent>
                {linkTo && (
                    <WidgetButton>
                        <Link to={linkTo}>
                            <Button label={"Подробнее"} onClick={() => {}} />
                        </Link>
                    </WidgetButton>
                )}
            </WidgetWrapper>
        );
    }
}

const WidgetWrapper = styled.div`
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    width: 100%;
    margin-bottom: 20px;
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
    padding: ${(props) => props.theme.paddings.normal};
`;

const WidgetContent = styled.div`
    padding: 0 ${(props) => props.theme.paddings.normal}
        ${(props) => props.theme.paddings.normal};
`;

const WidgetTitle = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.big,
            color: props.theme.userTheme.color,
        })};
    flex: 1;
    text-align: right;
`;

const WidgetClose = styled.div`
    line-height: 0;
    cursor: pointer;
    margin-left: 10px;
`;

const WidgetButton = styled.div`
    display: flex;
    justify-content: flex-end;
`;

StrokeWidget.propTypes = {
    title: PropTypes.string.isRequired,
    widget: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
    closable: PropTypes.bool,
    linkTo: PropTypes.string,
};

StrokeWidget.defaultProps = {
    closable: true,
    onClose: () => {},
};

export default StrokeWidget;
