import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { List } from "components/List";
import { Pagination } from "components/Pagination";
import { Loader } from "components/Loader";
import { connect } from "react-redux";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import styled from "styled-components";
import NoData from "components/NoData";

@connect((state, onwProps) => ({
    data: get(
        state,
        onwProps.objectName
            ? `${onwProps.reducerName}.${onwProps.objectName}`
            : `${onwProps.reducerName}.data`,
        {},
    ),
    isFetching: get(state, `${onwProps.reducerName}.isFetching`, false),
}))
class FetchingList extends PureComponent {
    static propTypes = {
        renderItem: PropTypes.func.isRequired,
        reducerName: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired,
        data: PropTypes.object,
        dispatch: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
        params: PropTypes.object,
        objectName: PropTypes.string,
        rigid: PropTypes.bool,
        emptyMessage: PropTypes.func,
        hidePagination: PropTypes.bool,
        alwaysDidMountFetch: PropTypes.bool,
        defaultPageSize: PropTypes.number,
    };

    static defaultProps = {
        emptyMessage: () => (
            <NoDataWrapper>
                <NoData
                    title={"Нет данных"}
                    message={"Для данного объекта отсутствуют данные"}
                />
            </NoDataWrapper>
        ),
        params: {},
        data: {},
        objectName: "data",
        hidePagination: false,
        alwaysDidMountFetch: false,
        defaultPageSize: 10,
    };

    componentDidMount() {
        const { data, alwaysDidMountFetch, defaultPageSize } = this.props;
        if (alwaysDidMountFetch && !isEmpty(data))
            this.fetchData(data.pageNumber, data.pageSize);
        else if (alwaysDidMountFetch || isEmpty(data))
            this.fetchData(undefined, defaultPageSize);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.params, this.props.params)) {
            const { data } = this.props;
            this.fetchData(1, data.pageSize);
        }
    }

    fetchData = (pageNumber = 1, pageSize = 10) => {
        const { dispatch, action, params } = this.props;
        dispatch(action({ params, pageNumber, pageSize }));
    };

    onChangePageNumber = (pageNumber) => {
        const { data } = this.props;
        this.fetchData(pageNumber, data.pageSize);
    };

    render() {
        const {
            renderItem,
            data,
            isFetching,
            rigid,
            hidePagination,
            emptyMessage,
        } = this.props;

        if (isFetching) return <Loader />;

        return (
            <ListWrapper>
                {!isEmpty(data.content) ? (
                    <>
                        <List
                            rigid={rigid}
                            data={data.content}
                            renderItem={renderItem}
                        />
                        {!hidePagination && (
                            <Pagination
                                pageNumber={data.pageNumber}
                                pagesCount={data.pagesCount}
                                onChangePageNumber={this.onChangePageNumber}
                                elementsOnPageCount={get(
                                    data,
                                    "elementsOnPageCount",
                                    1,
                                )}
                                elementsTotalCount={get(
                                    data,
                                    "elementsTotalCount",
                                    1,
                                )}
                            />
                        )}
                    </>
                ) : (
                    emptyMessage()
                )}
            </ListWrapper>
        );
    }
}

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const NoDataWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

export { FetchingList };
