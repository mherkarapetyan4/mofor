import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Row from "containers/Row";
import Column from "containers/Column";
import FlatPopup from "components/FlatPopup";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import { getInstructionList, getInstruction } from "actions/pillbox";
import { connect } from "react-redux";
import ScrollBar from "components/ScrollBar";
import { withRouter } from "react-router-dom";
import get from "lodash/get";
import { hasHistoryState } from "modules/hasHistoryState";
import { LK_MENU_ELEMENTS } from "config/menu";
import { hidePopup, showPopup } from "actions/popup";
import isEmpty from "lodash/isEmpty";
import { Loader } from "components/Loader";
import { Desktop, Tablet } from "wrappers/responsive";

@connect(
    ({ pillbox }) => ({
        instructionList: pillbox.instructionList,
        instruction: pillbox.instruction,
        isFetching: pillbox.isFetching,
    }),
    {
        showPopup,
        hidePopup,
        getInstructionList,
        getInstruction,
    },
)
@withRouter
@hasHistoryState(LK_MENU_ELEMENTS.MEDICINES_PAGE.path)
class PillboxInstruction extends PureComponent {
    static propTypes = {
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        dispatch: PropTypes.func,
        instruction: PropTypes.object,
        instructionList: PropTypes.array.isRequired,
        getInstructionList: PropTypes.func,
        getInstruction: PropTypes.func,
        showPopup: PropTypes.func,
        hidePopup: PropTypes.func,
        isFetching: PropTypes.bool,
    };

    componentDidMount() {
        const { getInstructionList, location } = this.props;
        const code = get(location, "state.code");
        getInstructionList(code);
    }

    componentDidUpdate(prevProps) {
        const {
            instructionList,
            getInstruction,
            showPopup,
            hidePopup,
        } = this.props;
        if (isEmpty(prevProps.instructionList) && !isEmpty(instructionList)) {
            if (instructionList.length === 1) {
                getInstruction(instructionList[0].code);
            } else {
                showPopup(
                    "Выберите инструкцию",
                    <div>
                        {instructionList.map((e) => (
                            <div
                                key={`code-${e.code}`}
                                onClick={() => {
                                    getInstruction(e.code);
                                    hidePopup();
                                }}
                            >
                                {e.name}
                            </div>
                        ))}
                    </div>,
                );
            }
        }
    }

    render() {
        const { instruction, instructionList } = this.props;
        if (isEmpty(instructionList)) {
            return (
                <FlatPopup
                    title={"Инструкция к лекарственному средству"}
                    backLocation={"/medicine"}
                    locationState={{ tab: "myDrugs" }}
                >
                    <Row fullPage>
                        <Column fraction={12}>
                            <InstructionWrapper>
                                {
                                    "Инструкция к лекарственному средуству отсутствует"
                                }
                            </InstructionWrapper>
                        </Column>
                    </Row>
                </FlatPopup>
            );
        }

        return (
            <FlatPopup
                title={"Инструкция к лекарственному средству"}
                backLocation={"/medicine"}
                locationState={{ tab: "myDrugs" }}
            >
                <Row fullPage>
                    <InstructionWrapper>
                        {!instruction ? (
                            <Loader />
                        ) : (
                            <>
                                <Desktop>
                                    <ScrollBar>
                                        {instruction && (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: instruction,
                                                }}
                                            />
                                        )}
                                    </ScrollBar>
                                </Desktop>
                                <Tablet>
                                    {instruction && (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: instruction,
                                            }}
                                        />
                                    )}
                                </Tablet>
                            </>
                        )}
                    </InstructionWrapper>
                </Row>
            </FlatPopup>
        );
    }
}

const InstructionWrapper = styled.div`
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorBlack })};
    height: 100%;
    width: 100%;
`;

export default PillboxInstruction;
