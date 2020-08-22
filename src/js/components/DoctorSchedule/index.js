import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import map from "lodash/map";
import DoctorItem from "components/DoctorSchedule/DoctorItem";

class DoctorSchedule extends PureComponent {
    render() {
        const { data } = this.props;

        return (
            <Wrapper>
                {map(data, (item, i) => (
                    <DoctorItem key={i} data={item} />
                ))}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div``;

DoctorSchedule.propTypes = {
    data: PropTypes.array.isRequired,
};

export default DoctorSchedule;
