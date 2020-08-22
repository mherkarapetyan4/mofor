import React, { PureComponent } from "react";
import Row from "containers/Row";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Column from "containers/Column";
import MultiAutoComplete from "components/MultiAutoComplete";
import { pillboxPaths } from "config/paths";
import {
    addProfileAllergens,
    addProfileDiseases,
    deleteProfileAllergen,
    deleteProfileDiseases,
} from "actions/pillbox";
import { xor, get } from "lodash";
import { Desktop, Tablet } from "wrappers/responsive";

@connect(({ pillbox: { currentPillbox } }) => ({ currentPillbox }), {
    addProfileAllergens,
    addProfileDiseases,
    deleteProfileAllergen,
    deleteProfileDiseases,
})
class AllergiesAndDiseases extends PureComponent {
    static propTypes = {
        currentPillbox: PropTypes.object.isRequired,
        dispatch: PropTypes.func,
        addProfileDiseases: PropTypes.func,
        addProfileAllergens: PropTypes.func,
        deleteProfileDiseases: PropTypes.func,
        deleteProfileAllergen: PropTypes.func,
    };

    onSelectElement = (element, fieldName) => {
        const {
            currentPillbox,
            addProfileDiseases,
            addProfileAllergens,
        } = this.props;
        const profileId = get(currentPillbox, "profile.id");

        if (fieldName === "diseases") {
            addProfileDiseases({ ...element, profileId });
        } else if (fieldName === "allergens") {
            addProfileAllergens({ ...element, profileId });
        }
    };

    onRemoveElement = (items, fieldName) => {
        const {
            currentPillbox,
            deleteProfileDiseases,
            deleteProfileAllergen,
        } = this.props;
        const data = get(currentPillbox, fieldName, []);
        const removedItem = xor(data, items);
        const removedItemID = get(removedItem, "0.id", false);
        const profileId = get(currentPillbox, "profile.id", false);
        if (!removedItemID || !profileId) {
            return false;
        }
        if (fieldName === "diseases") {
            deleteProfileDiseases(removedItemID, profileId);
        } else if (fieldName === "allergens") {
            deleteProfileAllergen(removedItemID, profileId);
        }
    };

    render() {
        const { currentPillbox } = this.props;

        return (
            <Row>
                <Column fraction={6} paddingLeft={0} mobilePaddingRight={0}>
                    <MultiAutoComplete
                        title={"Список хронических заболеваний:"}
                        path={pillboxPaths.GET_DISEASE_LIST}
                        serverValue={"query"}
                        queryParams={{
                            pageSize: 10,
                            barcode: false,
                        }}
                        minCountSymbol={2}
                        listLabel="displayName"
                        elementLabel="disease.displayName"
                        elementValue="uniqueId"
                        onSelect={(e) => this.onSelectElement(e, "diseases")}
                        onRemove={(e) => this.onRemoveElement(e, "diseases")}
                        items={get(currentPillbox, "diseases", [])}
                        placeholder={"Введите диагноз"}
                        label={
                            <>
                                <Desktop>Хронические заболевания:</Desktop>
                                <Tablet>Хронические забол.:</Tablet>
                            </>
                        }
                    />
                </Column>
                <Column fraction={6} paddings={0}>
                    <MultiAutoComplete
                        title={"Список аллергий:"}
                        path={pillboxPaths.GET_ALLERGEN_LIST}
                        serverValue={"query"}
                        queryParams={{
                            pageSize: 10,
                            barcode: false,
                        }}
                        minCountSymbol={2}
                        listLabel="displayName"
                        elementLabel="allergen.displayName"
                        elementValue="uniqueId"
                        onSelect={(e) => this.onSelectElement(e, "allergens")}
                        onRemove={(e) => this.onRemoveElement(e, "allergens")}
                        items={get(currentPillbox, "allergens", [])}
                        placeholder={"Введите аллергию"}
                        label={
                            <>
                                <Desktop>Аллергологический анамнез:</Desktop>
                                <Tablet>Аллергол. анамнез.:</Tablet>
                            </>
                        }
                    />
                </Column>
            </Row>
        );
    }
}

export default AllergiesAndDiseases;
