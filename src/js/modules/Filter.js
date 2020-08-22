import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RESPONSIVE } from "config/consts";
import { Button } from "components/Button";
import InlineFormField from "components/InlineFormField";
import InlineFormFieldDate from "components/InlineFormFieldDate";
import InlineFormFieldSelect from "components/InlineFormFieldSelect";
import forEach from "lodash/forEach";
import dayjs from "dayjs";
import { serverFormatDate } from "utils/formatDate";

class Filter extends PureComponent {
    constructor(props) {
        super(props);
        this.emptyState = {};
        props.fields.map((e) => (this.emptyState[e.name] = e.initial || ""));
        this.state = this.emptyState;
    }

    static propTypes = {
        fields: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
                placeholder: PropTypes.string,
                options: PropTypes.array,
            }),
        ).isRequired,
        onSearch: PropTypes.func.isRequired,
        onClearMinMax: PropTypes.func,
    };

    static defaultProps = {
        onClearMinMax: () => {},
    };

    onSearch = () => {
        const { onSearch } = this.props;
        const params = {};
        forEach(this.state, (v, k) => {
            if (v) {
                if (dayjs.isDayjs(v)) {
                    params[k] = serverFormatDate(v);
                } else if (v) {
                    params[k] = v;
                }
            }
        });
        onSearch(params);
    };

    onClear = () => {
        const { onSearch, fields, onClearMinMax } = this.props;

        onClearMinMax();

        const emptyState = {};
        fields.map((e) => (emptyState[e.name] = e.initial || ""));

        this.setState(
            {
                ...emptyState,
            },
            () => onSearch({}),
        );
    };

    onChangeSearchValue = (value, name) => {
        this.setState({ [name]: value });
    };

    render() {
        const { fields } = this.props;
        return (
            <SearchWrapper>
                <InputsWrapper>
                    {fields.map((e) => {
                        let content = null;
                        if (e.type === "input") {
                            content = (
                                <InlineFormField
                                    label={e.label}
                                    onChange={(value) =>
                                        this.onChangeSearchValue(value, e.name)
                                    }
                                    placeholder={e.placeholder}
                                    value={this.state[e.name]}
                                />
                            );
                        } else if (e.type === "date") {
                            content = (
                                <InlineFormFieldDate
                                    label={e.label}
                                    onChange={(value) => {
                                        if (e.onChange) {
                                            e.onChange(value);
                                        }
                                        this.onChangeSearchValue(value, e.name);
                                    }}
                                    value={this.state[e.name]}
                                    placeholder={e.placeholder}
                                    minDate={e.minDate}
                                    maxDate={e.maxDate}
                                />
                            );
                        } else if (e.type === "select") {
                            content = (
                                <InlineFormFieldSelect
                                    onChange={(value) =>
                                        this.onChangeSearchValue(value, e.name)
                                    }
                                    options={e.options}
                                    label={e.label}
                                    value={this.state[e.name]}
                                />
                            );
                        }
                        return <Item key={`filter-${e.name}`}>{content}</Item>;
                    })}
                </InputsWrapper>
                <ActionsWrapper>
                    <Button label={"Поиск"} onClick={this.onSearch} />
                    <Button label={"Очистить"} onClick={this.onClear} />
                </ActionsWrapper>
            </SearchWrapper>
        );
    }
}

const SearchWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        flex-wrap: wrap;
    }
`;

const InputsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    margin-right: 16px;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        margin-right: 0;
    }
`;

const ActionsWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
`;

const Item = styled.div`
    margin-right: 16px;
    flex: 1 1 auto;
    margin-bottom: 16px;

    &:nth-child(5n) {
        margin-right: 0;
    }

    &:last-child {
        margin-right: 0;
    }

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        flex: 1 0 auto;
        width: 100%;
        margin-right: 0;
        margin-bottom: 10px;
    }
`;

export default Filter;
