import React, { PureComponent } from "react";
import styled from "styled-components";
import { Checkbox } from "components/Checkbox";
import InlineFormFieldTextarea from "components/InlineFormFieldTextarea";
import { Button } from "components/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addComplication } from "actions/pregnancy";
import { serverFormatDate } from "utils/formatDate";
import dayjs from "dayjs";
import { showPopup } from "actions/popup";
import PregnancyComplications from "pages/Pregnancy/PregnancyComplications";
import isEmpty from "lodash/isEmpty";
import { fontStyles } from "styledMixins/mixins";

@connect((state) => ({
    complicationKindList: state.pregnancy.complicationKindList,
}))
class NewPregnancyComplication extends PureComponent {
    static propTypes = {
        complicationKindList: PropTypes.object,
        dispatch: PropTypes.func.isRequired,
        item: PropTypes.object,
    };

    static defaultProps = {
        complicationKindList: {},
        item: {},
    };

    constructor(props) {
        super(props);
        this.isEmptyItem = isEmpty(props.item);
        this.state = {
            complicationKindList: props.complicationKindList.content.map(
                (e) => ({
                    ...e,
                    checked: this.isEmptyItem
                        ? false
                        : props.item.kinds.some((el) => el.id === e.id),
                }),
            ),
            comment: this.isEmptyItem
                ? ""
                : props.item.complication.comment || "",
            fullfilled: false,
        };
    }

    fullfilledHandler = () => {
        const { complicationKindList } = this.state;
        complicationKindList.find((item) => item.checked)
            ? this.setState({ fullfilled: true })
            : this.setState({ fullfilled: false });
    };

    checkboxHandler = (id) => {
        const buffCheckboxes = [...this.state.complicationKindList];
        this.setState({
            complicationKindList: buffCheckboxes.map((e) =>
                e.id === id ? { ...e, checked: !e.checked } : e,
            ),
        });
    };
    goBackHandler = () => {
        const { dispatch } = this.props;
        dispatch(showPopup("Все осложнения", <PregnancyComplications />));
    };

    componentDidMount() {
        this.fullfilledHandler();
    }

    componentDidUpdate(prevState) {
        if (
            JSON.stringify(prevState.complicationKindList) !==
            JSON.stringify(this.state.complicationKindList)
        ) {
            this.fullfilledHandler();
        }
    }

    render() {
        const { complicationKindList, comment, fullfilled } = this.state;
        const { dispatch, item } = this.props;
        return (
            <Wrapper>
                <List>
                    {complicationKindList.map((item, i) => (
                        <Item key={i}>
                            <Checkbox
                                label={item.title}
                                value={item.checked}
                                name={item.id}
                                onChange={() => {
                                    this.checkboxHandler(item.id);
                                }}
                            />
                        </Item>
                    ))}
                </List>
                {!fullfilled && (
                    <ValidationText>
                        Необходимо выбрать как минимум одно осложнение
                    </ValidationText>
                )}
                <Comment>
                    <InlineFormFieldTextarea
                        label={"Комментарий:"}
                        onChange={(e) => {
                            this.setState({
                                comment: e,
                            });
                        }}
                        placeholder={"Напишите комментарий"}
                        value={comment}
                    />
                </Comment>
                <Actions>
                    <Button
                        label={"Отмена"}
                        onClick={() => {
                            this.goBackHandler();
                        }}
                    />
                    <Button
                        label={"Сообщить"}
                        onClick={() => {
                            const kinds = complicationKindList
                                .filter((e) => e.checked && e.id)
                                .map((e) => e.id);
                            const params = {
                                kindId: kinds,
                                comment,
                            };
                            if (this.isEmptyItem) {
                                params.date = serverFormatDate(dayjs());
                            } else {
                                params.date = serverFormatDate(
                                    dayjs(item.complication.date),
                                );
                                params.id = item.complication.id;
                            }
                            dispatch(addComplication(params));
                            this.goBackHandler();
                        }}
                        disabled={!fullfilled}
                    />
                </Actions>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div``;

const List = styled.div``;

const Comment = styled.div`
    padding: 16px;
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 16px;

    > div {
        margin-right: 16px;

        &:last-child {
            margin-right: 0;
        }
    }
`;

const ValidationText = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorAlert })};
    margin-left: 16px;
    margin-top: 3px;
`;

const Item = styled.div`
    padding: 5px 16px;
`;

export default NewPregnancyComplication;
