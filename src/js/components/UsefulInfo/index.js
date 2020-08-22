import React, { PureComponent } from "react";
import styled from "styled-components";
import { Tabs } from "components/Tabs";
import { fontStyles } from "styledMixins/mixins";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    getArticleSectionList,
    getCurrentArticleList,
} from "actions/pregnancy";
import { FetchingList } from "components/FetchingList";
import { showPopup } from "actions/popup";

@connect((state) => ({
    tabs: state.pregnancy.usefulArticle.tabs,
    tabsThatIsNotEmpty: state.pregnancy.usefulArticle.tabsThatIsNotEmpty,
    data: state.pregnancy.usefulArticle.data,
}))
class UsefulInfo extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        tabs: PropTypes.object,
        data: PropTypes.object,
        tabsThatIsNotEmpty: PropTypes.array,
    };

    constructor(props) {
        super(props);
        this.state = {
            sectionId: null,
            tabs: null,
        };
    }

    tabsFormatHandle = () => {
        const { tabsThatIsNotEmpty } = this.props;

        if (tabsThatIsNotEmpty.length) {
            const tabs = tabsThatIsNotEmpty.map((el) => ({
                value: el.section.id,
                label: el.section.title,
                articlesCount: el.articlesCount,
            }));

            this.setState({ tabs, sectionId: tabs[0].value });
        }
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getArticleSectionList());
    }

    componentDidUpdate(prevProps) {
        if (
            JSON.stringify(prevProps.tabs) !== JSON.stringify(this.props.tabs)
        ) {
            this.tabsFormatHandle();
        }
    }

    render() {
        const { sectionId, tabs } = this.state;
        const { dispatch } = this.props;
        return (
            <Wrapper>
                {tabs && (
                    <>
                        <TabsWrapper>
                            <Tabs
                                elements={tabs}
                                onChange={(e) =>
                                    this.setState({
                                        sectionId: e.value,
                                    })
                                }
                                tab={sectionId}
                            />
                        </TabsWrapper>
                        <ContentWrapper>
                            <FetchingList
                                params={{ sectionId }}
                                renderItem={(item, i) => (
                                    <UsefulInfoItem
                                        key={i}
                                        onClick={() =>
                                            dispatch(
                                                showPopup(
                                                    item.title,
                                                    <InfoWrapper>
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    item.text,
                                                            }}
                                                        />
                                                    </InfoWrapper>,
                                                ),
                                            )
                                        }
                                    >
                                        {/*todo надо посмотреть верстку в showPopup (<div>{item.text}</div>)*/}
                                        {item.title}
                                    </UsefulInfoItem>
                                )}
                                reducerName={"pregnancy"}
                                objectName={"usefulArticle.data"}
                                action={getCurrentArticleList}
                            />
                        </ContentWrapper>
                    </>
                )}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div``;

const TabsWrapper = styled.div`
    margin-bottom: 16px;

    > div {
        > div {
            padding: 5px 0;
        }
    }
`;

const InfoWrapper = styled.div`
    padding: 0 10px;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
`;

const ContentWrapper = styled.div``;

const UsefulInfoItem = styled.div`
    width: 100%;
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.colors.text.colorBlack,
        })};
    padding: ${(props) => props.theme.paddings.normal};
`;

export default UsefulInfo;
