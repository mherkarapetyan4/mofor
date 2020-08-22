import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import Heading from "containers/Heading";
import PageHeading from "components/PageHeading";
import { LK_MAP_ELEMENTS } from "config/menu";
import Row from "containers/Row";
import Column from "containers/Column";
import { default as YMap } from "components/Map";
import styled from "styled-components";
import FormField from "components/FormField";
import { RESPONSIVE } from "config/consts";

@withRouter
class Contacts extends PureComponent {
    data = [
        {
            label: "Адрес",
            value: "127473, г. Москва, ул. Достоевского, д. 31, корп. 1А",
        },
        { label: "Телефон", value: "8 (495) 952-93-21" },
        { label: "Факс", value: "8 (495) 958-18-08" },
    ];

    render() {
        return (
            <>
                <Heading>
                    <PageHeading title={LK_MAP_ELEMENTS.CONTACTS_PAGE.name} />
                </Heading>
                <Row fullHeight>
                    <Column fraction={12}>
                        <ContentWrapper>
                            <ContactsInfo>
                                {this.data.map((item, i) => (
                                    <Item key={i}>
                                        <FormField
                                            label={item.label}
                                            disabled={true}
                                            value={item.value}
                                            type={"textarea"}
                                        />
                                    </Item>
                                ))}
                            </ContactsInfo>
                            <MapWrapper>
                                <YMap />
                            </MapWrapper>
                        </ContentWrapper>
                    </Column>
                </Row>
            </>
        );
    }
}

const Item = styled.div`
    margin-bottom: 16px;
    width: 100%;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

const ContactsInfo = styled.div`
    display: flex;
    width: 100%;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        flex-wrap: wrap;
    }
`;

const MapWrapper = styled.div`
    flex: 1;
    width: 100%;
    padding-bottom: 20px;

    @media all and (max-width: ${RESPONSIVE.mobile}) {
        height: 300px;
    }
`;

export default Contacts;
