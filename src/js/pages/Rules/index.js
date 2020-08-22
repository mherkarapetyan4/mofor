import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import Row from "containers/Row";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import ScrollBar from "components/ScrollBar";
import Column from "containers/Column";
import FlatPopup from "components/FlatPopup";
import { Desktop, Tablet } from "wrappers/responsive";
import { RESPONSIVE } from "config/consts";

@withRouter
class RulesPage extends PureComponent {
    render() {
        return (
            <FlatPopup
                title={
                    "Правила для безопасной работы с Сервисом застрахованных лиц"
                }
            >
                <Row fullPage>
                    <Column fraction={12} paddings={0}>
                        <Desktop>
                            <ScrollBar>{this.renderContent()}</ScrollBar>
                        </Desktop>
                        <Tablet>{this.renderContent()}</Tablet>
                    </Column>
                </Row>
            </FlatPopup>
        );
    }

    renderContent = () => {
        return (
            <PageWrapper>
                <Paragraph>
                    Никому не сообщайте свою конфиденциальную информацию (логин
                    и пароль) для доступа к Сервису. Не сохраняйте Вашу
                    конфиденциальную информацию (логин и пароль) в текстовых
                    файлах на компьютере, в мобильном устройстве, на других
                    электронных носителях информации, т.к. при этом существует
                    риск кражи и компрометации персональных идентификаторов.
                </Paragraph>
                <Paragraph>
                    Используйте на Вашем компьютере (мобильном устройстве), с
                    которого Вы осуществляете доступ к Сервису, современное
                    лицензированное антивирусное программное обеспечение с
                    безупречной репутацией и следите за его регулярным
                    обновлением.
                </Paragraph>
                <Paragraph>
                    Регулярно выполняйте антивирусную проверку на своем
                    компьютере («Безопасность» на мобильном устройстве) в целях
                    своевременного обнаружения вредоносных программ их
                    блокирования и удаления, в том числе и спам рассылок.
                </Paragraph>
                <Paragraph>
                    Своевременно проверяйте и устанавливайте обновления к
                    операционной системе Вашего компьютера (мобильного
                    устройства), рекомендуемые компанией-производителем в целях
                    устранения выявленных в нем уязвимостей с учетом выявленных
                    рисков.
                </Paragraph>
                <Paragraph>
                    Завершение работы с Сервисом выполняется пользователем путем
                    выбора соответствующего пункта меню «Выход».
                </Paragraph>
                <Paragraph>
                    Старайтесь не обращаться к Сервису с не доверенных (не
                    принадлежащих лично Вам компьютеров (мобильных устройств).
                    По возможности избегайте не защищенных подключений к сети
                    Интернет при работе с Сервисом (например: интернет-кафе,
                    киосках, публичных WI-FI сетях), так как в данном случае
                    увеличивается риск кражи Ваших конфиденциальных данных и
                    вирусной атаки на ваше устройство.
                </Paragraph>
                <Paragraph>
                    В случае некорректной работы Сервиса обратитесь на горячую
                    линию МГФОМС&nbsp;
                    <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={`//www.mgfoms.ru/feedback/feedback-hotline`}
                    >
                        http://www.mgfoms.ru/feedback/feedback-hotline
                    </a>
                    .
                </Paragraph>
                <Paragraph>
                    В случае если у Вас неожиданно перестала работать SIM-карта
                    мобильного телефона, следует оперативно обратиться к своему
                    оператору сотовой связи, с целью уточнения информации по
                    ней, при необходимости произвести блокировку абонентского
                    номера и замену SIM -карты.
                </Paragraph>
                <Paragraph>
                    При работе с Сервисом постарайтесь ограничить возможность
                    просмотра экрана Вашего компьютера (мобильного устройства)
                    мобильного телефона посторонними (не допущенными к
                    ознакомлению с данной информацией) лицами.
                </Paragraph>
                <Paragraph>
                    Оператор Сервиса принимает необходимые и достаточные меры по
                    защите персональных данных пользователей Сервиса:
                </Paragraph>
                <Paragraph>
                    <ul>
                        <li>
                            обработка персональных данных осуществляется с
                            соблюдением требований конфиденциальности
                            персональных данных, установленных ст. 7
                            Федерального закона «О персональных данных», в
                            соответствии с принятыми мерами предусмотренных ч. 1
                            ст. 19 Федерального закона от 27.07.2016 № 152-ФЗ «О
                            персональных данных» (далее – Закон);
                        </li>
                        <li>
                            на основании ч. 1 ст. 9 Закона субъект персональных
                            данных (далее – пользователь сервиса) принимает
                            решение о предоставлении его персональных данных
                            оператору Сервиса и дает согласие на их обработку
                            своей волей и в своем интересе;
                        </li>
                        <li>
                            на основании ч. 1 ст. 6 Закона обработка
                            персональных данных пользователя сервиса
                            осуществляется оператором Сервиса с согласия
                            субъекта персональных данных на обработку его
                            персональных данных;
                        </li>
                        <li>
                            в соответствии с ч. 5 ст. 18 Закона оператор Сервиса
                            использует базы данных, находящиеся на территории
                            Российской Федерации;
                        </li>
                        <li>
                            подтверждением получения согласия от субъекта
                            персональных данных является выполненная процедура
                            регистрации и предоставления пользователю
                            возможности использовать возможности Сервиса в своих
                            целях.
                        </li>
                    </ul>
                </Paragraph>
                <Paragraph>
                    Однако, оператор Сервиса не несет ответственности за
                    нарушение конфиденциальности, целостности и доступности
                    предоставленной пользователем информации, если оно возникло
                    по вине пользователя в вследствие несоблюдения им настоящих
                    Правил.
                </Paragraph>
            </PageWrapper>
        );
    };
}

const PageWrapper = styled.div`
    width: 1000px;

    @media all and (max-width: 1366px) {
        width: 100%;
    }

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: 100%;
    }
`;

const Paragraph = styled.div`
    ${(props) =>
        fontStyles(props, {
            color: props.theme.colors.text.colorBlack,
            size: props.size || "14px",
        })};
    line-height: ${(props) => props.theme.fonts.lineHeight.big};
    margin-bottom: 15px;

    &:last-child {
        margin-bottom: 10px;
    }
`;

export default RulesPage;