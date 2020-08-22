import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// import dayjs from "dayjs";
import { Button } from "components/Button";
import { eventActionHandler } from "actions/onco";
import { serverFormatDate } from "utils/formatDate";
import { oncoPath } from "config/paths";
import { hidePopup } from "actions/popup";
import styled from "styled-components";
import DatePicker from "components/DatePicker";

class RescheduleCalendarInPopup extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pickedDate: null,
        };
    }

    // fillPickedDate = () => {
    //     const { fromDate, toDate } = this.props.data;
    //     if (dayjs().isBetween(dayjs(fromDate), dayjs(toDate))) {
    //         return dayjs();
    //     } else if (dayjs().isAfter(toDate)) {
    //         return dayjs(toDate);
    //     } else if (dayjs().isBefore(fromDate)) {
    //         return dayjs(fromDate);
    //     }
    //     return dayjs();
    // };

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
    };

    render() {
        const { dispatch, data } = this.props;
        const { pickedDate } = this.state;
        const { id } = data;

        return (
            <PopupWrapper>
                <DatePicker
                    onChange={(e) => this.setState({ pickedDate: e })}
                    open={true}
                    onClose={this.onClose}
                    value={pickedDate}
                    label={"Дата"}
                />
                <Button
                    label={"Потвердить"}
                    onClick={() => {
                        if (!pickedDate) return false;
                        dispatch(
                            eventActionHandler(
                                { id, date: serverFormatDate(pickedDate) },
                                oncoPath.EVENT_RESCHEDULE,
                            ),
                        );
                        dispatch(hidePopup());
                    }}
                />
            </PopupWrapper>
        );
    }
}

const PopupWrapper = styled.div`
    padding: 1rem;
`;

export default RescheduleCalendarInPopup;
