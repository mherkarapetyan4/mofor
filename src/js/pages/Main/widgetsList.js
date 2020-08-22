import DispanserWidget from "components/Widgets/DispanserWidget";
import ChartWidget from "components/Widgets/ChartWidget";
import PillboxWidget from "components/Widgets/PillboxWidget";
import AllergiesWidget from "components/Widgets/AllergiesWidget";
import BiometWidget from "components/Widgets/BiometWidget";
import CalendarWidget from "components/Widgets/CalendarWidget";
import NotificationWidget from "components/Widgets/NotificationWidget";
import LastActionsWidget from "components/Widgets/LastActionsWidget";
import React from "react";
import VaccinationWidget from "components/Widgets/VaccinationWidget";
import ResearchIcon from "components/Icons/ResearchIcon";
import PressureIcon from "components/Icons/PressureIcon";
import GlucoseIcon from "components/Icons/GlucoseIcon";
import WeightIcon from "components/Icons/WeightIcon";
import PillsIcon from "components/Icons/pillbox/PillsIcon";
import AllergicIcon from "icons/incompatibilities/AllergicIcon";
import CalendarIcon from "components/Icons/CalendarIcon";
import MeteoIcon from "icons/MeteoIcon";
import NotificationIcon from "icons/NotificationIcon";
import LastActionIcon from "icons/LastActionIcon";
import VaccinationIcon from "icons/VaccinationIcon";

const widgetList = [
    {
        id: "Dispensary",
        title: "Диспансеризация",
        widget: <DispanserWidget />,
        icon: <ResearchIcon color={"#fff"} />,
    },
    {
        id: "Pressure",
        title: "Давление",
        widget: <ChartWidget type={"pressure"} />,
        icon: <PressureIcon color={"#fff"} />,
    },
    {
        id: "Glucose",
        title: "Глюкоза",
        widget: <ChartWidget type={"glucose"} />,
        icon: <GlucoseIcon color={"#fff"} />,
    },
    {
        id: "Weight",
        title: "Вес",
        widget: <ChartWidget type={"weight"} />,
        icon: <WeightIcon color={"#fff"} />,
    },
    {
        id: "Pillbox",
        title: "Таблетница",
        widget: <PillboxWidget />,
        icon: <PillsIcon color={"#fff"} />,
    },
    {
        id: "Allergies",
        title: "Аллергии",
        widget: <AllergiesWidget />,
        icon: <AllergicIcon color={"#fff"} />,
    },
    {
        id: "Meteo",
        title: "Биометеорологический прогноз",
        widget: <BiometWidget />,
        icon: <MeteoIcon color={"#fff"} />,
    },
    {
        id: "Calendar",
        title: "Календарь",
        widget: <CalendarWidget />,
        icon: <CalendarIcon color={"#fff"} />,
    },
    {
        id: "Notifications",
        title: "Уведомления",
        widget: <NotificationWidget />,
        icon: <NotificationIcon color={"#fff"} />,
    },
    {
        id: "LastActions",
        title: "Последние действия",
        widget: <LastActionsWidget />,
        icon: <LastActionIcon color={"#fff"} />,
    },
    {
        id: "Vaccination",
        title: "Вакцинации",
        widget: <VaccinationWidget />,
        icon: <VaccinationIcon color={"#fff"} />,
    },
];

export default widgetList;
