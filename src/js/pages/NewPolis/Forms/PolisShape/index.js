import React, { PureComponent } from "react";
import styled from "styled-components";
import { Radio } from "components/Radio";
import FileLoader from "components/FileLoader";
import { FormikFormField } from "wrappers/Formik/FormField";
import { editEachItem } from "actions/policy";
import { findError } from "pages/NewPolis/Forms/helper";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fontStyles } from "styledMixins/mixins";

const formElements = [
    {
        label: "Бумажный",
        value: "PAPER",
    },
    {
        label: "Электронный",
        value: "PLASTIC",
    },
];

const COMPONENT_NAME = "PolisShape";

const Text = styled.div`
    padding-bottom: 10px;
`;

const photoPopupInfo = {
    tooltip: "Требования к фотографии",
    title:
        "Требования к фотографии, размещаемой на бланке электронного полиса ОМС",
    text: (
        <Text>
            <p>
                Фотография, размещаемая на бланке электронного полиса ОМС,
                должна предоставляться в электронном виде и удовлетворять
                требованиям настоящего документа.
            </p>
            <p>
                Лицо должно быть изображено чётко, без искажений, строго в анфас
                без головного убора. Допускается представление фотографии в
                головных уборах гражданами, религиозные убеждения которых не
                позволяют показываться перед посторонними лицами без головных
                уборов. Головной убор при этом не должен скрывать овал лица
                и/или отображать тень на лицо.
            </p>
            <p>
                Мимика и выражение лица не должны искажать его черты,
                изображение должно размещаться на фотографии так, чтобы
                свободное от изображения поле над головой составляло 5 ±1 мм.
            </p>
            <p>
                На фотографии должна быть видна крупным планом голова и плечи,
                расстояние от подбородка до макушки (верхняя часть головы без
                учета волос) должно составлять 70-80 % высоты снимка, глаза
                должны быть открыты и волосы не должны заслонять их, не
                допускается наличие эффекта «красных глаз» на фотографии.
            </p>
            <p>
                Фотография должна быть сделана так, чтобы воображаемая
                горизонтальная линия между центрами глаз была параллельна
                верхней кромке снимка.
            </p>
            <p>
                Изображение на фотографии должно быть резким, четким, среднего
                контраста, с мягким светотеневым рисунком, задний фон должен
                быть светлее изображения лица, ровный, без полос, пятен и
                изображений посторонних предметов.
            </p>
            <p>
                Недопустима общая и в деталях размытость фотоснимка, наличие
                нерезких бликов в изображении глаз.
            </p>
            <p>
                При фотографировании в очках глаза на фотографии должны быть
                видны ясно и без отражения света. Линзы в очках не должны быть
                тонированными. Не следует снимать в очках с крупной оправой и не
                допускать, чтобы оправа закрывала какую-либо часть глаз.
            </p>
            <p>
                Фотография должна быть сделана не позднее, чем за 6 месяцев до
                ее предоставления, недопустимо использование фотографии в
                случае, если с момента фотосъемки произошли существенные
                изменения лица.
            </p>
            <p>На фотографии не должно быть других людей или предметов.</p>
            <p>
                Освещение должно быть равномерным, без теней или отражений на
                лице или фоне.
            </p>
            <p>
                Освещение и процесс фотографирования при съёмке должны
                обеспечивать цветовой баланс для правдивого отображения
                естественного цвета кожи.
            </p>
            <p>
                Фотография должна предоставляться в формате файла JPG/JPEG.
                Степень сжатия изображения должна обеспечивать наилучшее
                качество. Не допускается наличие видимых артефактов сжатия,
                наличие видимых глазом ступенчатых изменений цвета или наличие
                зубчатых границ в областях переходов цвета. Разрешение
                фотографии должно составлять 320 пикселей по ширине и 400
                пикселей по высоте, цветность - 256 градаций серого цвета.
            </p>
            <p>Размер файла должен быть не более 1 мегабайта.</p>
        </Text>
    ),
};

const signPopupInfo = {
    tooltip: "Требования к подписи",
    title: "Требования к собственноручной подписи в электронном виде",
    text: (
        <div>
            <p>
                Подпись гражданина, предназначенная для печати на бланке
                электронного полиса ОМС, должна предоставляться в электронном
                виде в формате JPG/JPEG и удовлетворять требованиям настоящего
                документа.
            </p>
            <p>
                Для подготовки файла с изображением собственноручной подписи
                необходимо получить от заявителя (гражданина, подпись которого
                подлежит размещению на бланке электронного полиса ОМС) подпись
                на бумажном носителе белого цвета. Подпись должна выполняться
                гелиевой ручкой черного или темно – синего цвета. Размер подписи
                не должен превышать 10*46 мм. Полученная собственноручная
                подпись должна быть отсканирована в электронный формат с
                разрешением не хуже 400 dpi.
            </p>
            <p>
                Допускается использование специализированных электронных
                планшетов для формирования электронного представления
                собственноручной подписи.
            </p>
            <p>
                Полученный файл с результатами сканирования или формирования
                подписи с помощью планшета должен быть преобразован в формат
                JPG/JPEG.
            </p>
            <p>
                Файл собственноручной фотографии для выпуска полиса ОМС должен
                иметь следующие характеристики:
            </p>
            <ul>
                <li>
                    тип файла – JPG/JPEG с разрешением 400 dpi. Степень сжатия
                    изображения должна обеспечивать наилучшее качество. Не
                    допускается наличие видимых артефактов сжатия, наличие
                    видимых глазом ступенчатых изменений цвета или наличие
                    зубчатых границ в областях переходов цвета;
                </li>
                <li>размеры – 736*160 пикселей;</li>
                <li>цветность – 256 градаций серого.</li>
            </ul>
            <p>Размер файла должен быть не более 1 мегабайта.</p>
        </div>
    ),
};

@connect()
class PolisShape extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        changeInitialValues: PropTypes.func.isRequired,
        setFormValues: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        fields: PropTypes.array.isRequired,
    };

    componentDidUpdate(prevProps) {
        const { fields, errors, values, setFormValues } = this.props;
        if (findError(fields, prevProps.errors) && !findError(fields, errors)) {
            this.nextStep();
        }
        if (!findError(fields, prevProps.errors) && findError(fields, errors)) {
            const { dispatch } = this.props;
            dispatch(editEachItem(COMPONENT_NAME, "checked", false));
            // dispatch(editEachItem("TemporaryCertificate", "isShow", false));
        }
        const buffData = {
            sign: "",
            photo: "",
        };
        if (
            JSON.stringify(values) !== JSON.stringify(prevProps.values) &&
            values.policyForm !== formElements[1].value
        ) {
            setFormValues(buffData);
        }
    }

    nextStep = () => {
        const { dispatch } = this.props;
        dispatch(editEachItem(COMPONENT_NAME, "checked", true));
        dispatch(editEachItem("TemporaryCertificate", "isShow", true));
    };

    render() {
        const { values } = this.props;
        return (
            <Wrapper>
                <FormikFormField
                    name={"policyForm"}
                    component={(props) => (
                        <Radio {...props} elements={formElements} />
                    )}
                />
                {values.policyForm === formElements[1].value && (
                    <>
                        <FileWrapper>
                            <FormikFormField
                                name={"photo"}
                                component={(props) => (
                                    <FileLoader
                                        {...props}
                                        required
                                        accept={"image/jpeg,image/jpg"}
                                        title={"Фотография"}
                                        infoPopupTooltip={
                                            photoPopupInfo.tooltip
                                        }
                                        infoPopupTitle={photoPopupInfo.title}
                                        infoPopupText={[photoPopupInfo.text]}
                                    />
                                )}
                            />
                        </FileWrapper>
                        {!values?.photo && (
                            <HintWrapper>
                                <Hint>Фотография отсутствует</Hint>
                            </HintWrapper>
                        )}
                        <FileWrapper>
                            <FormikFormField
                                name={"sign"}
                                component={(props) => (
                                    <FileLoader
                                        {...props}
                                        required
                                        accept={"image/jpeg,image/jpg"}
                                        title={"Скан-копия подписи"}
                                        infoPopupTooltip={signPopupInfo.tooltip}
                                        infoPopupTitle={signPopupInfo.title}
                                        infoPopupText={[signPopupInfo.text]}
                                    />
                                )}
                            />
                        </FileWrapper>
                        {!values?.sign && <Hint>Скан-подписи отсутствует</Hint>}
                    </>
                )}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    padding: 10px;
`;

const Hint = styled.div`
    padding: 5px 10px;
    border-radius: 5px;
    ${(props) =>
        fontStyles(props, { color: props.theme.colors.text.colorWhite })};
    background-color: ${(props) => props.theme.colors.notifications.warning};
    margin: ${(props) => (props.margin ? props.margin : 0)};
`;

const FileWrapper = styled.div`
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const HintWrapper = styled.div`
    margin-bottom: 10px;
`;

export default PolisShape;
