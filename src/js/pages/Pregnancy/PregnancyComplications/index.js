import React, { PureComponent } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import NoData from "components/NoData";
import { Button } from "components/Button";
import { fontStyles } from "styledMixins/mixins";
import ScrollBar from "components/ScrollBar";
import { showPopup } from "actions/popup";
import { connect } from "react-redux";
import NewPregnancyComplication from "pages/Pregnancy/NewPregnancyComplication";
import {
    getComplicationKindList,
    getComplicationList,
} from "actions/pregnancy";
import { FetchingList } from "components/FetchingList";
import { formatDate, serverFormatDate } from "utils/formatDate";
import dayjs from "dayjs";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import ListData from "components/List/ListData";

@connect(
    (state) => ({
        complicationKindList: state.pregnancy.complicationKindList,
        lastMenstruationDate: get(
            state.pregnancy.currentInfo,
            "lastMenstruationDate",
            Date.now(),
        ),
    }),
    { showPopup, getComplicationKindList },
)
class PregnancyComplications extends PureComponent {
    static propTypes = {
        lastMenstruationDate: PropTypes.string.isRequired,
        showPopup: PropTypes.func,
        getComplicationKindList: PropTypes.func,
        complicationKindList: PropTypes.object,
    };

    static defaultProps = {
        complicationKindList: {},
    };

    componentDidMount() {
        const { getComplicationKindList, complicationKindList } = this.props;
        if (isEmpty(complicationKindList)) getComplicationKindList();
    }

    onClick = (item = {}) => {
        const { showPopup } = this.props;
        showPopup(
            isEmpty(item) ? "Новое осложнение" : "Редактирование осложнения",
            <NewPregnancyComplication item={item} />,
        );
    };

    render() {
        const { lastMenstruationDate } = this.props;
        return (
            <Wrapper>
                <ComplicationsList>
                    <ScrollBar noScrollX={true}>
                        <FetchingList
                            rigid
                            params={{
                                fromDate: serverFormatDate(
                                    dayjs(lastMenstruationDate),
                                ),
                                toDate: serverFormatDate(dayjs()),
                            }}
                            emptyMessage={() => (
                                <NoData
                                    title={"Нет записей"}
                                    message={
                                        'Список осложений пуст. Нажмите на кнопку "Сообщить об осложнении", чтобы добавить новую запись.'
                                    }
                                />
                            )}
                            action={getComplicationList}
                            reducerName={"pregnancy"}
                            objectName={"complicationList"}
                            renderItem={(item, i) => (
                                <Item
                                    key={`complication-item-${i}`}
                                    onClick={() => this.onClick(item)}
                                >
                                    <ItemDate>
                                        {formatDate(item.complication.date)}
                                    </ItemDate>
                                    <ItemComplications>
                                        {item.kinds
                                            .map((e) => e.title)
                                            .join(", ")}
                                    </ItemComplications>
                                    <ItemComment>
                                        <ListData
                                            label={"Комментарий:"}
                                            data={
                                                item.complication.comment
                                                    ? item.complication.comment
                                                    : "Нет комментария"
                                            }
                                        />
                                    </ItemComment>
                                </Item>
                            )}
                        />
                    </ScrollBar>
                </ComplicationsList>
                <Actions>
                    <Button
                        label={"Сообщить об осложнении"}
                        onClick={() => this.onClick()}
                    />
                </Actions>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    height: 400px;
    display: flex;
    flex-direction: column;
    padding: 0 16px;
`;

const ComplicationsList = styled.div`
    flex: 1 1 auto;
`;

const Item = styled.div`
    padding: 16px;
    cursor: pointer;
`;

const ItemDate = styled.div`
    ${(props) => fontStyles(props)};
    margin-bottom: 5px;
`;

const ItemComplications = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
            size: props.theme.fonts.sizes.normal,
        })};
    margin-bottom: 5px;
`;

const ItemComment = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const Actions = styled.div`
    flex: 0 0 auto;
    display: flex;
    justify-content: flex-end;
    padding: 16px 0;
`;

export default PregnancyComplications;
