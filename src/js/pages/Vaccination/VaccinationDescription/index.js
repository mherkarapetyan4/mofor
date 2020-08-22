import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextBlock from "components/TextBlock";
import Row from "containers/Row";
import Column from "containers/Column";

class VaccinationDescription extends PureComponent {
    render() {
        const { description } = this.props.data;

        return (
            <Wrapper>
                <Row>
                    <Column>
                        <TextBlock>
                            {description
                                ? description
                                : "Отсутствует описание вакцинации"}
                        </TextBlock>
                    </Column>
                </Row>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div``;

VaccinationDescription.propTypes = {
    data: PropTypes.object,
};

export default VaccinationDescription;
