import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getStatisticCount } from "actions/admin";
import { connect } from "react-redux";
import { get, isEmpty } from "lodash";
import { RESPONSIVE } from "config/consts";
import { ADMIN_STATISTIC_LABELS } from "config/consts";
import FormField from "components/FormField";

@connect((state) => ({
    data: state.admin.statisticsCounts,
}))
class CountsInfo extends PureComponent {
    static defaultProps = {
        data: {},
    };
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        data: PropTypes.object,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getStatisticCount());
    }

    renderItem() {
        const { data } = this.props;
        if (isEmpty(data)) {
            return null;
        }
        return Object.keys(data).map((key) => (
            <ListItemWrapper key={key}>
                <ItemInfo>
                    <FormField
                        label={get(ADMIN_STATISTIC_LABELS, key, "")}
                        value={get(data, key, "")}
                        disabled
                        onChange={() => {}}
                    />
                </ItemInfo>
            </ListItemWrapper>
        ));
    }

    render() {
        return this.renderItem();
    }
}

const ListItemWrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 16px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const ItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export default CountsInfo;
