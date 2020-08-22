import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { LK_MAP_ELEMENTS, LK_MENU_ELEMENTS } from "config/menu";
import Heading from "containers/Heading";
import PageHeading from "components/PageHeading";
import Row from "containers/Row";
import Column from "containers/Column";
import Accordeon from "components/Accordeon";
import IconPlate from "components/IconPlate";
import isEmpty from "lodash/isEmpty";
import { history } from "routes/history";
import ScrollBar from "components/ScrollBar";
import { connect } from "react-redux";

@connect((state) => ({
    settings: state.user.settings,
    ward: state.myData.myData.ward,
}))
class SiteMap extends PureComponent {
    static propTypes = {
        settings: PropTypes.object.isRequired,
        ward: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);

        this.fillMenuItems(props.settings);

        this.otherItems = [];
        Object.keys(LK_MAP_ELEMENTS).map((key) => {
            const item = LK_MAP_ELEMENTS[key];
            if (item.leftMenu) {
                this.otherItems.push({
                    name: LK_MAP_ELEMENTS[key].name,
                    path: LK_MAP_ELEMENTS[key].path,
                    icon: LK_MAP_ELEMENTS[key].icon,
                });
            }
        });
        this.otherMapItems = this.generateMapData(this.otherItems);
    }

    componentDidUpdate(prevProps) {
        if (isEmpty(prevProps.settings) && !isEmpty(this.props.settings)) {
            this.fillMenuItems(this.props.settings);
        }
    }

    fillMenuItems = (settings) => {
        this.menuItems = [];
        const { ward } = this.props;
        const emptySettings = isEmpty(settings);
        Object.keys(LK_MENU_ELEMENTS).map((key) => {
            const item = LK_MENU_ELEMENTS[key];
            if (item.leftMenu) {
                if (
                    emptySettings ||
                    (item.path === LK_MENU_ELEMENTS.PREGNANCY_PAGE.path &&
                        settings.pregnancy) ||
                    (item.path === LK_MENU_ELEMENTS.POLIS_PAGE.path &&
                        settings.policyClaim) ||
                    (item.path === LK_MENU_ELEMENTS.VACCINATION_PAGE.path &&
                        ward) ||
                    (item.path !== LK_MENU_ELEMENTS.PREGNANCY_PAGE.path &&
                        item.path !== LK_MENU_ELEMENTS.POLIS_PAGE.path &&
                        item.path !== LK_MENU_ELEMENTS.VACCINATION_PAGE.path)
                ) {
                    const item = this.fillElement(key);
                    if (
                        settings.emiasVersion !== 5 &&
                        item.path === LK_MENU_ELEMENTS.DOCTOR_PAGE.path
                    ) {
                        item.action = () =>
                            window.open("https://emias.info/", "_blank");
                    }
                    this.menuItems.push(item);
                }
            }
        });
        this.mapItems = this.generateMapData(this.menuItems);
        this.forceUpdate();
    };

    fillElement = (key) => ({
        name: LK_MENU_ELEMENTS[key].name,
        path: LK_MENU_ELEMENTS[key].path,
        icon: LK_MENU_ELEMENTS[key].icon,
    });

    generateMapData = (menuItems) => {
        let arr = [];
        menuItems.map((item) => {
            arr.push({
                icon: <IconPlate title={item.icon} />,
                title: item.name,
                action: item.action
                    ? item.action
                    : () => {
                          history.push(item.path);
                      },
            });
        });

        return arr;
    };

    render() {
        return (
            <>
                <Heading>
                    <PageHeading title={LK_MENU_ELEMENTS.SITE_MAP_PAGE.name} />
                </Heading>
                <Row fullHeight>
                    <ScrollBar>
                        <Row fullPage>
                            <Column fraction={6}>
                                {!isEmpty(this.mapItems) && (
                                    <Accordeon elements={this.mapItems} />
                                )}
                            </Column>
                            <Column fraction={6}>
                                {!isEmpty(this.mapItems) && (
                                    <Accordeon elements={this.otherMapItems} />
                                )}
                            </Column>
                        </Row>
                    </ScrollBar>
                </Row>
            </>
        );
    }
}

export default SiteMap;
