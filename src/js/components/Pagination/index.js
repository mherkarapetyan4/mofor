import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ListData from "components/List/ListData";
import ArrowIcon from "icons/ArrowIcon";
import { fontStyles } from "styledMixins/mixins";
import { rgba } from "polished";
import { RESPONSIVE } from "config/consts";
import lodashRange from "lodash/range";

class Pagination extends PureComponent {
    static propTypes = {
        pageNumber: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired,
        pagesCount: PropTypes.number.isRequired,
        onChangePageNumber: PropTypes.func.isRequired,
        onChangePageSize: PropTypes.func.isRequired,
        elementsTotalCount: PropTypes.number.isRequired,
        elementsOnPageCount: PropTypes.number.isRequired,
        // currentPage:
        hidePageSize: PropTypes.bool,
        visiblePages: PropTypes.number,
    };

    static defaultProps = {
        pageNumber: 0,
        pageSize: 0,
        pagesCount: 0,
        onChangePageNumber: () => {},
        onChangePageSize: () => {},
        elementsTotalCount: 0,
        elementsOnPageCount: 0,

        hidePageSize: false,
        visiblePages: 5,
    };

    state = {
        show: false,
    };

    onChange = (direction, disabled) => {
        if (!disabled) {
            const { onChangePageNumber, pageNumber } = this.props;
            onChangePageNumber(pageNumber + direction);
        }
    };

    renderPage = (pageNum) => {
        const { pageNumber, onChangePageNumber } = this.props;
        return (
            <ListItem
                active={pageNumber === pageNum}
                key={`page_${pageNum}`}
                onClick={() => {
                    onChangePageNumber(pageNum);
                }}
            >
                {pageNum}
            </ListItem>
        );
    };

    decimate = (page, array) => {
        const { visiblePages } = this.props;
        const arrayLength = array.length;
        if (arrayLength <= visiblePages) {
            return array;
        }
        const half = Math.floor(visiblePages / 2);
        if (page <= half) {
            return array.slice(0, visiblePages);
        } else if (page > arrayLength - half) {
            return array.slice(arrayLength - visiblePages, arrayLength);
        }
        const mark = visiblePages % 2 === 1 ? -1 : 0;
        return array.slice(
            arrayLength - (arrayLength - page) - half + mark,
            arrayLength - (arrayLength - page) + half,
        );
    };

    renderNumbers = () => {
        const { pagesCount, pageNumber } = this.props;
        const range = lodashRange(pagesCount || 1);
        const decimated = this.decimate(pageNumber, range);
        return decimated.map((page) => this.renderPage(page + 1));
    };

    render() {
        const {
            pageNumber,
            pagesCount,
            elementsOnPageCount,
            elementsTotalCount,
        } = this.props;
        const disabledPrevButton = pageNumber === 1;
        const disabledNextButton =
            pagesCount === 0 || pageNumber === pagesCount;
        return (
            <Wrapper>
                <Data>
                    <DataItem>
                        <ListData
                            label={"Всего записей:"}
                            data={elementsTotalCount}
                        />
                    </DataItem>
                    <DataItem>
                        <ListData
                            label={"Найдено записей"}
                            data={elementsOnPageCount}
                        />
                    </DataItem>
                </Data>
                <ActionPanel>
                    <Control
                        disabled={disabledPrevButton}
                        onClick={() => this.onChange(-1, disabledPrevButton)}
                    >
                        <ArrowIcon opacity={0.5} rotate={0} />
                    </Control>
                    <PagesList>{this.renderNumbers()}</PagesList>
                    <Control
                        disabled={disabledNextButton}
                        onClick={() => this.onChange(1, disabledNextButton)}
                    >
                        <ArrowIcon opacity={0.5} rotate={180} />
                    </Control>
                </ActionPanel>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    flex-wrap: wrap;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        justify-content: center;
    }

    @media print {
        display: none;
    }
`;

const ActionPanel = styled.div`
    display: flex;
    align-items: center;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        padding: 10px 0;
    }
`;

const Data = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const DataItem = styled.div`
    margin-right: 15px;
    padding: 5px 0;

    &:last-child {
        margin-right: 0;
    }
`;

const PagesList = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
`;

const ListItem = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.active
                ? props.theme.colors.text.colorBlack
                : rgba(props.theme.colors.text.colorBlack, 0.5),
        })};
    background-color: ${(props) =>
        props.active ? props.theme.colors.borderColorHover : "transparent"};
    cursor: pointer;
    transition: background-color, color,
        ${(props) => props.theme.animations.transition};
    margin-right: 1px;

    &:hover {
        background-color: ${(props) => props.theme.colors.borderColor};
        color: ${(props) => props.theme.colors.text.colorBlack};
    }

    &:last-child {
        margin-right: 0;
    }
`;

const Control = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${(props) => (props.disabled ? "initial" : "pointer")};
    padding: 10px;
    flex: 0 0 auto;
    transition: background-color ${(props) => props.theme.animations.transition};
    margin: 0 1px;

    svg {
        width: 100%;
        height: 100%;
        fill-opacity: ${(props) => (props.disabled ? ".2" : "inherit")};
    }

    &:hover {
        background-color: ${(props) =>
            props.disabled ? "transparent" : props.theme.colors.borderColor};
    }
`;

export { Pagination };
