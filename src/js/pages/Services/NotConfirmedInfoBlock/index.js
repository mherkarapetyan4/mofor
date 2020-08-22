import React, { PureComponent } from "react";
import TextBlock from "components/TextBlock";
import styled from "styled-components";
import { LK_MENU_ELEMENTS } from "config/menu";
import { Link, withRouter } from "react-router-dom";

@withRouter
class NotConfirmedInfoBlock extends PureComponent {
    render() {
        return (
            <Wrapper>
                <TextBlock>
                    Просьба указывать достоверные сведения. Подтверждение факта
                    неоказания Вам медицинской услуги может служить основанием
                    проведения проверки использования средств ОМС медицинской
                    организацией. Предупреждаем об ответственности за
                    предоставление заведомо ложных сведений!
                </TextBlock>
                <TextBlock>
                    Если вы не укажете суть Вашего обращения, то обращение
                    рассмотрено не будет. При этом отправка обращения возможна
                    только при подтвержденном адресе эл. почты в разделе
                    <Link to={LK_MENU_ELEMENTS.MAIN_PAGE.path}>
                        {" "}
                        Мои контакты
                    </Link>
                </TextBlock>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div``;

export default NotConfirmedInfoBlock;
