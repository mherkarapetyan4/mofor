import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ColumnWrapper = styled.div`
    margin-right: 10px;
    flex: 1 1 ${(props) => props.basis || "auto"};
    width: 100%;
    &:last-child {
        margin-right: 0;
    }
`;

class Column extends PureComponent {
    render() {
        const { children, basis } = this.props;

        return <ColumnWrapper basis={basis}>{children}</ColumnWrapper>;
    }
}

Column.propTypes = {
    children: PropTypes.any,
    basis: PropTypes.string,
};

export default Column;
