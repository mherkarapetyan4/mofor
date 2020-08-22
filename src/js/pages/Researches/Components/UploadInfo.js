import React, { PureComponent } from "react";
import WidgetBlock from "components/WidgetBlock";
import PreviewImage from "components/PreviewImage";
// import PropTypes from 'prop-types';
import styled from "styled-components";
import UnorderedList from "components/UnorderedList";

const listData = [
    {
        text: "В одно исследование можно загрузить не более 10 файлов",
    },
    {
        text: "Каждый файл должен быть размером не более 1 мегабайта",
    },
    {
        text:
            "Имя файла не должно превышать 50 символов вместе с расширением файла",
    },
    {
        text: "Загрузить можно файлы с расширениями .jpg, .jpeg, .pdf",
    },
    {
        text:
            "Красным цветом показаны файлы, не прошедшие проверку по критериям размера, либо длины названия",
    },
    {
        text:
            "Зеленым цветом показаны файлы, прошедшие проверку и готовые к загрузке",
    },
];

class UploadInfo extends PureComponent {
    render() {
        return (
            <WidgetBlock title={"Информация по загрузке"}>
                <ListWrapper>
                    <UnorderedList data={listData} />
                </ListWrapper>
                <PreviewWrapper>
                    <PreviewImage />
                </PreviewWrapper>
            </WidgetBlock>
        );
    }
}

const PreviewWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
`;

const ListWrapper = styled.div`
    margin-bottom: 16px;
`;

export default UploadInfo;
