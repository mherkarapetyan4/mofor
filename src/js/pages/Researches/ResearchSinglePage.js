import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { hasHistoryState } from "modules/hasHistoryState";
import { LK_MENU_ELEMENTS } from "config/menu";
import UploadInfo from "pages/Researches/Components/UploadInfo";
import EditResearch from "pages/Researches/Components/EditResearch";
import FlatPopup from "components/FlatPopup";
import Column from "containers/Column";
import Row from "containers/Row";
import ScrollBar from "components/ScrollBar";
import { Desktop, Tablet } from "wrappers/responsive";
import {
    getResearch,
    clearFile,
    getResearchFullfilled,
} from "actions/myResearches";
import { connect } from "react-redux";

@connect((state) => ({
    research: state.researches.research,
}))
@hasHistoryState(LK_MENU_ELEMENTS.TREATMENT_PAGE.path)
class ResearchSinglePage extends PureComponent {
    static propTypes = {
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        research: PropTypes.object.isRequired,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        const { item } = this.props.location.state;
        if (item.id) {
            dispatch(getResearch(item.id));
        }
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(clearFile());
        dispatch(getResearchFullfilled({}));
    }

    render() {
        const { item } = this.props.history.location.state;
        return (
            <FlatPopup
                title={
                    item.title
                        ? "Редактировать документ: " + item.title
                        : "Добавить документ"
                }
            >
                <Row fullPage>
                    <Column fraction={6} paddings={0}>
                        <Desktop>
                            <ScrollBar noScrollX>
                                <EditResearch
                                    data={item}
                                    research={this.props.research}
                                />
                            </ScrollBar>
                        </Desktop>
                        <Tablet>
                            <EditResearch
                                data={item}
                                research={this.props.research}
                            />
                        </Tablet>
                    </Column>
                    <Column fraction={6} paddingRight={0} mobilePaddingLeft={0}>
                        <Desktop>
                            <ScrollBar noScrollX>
                                <UploadInfo />
                            </ScrollBar>
                        </Desktop>
                        <Tablet>
                            <UploadInfo />
                        </Tablet>
                    </Column>
                </Row>
            </FlatPopup>
        );
    }
}

export default ResearchSinglePage;
