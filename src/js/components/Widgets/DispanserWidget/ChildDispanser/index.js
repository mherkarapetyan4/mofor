import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getChildWidgetInfo } from "actions/widgets";
import get from "lodash/get";
import { showPopup } from "actions/popup";
import { fontStyles } from "styledMixins/mixins";
import styled from "styled-components";
import { Button } from "components/Button";
import DispanserWardResults from "components/Widgets/DispanserWidget/DispanserWardResults";
import ArrowIcon from "icons/ArrowIcon";
import { darken } from "polished";
import isEmpty from "lodash/isEmpty";
import find from "lodash/find";

@connect((state) => ({
    dispanserWidget: state.widgets.dispanserWidget,
}))
class ChildDispanser extends PureComponent {
    state = {
        index: 0,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getChildWidgetInfo());
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.index === this.state.index) {
            const { dispanserWidget } = this.props;
            const content = get(dispanserWidget, "child.content", []);
            const elements = content.map((item) => ({
                id: item.age.id,
                title: item.age.title,
                isOpen: item.active,
                value: this.accordeonElement(item),
            }));

            if (!isEmpty(elements)) {
                const element = find(elements, (item) => item.isOpen === true);
                if (element) {
                    this.setState({
                        index: element.id - 1,
                    });
                }
            }
        }
    }

    events = (events) => {
        return (
            <EventsWrapper>
                <EventsHeader>
                    Необходимо пройти следующие процедуры и/или сдать следующие
                    анализы для выбранного возраста:
                </EventsHeader>
                {events.map((event) => (
                    <EventName key={event.id}>{event.title}</EventName>
                ))}
            </EventsWrapper>
        );
    };

    accordeonElement = (element) => {
        const { dispatch } = this.props;
        return (
            <Wrapper>
                {element.doctors && (
                    <DoctorsWrapper>
                        {element.doctors.map((doctor) => (
                            <Doctor key={doctor.id}>— {doctor.title}</Doctor>
                        ))}
                    </DoctorsWrapper>
                )}
                {(element.events || element.results) && (
                    <ActionWrapper>
                        {element.events && (
                            <Button
                                label={"Информация о процедурах"}
                                onClick={() =>
                                    dispatch(
                                        showPopup(
                                            "Информация о процедурах",
                                            this.events(element.events),
                                        ),
                                    )
                                }
                            />
                        )}
                        {element.result && (
                            <Button
                                label={"Результаты диспансеризации"}
                                onClick={() =>
                                    dispatch(
                                        showPopup(
                                            "Результаты диспансеризации",
                                            <DispanserWardResults
                                                item={element}
                                            />,
                                        ),
                                    )
                                }
                            />
                        )}
                    </ActionWrapper>
                )}
            </Wrapper>
        );
    };

    render() {
        const { dispanserWidget } = this.props;
        const content = get(dispanserWidget, "child.content", []);
        const elements = content.map((item) => ({
            id: item.age.id,
            title: item.age.title,
            isOpen: item.active,
            value: this.accordeonElement(item),
        }));
        const { index } = this.state;

        return (
            <WidgetWrapper>
                <WidgetHeader>
                    <WidgetAge>
                        {!isEmpty(elements) && elements[index].title}
                    </WidgetAge>
                    <WidgetControls>
                        <Prev
                            onClick={() =>
                                index <= 0 ? null : this.changeElement(-1)
                            }
                        >
                            <ArrowIcon opacity={0.5} />
                        </Prev>
                        <Next
                            onClick={() =>
                                index >= elements.length - 1
                                    ? null
                                    : this.changeElement(1)
                            }
                        >
                            <ArrowIcon opacity={0.5} rotate={180} />
                        </Next>
                    </WidgetControls>
                </WidgetHeader>
                <WidgetContent>
                    {!isEmpty(elements) && elements[index].value}
                </WidgetContent>
                <Warning>
                    Приказ №514н &quot;О порядке проведения профилактических
                    медицинских осмотров несовершеннолетних&quot;
                </Warning>
            </WidgetWrapper>
        );
    }

    changeElement = (type) => {
        this.setState({
            index: this.state.index + type,
        });
    };
}

const Wrapper = styled.div`
    margin-bottom: 10px;
`;

const WidgetAge = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
`;

const WidgetContent = styled.div``;

const Prev = styled.div`
    width: 24px;
    height: 24px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color ${(props) => props.theme.animations.transition};

    svg {
        width: 100%;
        height: 100%;
    }

    &:hover {
        background-color: ${(props) =>
            darken(0.1, props.theme.colors.background.white)};
    }
`;

const Next = styled.div`
    width: 24px;
    height: 24px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color ${(props) => props.theme.animations.transition};

    svg {
        width: 100%;
        height: 100%;
    }

    &:hover {
        background-color: ${(props) =>
            darken(0.1, props.theme.colors.background.white)};
    }
`;

const WidgetHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${(props) => props.theme.paddings.normal};
`;

const WidgetControls = styled.div`
    display: flex;
`;

const WidgetWrapper = styled.div``;

const EventsHeader = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    line-height: ${(props) => props.theme.fonts.lineHeight.normal};
    margin-bottom: 10px;
`;

const EventsWrapper = styled.div`
    padding: 10px;
`;

const EventName = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    margin-bottom: 10px;

    :last-child {
        margin-bottom: 0;
    }
`;

const ActionWrapper = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    margin-top: 16px;

    > div {
        margin-right: 16px;

        :last-child {
            margin-right: 0;
        }
    }
`;

const DoctorsWrapper = styled.div``;

const Warning = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorWhite,
        })};
    background-color: ${(props) => props.theme.colors.notifications.warning};
    border-radius: 4px;
    padding: 10px;
`;

const Doctor = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    margin-bottom: 10px;

    :last-child {
        margin-bottom: 0;
    }
`;

ChildDispanser.propTypes = {
    dispatch: PropTypes.func.isRequired,
    dispanserWidget: PropTypes.object.isRequired,
};

export default ChildDispanser;
