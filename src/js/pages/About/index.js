import React, { PureComponent } from "react";
import { Link, withRouter } from "react-router-dom";
import Row from "containers/Row";
import styled from "styled-components";
import { fontStyles } from "styledMixins/mixins";
import service_img from "images/about/about_1.jpg";
import aim_img from "images/about/about_2.jpg";
import capabilities_img from "images/about/about_3.jpg";
import list_img_1 from "images/about/about_additional_1.jpg";
import list_img_2 from "images/about/about_additional_6.jpg";
import list_img_3 from "images/about/about_additional_7.jpg";
import list_img_4 from "images/about/about_additional_3.jpg";
import list_img_5 from "images/about/about_additional_4.jpg";
import list_img_6 from "images/about/about_additional_5.jpg";
import list_img_7 from "images/about/about_additional_8.jpg";
import list_img_8 from "images/about/about_additional_2.jpg";
import ScrollBar from "components/ScrollBar";
import { LK_MENU_ELEMENTS } from "config/menu";
import { RESPONSIVE } from "config/consts";

@withRouter
class AboutPage extends PureComponent {
    render() {
        return (
            <Wrapper>
                <Row fullPage>
                    <ScrollBar noScrollX={true}>
                        <PageWrapper>
                            <ServiceBlock>
                                <ServiceHeading>Сервис</ServiceHeading>
                                <ServiceImage>
                                    <img src={service_img} alt={"service"} />
                                </ServiceImage>
                                <ServiceTextWrapper>
                                    <ServiceText>
                                        <Paragraph>
                                            Московский городской Фонд
                                            обязательного медицинского
                                            страхования представляет Сервис для
                                            всех, кто застрахован и получает
                                            медицинские услуги по полису
                                            обязательного медицинского
                                            страхования (ОМС) в городе Москве. С
                                            помощью Сервиса производится
                                            информирование застрахованных лиц об
                                            оказанной им за счет средств ОМС
                                            медицинской помощи. Помимо этого,
                                            Сервис является интерактивным
                                            помощником в планировании и
                                            отслеживании мероприятий, связанных
                                            с заботой о здоровье и ведением
                                            здорового образа жизни.
                                        </Paragraph>
                                    </ServiceText>
                                </ServiceTextWrapper>
                            </ServiceBlock>

                            <AimBlock>
                                <AimHeadingWrapper>
                                    <AimNumber>1</AimNumber>
                                    <AimTitleWrapper>
                                        <AimTitle>цели</AimTitle>
                                        <AimSubtitle>создания</AimSubtitle>
                                    </AimTitleWrapper>
                                </AimHeadingWrapper>
                                <AimImage>
                                    <img src={aim_img} alt="aim" />
                                </AimImage>
                                <AimList>
                                    <ListItem>
                                        Информирование об оказанных услугах и их
                                        стоимости
                                    </ListItem>
                                    <ListItem>
                                        Контроль данных прикрепления, полиса ОМС
                                        и связь со страховой медицинской
                                        организацией
                                    </ListItem>
                                    <ListItem>
                                        Информирование об оказанных
                                        несовершеннолетнему подопечному услугах
                                        и их стоимости
                                    </ListItem>
                                    <ListItem>
                                        Подача заявления на выпуск нового полиса
                                        ОМС
                                    </ListItem>
                                    <ListItem>
                                        Ведение данных о состоянии здоровья и
                                        имеющихся хронических заболеваниях
                                    </ListItem>
                                </AimList>
                            </AimBlock>

                            <CapabilitiesBlock>
                                <CapabilitiesHeadingWrapper>
                                    <CapabilitiesInfoWrapper>
                                        <CapabilitiesTitleWrapper>
                                            <CapabilitiesTitle>
                                                возможности
                                            </CapabilitiesTitle>
                                            <CapabilitiesSubtitle>
                                                сервиса
                                            </CapabilitiesSubtitle>
                                        </CapabilitiesTitleWrapper>
                                        <CapabilitiesNumber>
                                            2
                                        </CapabilitiesNumber>
                                    </CapabilitiesInfoWrapper>
                                </CapabilitiesHeadingWrapper>
                                <CapabilitiesImage>
                                    <img
                                        src={capabilities_img}
                                        alt={"capabilities"}
                                    />
                                </CapabilitiesImage>
                                <CapabilitiesText>
                                    <Paragraph>
                                        Став пользователями Сервиса, Вы будете
                                        своевременно узнавать о реальной
                                        стоимости предоставленной вам
                                        медицинской помощи. Проверяя
                                        корректность записей об оказанных
                                        услугах (раздел «Мои услуги»), Вы
                                        поможете нам выполнять качественную
                                        оценку работы лечебных учреждений и
                                        контролировать расходы Фонда.
                                    </Paragraph>
                                    <Paragraph>
                                        Среди возможностей Сервиса доступна
                                        опция «Календарь», с помощью которой Вы
                                        можете самостоятельно планировать
                                        посещения врача, ставить напоминания о
                                        приемах лекарств, диспансеризациях,
                                        исследованиях и других связанных со
                                        здоровьем мероприятиях.
                                    </Paragraph>
                                    <Paragraph>
                                        В разделе &quot;Мое лечение&quot; удобно
                                        вести архив результатов
                                        лабораторно-инструментальных
                                        исследований, протоколов приемов врачей
                                        и выписок из стационаров, а также
                                        результатов диспансеризации.
                                    </Paragraph>
                                    <Paragraph>
                                        Тем, кто ведет постоянные наблюдения за
                                        своим здоровьем (например, будущие
                                        мамы), понравится опция «Дневник
                                        здоровья». Он поможет наблюдать за
                                        давлением и пульсом, температурой,
                                        весом, уровнем сахара и холестерина, а
                                        также контролировать потребленные
                                        калории.
                                    </Paragraph>
                                    <Paragraph>
                                        Если Вы поменяли документ удостоверяющий
                                        личность, или нашли в нем неточность,
                                        либо просто желаете получить полис ОМС
                                        единого образца мы предлагаем, не выходя
                                        из дома, воспользоваться функцией подачи
                                        заявления на получение полиса ОМС в
                                        разделе «Заявление на полис». Вы сможете
                                        не только выбрать страховую медицинскую
                                        организацию, подобрать удобный пункт
                                        выдачи полисов (в филиале страховой
                                        медицинской организации(СМО) или в
                                        многофункциональном центре), но и
                                        скачать временное свидетельство на
                                        период перевыпуска полиса.
                                    </Paragraph>
                                    <Paragraph>
                                        Благодаря опции «Обращение в СМО», Вы
                                        можете оперативно направить в адрес
                                        страховой организации вопрос, отзыв или
                                        жалобу по электронной почте, выбрав
                                        соответствующий тип обращения.
                                    </Paragraph>
                                    <Paragraph>
                                        Проявите заботу о своем здоровье уже
                                        сегодня!
                                    </Paragraph>
                                </CapabilitiesText>
                            </CapabilitiesBlock>

                            <SectionsBlock>
                                <SectionsHeadingWrapper>
                                    <SectionsNumber>3</SectionsNumber>
                                    <SectionTitleWrapper>
                                        <SectionsTitle>разделы</SectionsTitle>
                                        <SectionsSubtitle>
                                            сайта
                                        </SectionsSubtitle>
                                    </SectionTitleWrapper>
                                </SectionsHeadingWrapper>
                                <SectionsList>
                                    <Column>
                                        <Link
                                            to={
                                                LK_MENU_ELEMENTS.SERVICES_PAGE
                                                    .path
                                            }
                                        >
                                            <SectionsItem>
                                                <ItemInfo right>
                                                    <InfoTitle>
                                                        Оказанные медицинские
                                                        услуги
                                                    </InfoTitle>
                                                    <InfoList>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Перечень оказанных
                                                            услуг, включая
                                                            стоимость
                                                        </Paragraph>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Подтверждение/опровержение
                                                            факта оказания
                                                            услуги
                                                        </Paragraph>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Оценка качества и
                                                            доступности
                                                            медицинской помощи
                                                        </Paragraph>
                                                    </InfoList>
                                                </ItemInfo>
                                                <ItemImage>
                                                    <img
                                                        src={list_img_3}
                                                        alt=""
                                                    />
                                                </ItemImage>
                                            </SectionsItem>
                                        </Link>
                                        <Link
                                            to={
                                                LK_MENU_ELEMENTS.MEDICINES_PAGE
                                                    .path
                                            }
                                        >
                                            <SectionsItem>
                                                <ItemInfo right>
                                                    <InfoTitle>
                                                        Мои лекарства
                                                    </InfoTitle>
                                                    <InfoList>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Создание и ведение
                                                            личной таблетницы и
                                                            таблетницы для
                                                            подопечных (до 5)
                                                        </Paragraph>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Проверка
                                                            совместимости
                                                            лекарственных
                                                            средств
                                                        </Paragraph>
                                                    </InfoList>
                                                </ItemInfo>
                                                <ItemImage>
                                                    <img
                                                        src={list_img_6}
                                                        alt=""
                                                    />
                                                </ItemImage>
                                            </SectionsItem>
                                        </Link>
                                        <Link
                                            to={
                                                LK_MENU_ELEMENTS.CALENDAR_PAGE
                                                    .path
                                            }
                                        >
                                            <SectionsItem>
                                                <ItemInfo right>
                                                    <InfoTitle>
                                                        Личный медицинский
                                                        календарь
                                                    </InfoTitle>
                                                    <InfoList>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Планирование и
                                                            отслеживание
                                                            событий, связанных
                                                            со здоровьем
                                                        </Paragraph>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Настройка
                                                            напоминаний о
                                                            наступлении событий
                                                        </Paragraph>
                                                    </InfoList>
                                                </ItemInfo>
                                                <ItemImage>
                                                    <img
                                                        src={list_img_5}
                                                        alt=""
                                                    />
                                                </ItemImage>
                                            </SectionsItem>
                                        </Link>
                                        <Link
                                            to={
                                                LK_MENU_ELEMENTS.MEDICINES_PAGE
                                                    .path
                                            }
                                        >
                                            <SectionsItem>
                                                <ItemInfo right>
                                                    <InfoTitle>
                                                        Профиль подопечного
                                                    </InfoTitle>
                                                    <InfoList>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Доступ ко всем
                                                            перечисленным выше
                                                            разделам и функциям
                                                            сервиса по профилю
                                                            своего
                                                            несовершеннолетнего
                                                            подопечного
                                                        </Paragraph>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Дополнительно:
                                                            ведение календаря
                                                            прививок с
                                                            возможностью скачать
                                                            для предоставления
                                                            врачу
                                                        </Paragraph>
                                                    </InfoList>
                                                </ItemInfo>
                                                <ItemImage>
                                                    <img
                                                        src={list_img_8}
                                                        alt=""
                                                    />
                                                </ItemImage>
                                            </SectionsItem>
                                        </Link>
                                    </Column>
                                    <Column>
                                        <Link
                                            to={LK_MENU_ELEMENTS.MAIN_PAGE.path}
                                        >
                                            <SectionsItem>
                                                <ItemImage>
                                                    <img
                                                        src={list_img_2}
                                                        alt=""
                                                    />
                                                </ItemImage>
                                                <ItemInfo>
                                                    <InfoTitle>
                                                        Мои данные
                                                    </InfoTitle>
                                                    <InfoList>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Личные данные
                                                        </Paragraph>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Жизненно-важная
                                                            информация
                                                        </Paragraph>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Полис ОМС
                                                        </Paragraph>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            МО прикрепления
                                                        </Paragraph>
                                                    </InfoList>
                                                </ItemInfo>
                                            </SectionsItem>
                                        </Link>
                                        <Link
                                            to={
                                                LK_MENU_ELEMENTS.POLIS_PAGE.path
                                            }
                                        >
                                            <SectionsItem>
                                                <ItemImage>
                                                    <img
                                                        src={list_img_4}
                                                        alt=""
                                                    />
                                                </ItemImage>
                                                <ItemInfo>
                                                    <InfoTitle>
                                                        Заявление на полис
                                                    </InfoTitle>
                                                    <InfoList>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Подача заявления на
                                                            оформление
                                                            электронного или
                                                            бумажного полиса
                                                        </Paragraph>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Выбор страховой
                                                            медицинской
                                                            организации и пункта
                                                            выдачи полиса
                                                        </Paragraph>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Скачивание
                                                            временного
                                                            свидетельства в
                                                            электронном виде
                                                        </Paragraph>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Получение
                                                            увeдомления о
                                                            готовности полиса
                                                        </Paragraph>
                                                    </InfoList>
                                                </ItemInfo>
                                            </SectionsItem>
                                        </Link>
                                        <Link
                                            to={
                                                LK_MENU_ELEMENTS.TREATMENT_PAGE
                                                    .path
                                            }
                                        >
                                            <SectionsItem>
                                                <ItemImage>
                                                    <img
                                                        src={list_img_1}
                                                        alt=""
                                                    />
                                                </ItemImage>
                                                <ItemInfo>
                                                    <InfoTitle>
                                                        Мое лечение
                                                    </InfoTitle>
                                                    <InfoList>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Загрузка изображений
                                                            с результатами
                                                            исследований и
                                                            приемов врачей
                                                        </Paragraph>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Управление личным
                                                            архивом загруженных
                                                            медицинских
                                                            документов
                                                        </Paragraph>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Возможность
                                                            переслать скан-копию
                                                            документа с
                                                            результатами
                                                            исследований врачу
                                                            для консультации
                                                        </Paragraph>
                                                    </InfoList>
                                                </ItemInfo>
                                            </SectionsItem>
                                        </Link>
                                        <Link
                                            to={
                                                LK_MENU_ELEMENTS.PREGNANCY_PAGE
                                                    .path
                                            }
                                        >
                                            <SectionsItem>
                                                <ItemImage>
                                                    <img
                                                        src={list_img_7}
                                                        alt=""
                                                    />
                                                </ItemImage>
                                                <ItemInfo>
                                                    <InfoTitle>
                                                        Беременность
                                                    </InfoTitle>
                                                    <InfoList>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Контроль
                                                            беременности на всех
                                                            сроках, включая
                                                            ведение дневника
                                                            веса, давления и
                                                            глюкозы
                                                        </Paragraph>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Учет осложнений и
                                                            совместимости
                                                            лекарств Общение с
                                                            врачом женской
                                                            консультации
                                                            Календарь пройденных
                                                            и запланированных
                                                            медицинских
                                                            мероприятий
                                                        </Paragraph>
                                                        <Paragraph
                                                            size={"12px"}
                                                        >
                                                            Полезная информация
                                                        </Paragraph>
                                                    </InfoList>
                                                </ItemInfo>
                                            </SectionsItem>
                                        </Link>
                                    </Column>
                                </SectionsList>
                            </SectionsBlock>
                        </PageWrapper>
                    </ScrollBar>
                </Row>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    background-color: #fff;
    height: 100%;
`;

const PageWrapper = styled.div`
    width: 1050px;
    margin: 0 auto;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: 100%;
    }
`;

const ServiceBlock = styled.div`
    position: relative;
    margin-bottom: 200px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        margin-bottom: 100px;
    }
`;

const ServiceHeading = styled.div`
    display: inline-flex;
    ${(props) => fontStyles(props, { font: "bold", size: "96px" })};
    background: ${(props) => props.theme.userTheme.backgroundColor};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 70px;
    margin-left: 20px;
    position: relative;
    z-index: 1;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: 100%;
        justify-content: center;
        font-size: 60px;
    }
`;

const ServiceImage = styled.div`
    width: 800px;
    height: 530px;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 40px;
    z-index: 0;

    img {
        width: 100%;
        height: 100%;
        transform: scale(1.1);
    }

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        opacity: 0.5;
    }
`;

const ServiceTextWrapper = styled.div`
    position: relative;
    z-index: 1;
    margin-top: 60px;
    background-color: rgba(0, 0, 0, 0.05);
    width: 200%;
    margin-left: -145%;
    display: flex;
    justify-content: flex-end;
    padding: 40px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: 100%;
        margin-left: 0;
        justify-content: center;
        padding: 20px;
        background-color: rgba(255, 255, 255, 0.5);
    }
`;

const ServiceText = styled.div`
    width: 510px;
`;

const AimBlock = styled.div`
    position: relative;
`;

const AimHeadingWrapper = styled.div`
    background-color: rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: flex-end;
    width: 200%;
    margin-left: 60%;
    position: relative;
    z-index: 1;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        margin-left: 30%;
    }
`;

const AimNumber = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.userTheme.color,
            size: "288px",
        })};
    line-height: 0.7;
    margin-left: -70px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        font-size: 200px;
        margin-left: -60px;
    }
`;

const AimTitle = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "black",
            size: "37px",
            color: props.theme.colors.text.colorBlack,
        })};
`;

const AimSubtitle = styled.div`
    ${(props) =>
        fontStyles(props, {
            size: "18px",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 10px;
`;

const AimImage = styled.div`
    width: 555px;
    height: 505px;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    z-index: 0;
    top: 100px;
    left: 0;

    img {
        height: 100%;
    }

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        opacity: 0.5;
    }
`;

const AimTitleWrapper = styled.div``;

const AimList = styled.div`
    width: 420px;
    float: right;
    margin-top: 100px;

    @media all and (max-width: 1400px) {
        width: 350px;
        margin-right: 100px;
    }

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        position: relative;
        z-index: 1;
        width: 100%;
        padding: 20px;
        background-color: rgba(255, 255, 255, 0.5);
        margin-top: 30px;
    }
`;

const ListItem = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            size: "14px",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 50px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        margin-bottom: 20px;
    }
`;

const CapabilitiesBlock = styled.div`
    margin-top: 500px;
    position: relative;
`;

const CapabilitiesHeadingWrapper = styled.div`
    background-color: rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: flex-end;
    width: 200%;
    margin-left: -170%;
    justify-content: flex-end;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        position: relative;
        z-index: 1;
        margin-left: -135%;
    }
`;

const CapabilitiesInfoWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    margin-right: -110px;
`;

const CapabilitiesTitleWrapper = styled.div`
    text-align: right;
`;

const CapabilitiesNumber = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.userTheme.color,
            size: "288px",
        })};
    line-height: 0.7;
    margin-left: 0;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        font-size: 200px;
    }
`;

const CapabilitiesTitle = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "black",
            size: "37px",
            color: props.theme.colors.text.colorBlack,
        })};

    @media all and (max-width: 1500px) {
        font-size: 30px;
    }

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        font-size: 24px;
    }
`;

const CapabilitiesSubtitle = styled.div`
    ${(props) =>
        fontStyles(props, {
            size: "18px",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 10px;
`;

const CapabilitiesImage = styled.div`
    width: 500px;
    height: 644px;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 100px;

    img {
        height: 100%;
    }

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        opacity: 0.5;
    }
`;

const CapabilitiesText = styled.div`
    margin-top: 100px;
    width: 490px;
    margin-left: 20px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        position: relative;
        z-index: 1;
        width: 100%;
        padding: 20px;
        margin-top: 50px;
    }
`;

const SectionsBlock = styled.div`
    margin-top: 200px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        margin-top: 100px;
    }
`;

const SectionsHeadingWrapper = styled.div`
    background-color: rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: flex-end;
    width: 200%;
    margin-left: 60%;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        margin-left: 40%;
    }
`;

const SectionsNumber = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.userTheme.color,
            size: "288px",
        })};
    line-height: 0.7;
    margin-left: -120px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        font-size: 200px;
    }
`;

const SectionsTitle = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "black",
            size: "37px",
            color: props.theme.colors.text.colorBlack,
        })};
`;

const SectionsSubtitle = styled.div`
    ${(props) =>
        fontStyles(props, {
            size: "18px",
            color: props.theme.colors.text.colorBlack,
        })};
    margin-bottom: 10px;
`;

const SectionTitleWrapper = styled.div``;

const SectionsList = styled.div`
    display: flex;
    margin-top: 100px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        margin-top: 50px;
        flex-wrap: wrap;
    }
`;

const SectionsItem = styled.div`
    display: flex;
    margin-bottom: 70px;
    border-radius: 18px;
    border: 1px solid transparent;
    transition: border ${(props) => props.theme.animations.transition};
    cursor: pointer;

    &:hover {
        border: 1px solid ${(props) => props.theme.userTheme.color};
    }

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        flex-direction: column-reverse;
        align-items: center;
        justify-content: center;
    }
`;

const ItemImage = styled.div`
    width: 170px;
    height: 250px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #eee;
    margin: 10px;
    flex: 0 0 auto;

    img {
        height: 100%;
    }
`;

const ItemInfo = styled.div`
    margin-top: 30px;
    margin-right: 20px;
    margin-left: 20px;
    text-align: ${(props) => (props.right ? "right" : "left")};
`;

const InfoTitle = styled.div`
    ${(props) =>
        fontStyles(props, {
            font: "bold",
            color: props.theme.userTheme.color,
            size: props.theme.fonts.sizes.normal,
        })};
    margin-bottom: 20px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        text-align: center;
    }
`;

const InfoList = styled.div`
    @media all and (max-width: ${RESPONSIVE.tablet}) {
        text-align: center;
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
        margin-bottom: 0;
    }
`;

const Column = styled.div`
    width: 50%;
    margin: 0 5px;

    @media all and (max-width: ${RESPONSIVE.tablet}) {
        width: 100%;
    }
`;

export default AboutPage;
