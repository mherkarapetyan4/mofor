import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { hide } from "actions/anchorPopup";
import ScrollBar from "components/ScrollBar";
import { fontStyles } from "styledMixins/mixins";
import CloseIcon from "icons/CloseIcon";
import Actions from "containers/Header/Actions";
import { RESPONSIVE } from "config/consts";

const headerHeight = 50;
const iconWidth = 70;
const iconHeight = 40;

@connect(({ anchorPopup }) => ({ anchorPopup }), { hide })
class AnchorPopup extends PureComponent {
    static propTypes = {
        anchorPopup: PropTypes.object.isRequired,
        hide: PropTypes.func.isRequired,
    };

    closeIcon = [
        {
            icon: <CloseIcon opacity={0.5} />,
            action: () => {
                this.props.hide();
            },
        },
    ];

    componentDidMount() {
        document.addEventListener("mousedown", this.onClickOutside, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onClickOutside, false);
    }

    onClickOutside = (e) => {
        if (!this.popup.contains(e.target)) {
            const { anchorPopup } = this.props;
            if (anchorPopup.show) {
                this.props.hide();
            }
        }
    };

    render() {
        const { anchorPopup } = this.props;

        return (
            <PopupWrapper
                size={anchorPopup.size}
                place={anchorPopup.place}
                isOpened={anchorPopup.show}
                position={anchorPopup.position}
                ref={(e) => (this.popup = e)}
            >
                <PopupHeader>
                    {anchorPopup.title && <Title>{anchorPopup.title}</Title>}
                    <Close>
                        <Actions items={this.closeIcon} />
                    </Close>
                </PopupHeader>
                <PopupContent>
                    <ScrollBar>{anchorPopup.data}</ScrollBar>
                </PopupContent>
            </PopupWrapper>
        );
    }
}

function calculatePosition(props, place, position) {
    if (position === "left") {
        switch (place) {
            case "top":
                return;
            case "bottom":
                return props.position.x - props.size.w - iconWidth + "px" || 0;
            case "left":
                return props.position.x - props.size.w - iconWidth + "px" || 0;
            case "right":
                return props.position.x + "px" || 0;
            case "mobile":
                return 10 + "px";
            default:
                return props.position.x + "px" || 0;
        }
    } else if (position === "top") {
        switch (place) {
            case "top":
                return;
            case "bottom":
                return props.position.y + iconHeight + "px" || 0;
            case "left":
                return props.position.y + "px" || 0;
            case "right":
                return;
            case "mobile":
                return headerHeight + 10 + "px";
            default:
                return props.position.y + iconHeight + "px" || 0;
        }
    }

    return 0;
}

function calculateArrowPosition(props, place, position) {
    if (position === "left") {
        switch (place) {
            case "top":
                return;
            case "bottom":
                return props.position.x - props.size.w - iconWidth + "px" || 0;
            case "left":
                return;
            case "right":
                return props.position.x + "px" || 0;
            case "mobile":
                return 10 + "px";
            default:
                return props.position.x + "px" || 0;
        }
    } else if (position === "top") {
        switch (place) {
            case "top":
                return;
            case "bottom":
                return props.position.y + iconHeight + "px" || 0;
            case "left":
                return 10 + "px";
            case "right":
                return;
            case "mobile":
                return headerHeight + 10 + "px";
            default:
                return props.position.y + iconHeight + "px" || 0;
        }
    }

    return 0;
}

const PopupWrapper = styled.div`
    display: ${(props) => (props.isOpened ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    z-index: 1000;
    left: ${(props) => calculatePosition(props, props.place, "left")};
    top: ${(props) => calculatePosition(props, props.place, "top")};
    width: ${(props) => (props.size ? props.size.w + 56 + "px" : "400px")};
    height: ${(props) => (props.size ? props.size.h + 56 + "px" : "500px")};
    background-color: #fff;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    border-radius: 5px;
    box-shadow: ${(props) => props.theme.shadows.blurred};

    &:before {
        content: "";
        display: block;
        position: absolute;
        z-index: 1000;
        width: 0;
        height: 0;
        border-style: solid;
        left: ${(props) =>
            calculateArrowPosition(props, props.place, "left")}; //10px;
        top: ${(props) =>
            calculateArrowPosition(props, props.place, "top")}; //-9px;
        border-width: 0 7.5px 9px 7.5px;
        border-color: transparent transparent #fff transparent;
    }

    &:after {
        content: "";
        display: block;
        position: absolute;
        z-index: 999;
        width: 0;
        height: 0;
        border-style: solid;
        left: ${(props) =>
            calculateArrowPosition(props, props.place, "left")}; //10px;
        top: ${(props) =>
            calculateArrowPosition(props, props.place, "top")}; //-10px;
        border-width: 0 7.5px 9px 7.5px;
        border-color: transparent transparent
            ${(props) => props.theme.colors.borderColor} transparent;
    }

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        left: ${(props) => calculatePosition(props, "mobile", "left")};
        top: ${(props) => calculatePosition(props, "mobile", "top")};
        width: calc(100% - 20px);
    }
`;

const PopupHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 10px 20px;
`;

const PopupContent = styled.div`
    height: 100%;
    padding: 10px 20px 20px 20px;
`;

const Title = styled.div`
    display: inline-block;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: props.theme.fonts.sizes.large,
        })};
    color: ${(props) => props.theme.userTheme.color};
`;

const Close = styled.div`
    cursor: pointer;
`;

export default AnchorPopup;
