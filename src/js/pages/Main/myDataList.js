import IconPlate from "components/IconPlate";
import PersonalIcon from "icons/mydata/PersonalIcon";
import PersonalInfoForm from "./PersonalInfoForm";
import DescriptionIcon from "icons/mydata/DescriptionIcon";
import OMSDataForm from "./OMSDataForm";
import RecentIcon from "icons/mydata/RecentIcon";
import MOGeneralForm from "./MOGeneralForm";
import MOStomatologyForm from "./MOStomatologyForm";
import ContactsIcon from "icons/mydata/ContactsIcon";
import ContactsForm from "./ContactsForm";
import AssignmentIcon from "icons/mydata/AssignmentIcon";
import DoctorForm from "./DoctorForm";
import React from "react";

const myDataList = [
    {
        id: 0,
        title: "Персональная информация",
        icon: <IconPlate title={<PersonalIcon color={"#fff"} />} />,
        value: <PersonalInfoForm />,
    },
    {
        id: 1,
        title: "Данные полиса ОМС",
        icon: <IconPlate title={<DescriptionIcon color={"#fff"} />} />,
        value: <OMSDataForm />,
    },
    {
        id: 3,
        title: "МО прикрепления (общий)",
        icon: <IconPlate title={<RecentIcon color={"#fff"} />} />,
        value: <MOGeneralForm />,
    },
    {
        id: 4,
        title: "МО прикрепления (стоматология)",
        icon: <IconPlate title={<RecentIcon color={"#fff"} />} />,
        value: <MOStomatologyForm />,
    },
    {
        id: 5,
        title: "Мои контакты",
        icon: <IconPlate title={<ContactsIcon color={"#fff"} />} />,
        value: <ContactsForm />,
    },
    {
        id: 6,
        title: "Расскажи о себе врачу",
        icon: <IconPlate title={<AssignmentIcon color={"#fff"} />} />,
        value: <DoctorForm />,
    },
];

export default myDataList;
