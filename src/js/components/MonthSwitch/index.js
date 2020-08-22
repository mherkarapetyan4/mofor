import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FullArrowIcon from "icons/FullArrowIcon";
import { Button } from "components/Button";
import Actions from "containers/Header/Actions";
import { fontStyles } from "styledMixins/mixins";
import { RESPONSIVE } from "config/consts";

class MonthSwitch extends PureComponent {
    render() {
        const {
            data,
            tooltip,
            onChange,
            customTitle,
            width,
            disabledLeft,
            disabledRight,
            hideToday,
        } = this.props;

        const arrowLeft = [
            {
                icon: <FullArrowIcon opacity={0.5} rotate={180} />,
                tooltip: `${
                    tooltip === "неделя"
                        ? "Предыдущая " + tooltip
                        : "Предыдущий " + tooltip
                }`,
                action: () => this.onChange("subtract", disabledLeft),
                disabled: disabledLeft,
            },
        ];

        const arrowRight = [
            {
                icon: <FullArrowIcon opacity={0.5} />,
                tooltip: `${
                    tooltip === "неделя"
                        ? "Следующая " + tooltip
                        : "Следующий " + tooltip
                }`,
                action: () => this.onChange("add", disabledRight),
                disabled: disabledRight,
            },
        ];

        return (
            <Wrapper>
                <Date width={width}>
                    {customTitle ? (
                        <Year>{customTitle}</Year>
                    ) : (
                        <>
                            {data.month && <Month>{data.month}</Month>}
                            <Year>{data.year}</Year>
                        </>
                    )}
                </Date>
                <Controls>
                    <ArrowWrapper>
                        <Actions items={arrowLeft} />
                    </ArrowWrapper>
                    {!hideToday && (
                        <ButtonWrapper>
                            <Button
                                label={"Сегодня"}
                                onClick={() => onChange("today")}
                            />
                        </ButtonWrapper>
                    )}
                    <ArrowWrapper>
                        <Actions items={arrowRight} />
                    </ArrowWrapper>
                </Controls>
            </Wrapper>
        );
    }

    onChange = (type, disabled) => {
        const { onChange } = this.props;

        if (!disabled) {
            onChange(type);
        }

        return null;
    };
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
`;

const Month = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
            size: props.theme.fonts.sizes.normal,
        })};
    margin-right: 20px;
`;

const Year = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
            size: props.theme.fonts.sizes.normal,
        })};
`;

const Controls = styled.div`
    display: flex;
    align-items: center;

    > div {
        margin-right: 10px;

        &:last-child {
            margin-right: 0;
        }
    }

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        padding: 10px 0;
    }
`;

const ArrowWrapper = styled.div``;

const ButtonWrapper = styled.div``;

const Date = styled.div`
    display: flex;
    align-items: center;
    width: ${(props) => props.width};
    margin-right: 16px;
    padding: 5px 0;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        justify-content: center;
    }
`;

MonthSwitch.propTypes = {
    onChange: PropTypes.func.isRequired,
    tooltip: PropTypes.string.isRequired,
    data: PropTypes.object,
    customTitle: PropTypes.string,
    width: PropTypes.string,
    disabledLeft: PropTypes.bool,
    disabledRight: PropTypes.bool,
    hideToday: PropTypes.bool,
};

MonthSwitch.defaultProps = {
    customTitle: "",
    width: "200px",
    disabledLeft: false,
    disabledRight: false,
    hideToday: false,
};

export default MonthSwitch;
