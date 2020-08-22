import React, { PureComponent } from "react";
import styled from "styled-components";
import { FetchingList } from "components/FetchingList";
import { getHotlineList, downloadHotlineList } from "actions/admin";
import { RESPONSIVE } from "config/consts";
import Heading from "containers/Heading";
import PageHeading from "components/PageHeading";
import { ADMIN_ELEMENTS } from "config/menu";
import Row from "containers/Row";
import Column from "containers/Column";
import { Desktop } from "wrappers/responsive";
import ScrollBar from "components/ScrollBar";
import { formatDate } from "utils/formatDate";
import { Button } from "components/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListData from "components/List/ListData";

@connect()
class HotlineSMO extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };
    state = {
        mouseOver: null,
    };
    onClick() {
        const { dispatch } = this.props;
        dispatch(downloadHotlineList());
    }
    renderItem = (
        {
            id,
            uploadDate,
            uploadedRecordsCount,
            totalRecordsCount,
            success,
            last,
        },
        index,
    ) => {
        return (
            <ListItemWrapper key={`item-id-${index}`}>
                <Item>
                    <ListData label={"Номер загрузки:"} data={id} />
                </Item>
                <Item>
                    <ListData
                        label={"Дата создания:"}
                        data={formatDate(uploadDate)}
                    />
                </Item>
                <Item>
                    <ListData
                        label={"Строк загружено/всего:"}
                        data={uploadedRecordsCount + "/" + totalRecordsCount}
                    />
                </Item>
                <Item>
                    <ListData
                        label={"Успешная:"}
                        data={success ? "Да" : "Нет"}
                    />
                </Item>
                <Item>
                    <ListData label={"Последняя:"} data={last ? "Да" : "Нет"} />
                </Item>
            </ListItemWrapper>
        );
    };

    render() {
        return (
            <>
                <Heading>
                    <PageHeading title={ADMIN_ELEMENTS.HOTLINE.name} />
                    <Button
                        label={"Загрузить"}
                        onClick={() => this.onClick()}
                    />
                </Heading>
                <Row fullPage>
                    <Column>
                        <Desktop>
                            <ScrollBar>
                                <Wrapper>
                                    <FetchingList
                                        action={getHotlineList}
                                        reducerName={"admin.smoHotline"}
                                        renderItem={this.renderItem}
                                        rigid
                                    />
                                </Wrapper>
                            </ScrollBar>
                        </Desktop>
                    </Column>
                </Row>
            </>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const ListItemWrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding: ${(props) => props.theme.paddings.normal};

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    margin-right: 40px;
`;

export default HotlineSMO;
