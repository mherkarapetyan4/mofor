import React, { PureComponent } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
    getTargetHealthData,
    getExistingHealthWidgets,
    setAvailableHealthWidgets,
    setIsFetching,
    updateExistingWidgets,
} from "actions/health";
import PropTypes from "prop-types";
import HealthWidget from "pages/Health/Widgets";
import { HEALTH_TYPES, RESPONSIVE } from "config/consts";
import StrokeWidget from "components/StrokeWidget";
import NewWidget from "components/Widgets/NewWidget";
import { showPopup } from "actions/popup";
import SelectableList from "components/SelectableList";
import { Loader } from "components/Loader";

@connect(
    (state) => ({
        target: state.health.target,
        existingWidgets: state.health.widgets.existing,
        availableWidgets: state.health.widgets.available,
        isFetching: state.health.widgets.isFetching,
    }),
    {
        getTargetHealthData,
        showPopup,
        getExistingHealthWidgets,
        setAvailableHealthWidgets,
        setIsFetching,
        updateExistingWidgets,
    },
)
class HealthGrid extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func,
        getTargetHealthData: PropTypes.func,
        target: PropTypes.array.isRequired,
        showPopup: PropTypes.func,
        getExistingHealthWidgets: PropTypes.func,
        setAvailableHealthWidgets: PropTypes.func,
        updateExistingWidgets: PropTypes.func,
        existingWidgets: PropTypes.array,
        availableWidgets: PropTypes.array,
        isFetching: PropTypes.bool,
    };
    static defaultProps = {
        target: [],
    };

    componentDidMount() {
        const {
            getTargetHealthData,
            getExistingHealthWidgets,
            setAvailableHealthWidgets,
        } = this.props;

        setIsFetching(true);
        getTargetHealthData();
        getExistingHealthWidgets()
            .then(() => setAvailableHealthWidgets(HEALTH_TYPES))
            .finally(() => {
                setIsFetching(false);
            });
    }

    render() {
        const {
            showPopup,
            existingWidgets,
            availableWidgets,
            isFetching,
        } = this.props;

        return (
            <>
                {isFetching ? (
                    <Loader />
                ) : (
                    <Wrapper>
                        {existingWidgets.map((widgetType, index) => {
                            const widget = HEALTH_TYPES.find(
                                (item) => item.type === widgetType,
                            );
                            return (
                                <GridItem key={`health_${index}`}>
                                    <StrokeWidget
                                        widget={
                                            <HealthWidget type={widgetType} />
                                        }
                                        onClose={() =>
                                            this.props.updateExistingWidgets(
                                                widget.type,
                                                "remove",
                                            )
                                        }
                                        title={widget.label}
                                    />
                                </GridItem>
                            );
                        })}
                        {availableWidgets.length > 0 && (
                            <GridItem>
                                <StrokeWidget
                                    widget={
                                        <NewWidget
                                            disable={isFetching}
                                            onAdd={() =>
                                                showPopup(
                                                    "Выберите виджет",
                                                    <SelectableList
                                                        list={availableWidgets}
                                                        onSelect={(widget) =>
                                                            this.props.updateExistingWidgets(
                                                                widget.type,
                                                                "add",
                                                            )
                                                        }
                                                    />,
                                                )
                                            }
                                        />
                                    }
                                    closable={false}
                                    title={"Добавить виджет"}
                                />
                            </GridItem>
                        )}
                    </Wrapper>
                )}
            </>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const GridItem = styled.div`
    width: 48%;
    margin-right: 1%;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        width: 100%;
        margin-right: 0;
    }
`;

export default HealthGrid;
