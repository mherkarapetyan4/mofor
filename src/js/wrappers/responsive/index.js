import React from "react";
import Responsive from "react-responsive";
import { RESPONSIVE } from "config/consts";

export const Desktop = (props) => (
    <Responsive {...props} minWidth={RESPONSIVE.pc} />
);
export const Tablet = (props) => (
    <Responsive {...props} maxWidth={RESPONSIVE.tablet} />
);
export const Mobile = (props) => (
    <Responsive {...props} maxWidth={RESPONSIVE.mobile} />
);
