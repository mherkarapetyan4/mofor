import backgroundOne from "images/backgrounds/background1.jpg";
import backgroundTwo from "images/backgrounds/background_flowers.png";
import backgroundThree from "images/backgrounds/background_bird_one.png";
import backgroundFour from "images/backgrounds/background_bird_two.png";
import backgroundFive from "images/backgrounds/background_palm.png";
import backgroundSix from "images/backgrounds/background_spruce.png";
import backgroundSeven from "images/backgrounds/background_splash.png";
import backgroundEight from "images/backgrounds/background_cloud.png";
import backgroundNine from "images/backgrounds/background_balloon.png";

import thumbTwo from "images/backgrounds/background_flowers_thumb.jpg";
import thumbThree from "images/backgrounds/background_bird_one_thumb.jpg";
import thumbFour from "images/backgrounds/background_bird_two_thumb.jpg";
import thumbFive from "images/backgrounds/background_palm_thumb.jpg";
import thumbSix from "images/backgrounds/background_spruce_thumb.jpg";
import thumbSeven from "images/backgrounds/background_splash_thumb.jpg";
import thumbEight from "images/backgrounds/background_cloud_thumb.jpg";
import thumbNine from "images/backgrounds/background_balloon_thumb.jpg";

const headerHeight = "60px";
const footerHeight = "60px";

const theme = {
    menu: {
        width: "300px",
        height: "100vh",
        textColor: "rgba(255,255,255,.7)",
        textColorHover: "rgba(255,255,255,1)",
    },
    logo: {
        color: "#fff",
        opacity: 1,
        height: headerHeight,
    },
    header: {
        height: headerHeight,
        mobileHeight: headerHeight - 10,
    },
    footer: {
        height: footerHeight,
    },
    authBackground: `url(${backgroundOne})`,
    backgrounds: {
        // imageOne: `url(${backgroundOne})`,
        imageOne: ``,
        imageTwo: `url(${backgroundTwo})`,
        imageThree: `url(${backgroundThree})`,
        imageFour: `url(${backgroundFour})`,
        imageFive: `url(${backgroundFive})`,
        imageSix: `url(${backgroundSix})`,
        imageSeven: `url(${backgroundSeven})`,
        imageEight: `url(${backgroundEight})`,
        imageNine: `url(${backgroundNine})`,
    },
    backgroundsThumbs: {
        thumbImageOne: "",
        thumbImageTwo: `url(${thumbTwo})`,
        thumbImageThree: `url(${thumbThree})`,
        thumbImageFour: `url(${thumbFour})`,
        thumbImageFive: `url(${thumbFive})`,
        thumbImageSix: `url(${thumbSix})`,
        thumbImageSeven: `url(${thumbSeven})`,
        thumbImageEight: `url(${thumbEight})`,
        thumbImageNine: `url(${thumbNine})`,
    },
    textOpacity: {
        normal: 1,
        half: 0.5,
        zero: 0,
    },
    colors: {
        background: {
            white: "#fff",
            gradientOne: "#149AE2",
            gradientTwo: "#35AD97",
            gradientThree: "#252525",
            gradientFour: "#6F0000",
            gradientFive: "#ce912e",
            gradientSix: "#89A02D",
            gradientSeven: "#1B273E",
            gradientEight: "#7A006E",
            gradientNine: "#41278C",
        },
        notifications: {
            success: "#219653",
            warning: "#E49723",
            alert: "#B63737",
            regular: "#149AE2",
            dark: "#4D4D4D",
        },
        grades: {
            plainColors: {
                levelZero: "#149AE2",
                levelOne: "#BBFF2B",
                levelTwo: "#fff52b",
                levelThree: "#ffb72b",
                levelFour: "#ff5e2b",
                levelFive: "#ff2b2b",
            },
            separate: {
                levelOne: {
                    start: "#00F59D",
                    finish: "#BBFF2B",
                },
                levelTwo: {
                    start: "#a7f500",
                    finish: "#fff52b",
                },
                levelThree: {
                    start: "#f5ed00",
                    finish: "#ffb72b",
                },
                levelFour: {
                    start: "#f5bf00",
                    finish: "#ff5e2b",
                },
                levelFive: {
                    start: "#f57600",
                    finish: "#ff2b2b",
                },
            },
            levelOne:
                "linear-gradient(30deg, rgba(0,245,157,1) 0%, rgba(187,255,43,1) 100%)",
            levelTwo:
                "linear-gradient(30deg, rgba(167,245,0,1) 0%, rgba(255,246,43,1) 100%)",
            levelThree:
                "linear-gradient(30deg, rgba(245,236,0,1) 0%, rgba(255,183,43,1) 100%)",
            levelFour:
                "linear-gradient(30deg, rgba(245,191,0,1) 0%, rgba(255,94,43,1) 100%)",
            levelFive:
                "linear-gradient(30deg, rgba(245,118,0,1) 0%, rgba(255,43,43,1) 100%)",
        },
        plainColors: {
            primary: "#149AE2",
            violet: "#A54E9C",
            limeGreen: "#6AFF36",
            limeYellow: "#FFD336",
        },
        gradients: {
            gradientOne:
                "linear-gradient(30deg, rgba(102,153,255,1) 0%, rgba(53,173,151,1) 100%)",
            gradientTwo:
                "linear-gradient(30deg, rgba(118,28,109,1) 0%, rgba(53,85,173,1) 100%)",
            gradientThree:
                "linear-gradient(30deg, rgba(136,12,116,1) 0%, rgba(0,212,255,1) 100%)",
            gradientFour:
                "linear-gradient(30deg, rgba(136,12,116,1) 0%, rgba(255,231,102,1) 100%)",
            gradientFive:
                "linear-gradient(30deg, rgba(12,136,106,1) 0%, rgba(80,0,72,1) 100%)",
            gradientSix:
                "linear-gradient(30deg, rgba(12,136,106,1) 0%, rgba(0,56,80,1) 100%)",
            gradientSeven:
                "linear-gradient(30deg, rgba(242,245,61,1) 0%, rgba(46,92,0,1) 100%)",
        },
        text: {
            colorBlack: "#000",
            colorWhite: "#fff",
            colorAlert: "#EB5757",
            colorSuccess: "",
        },
        borderColor: "rgba(0,0,0,.12)",
        borderColorHover: "rgba(0,0,0,.3)",
        borderInGradientColor: "rgba(255,255,255,.12)",
    },
    animations: {
        transition: ".2s ease-in-out",
    },
    fonts: {
        family: {
            gotham: `'GothamProRRegular', Arial, 'sans-serif'`,
            gothamMedium: `'GothamProRMedium', Arial, 'sans-serif'`,
            gothamBold: `'GothamProRBold', Arial, 'sans-serif'`,
            gothamBlack: `'GothamProRBlack', Arial, 'sans-serif'`,
            newsCondensed: `'NewsCondensed', Arial, 'sans-serif'`,
        },
        sizes: {
            tiny: "10px",
            small: "12px",
            normal: "14px",
            big: "16px",
            large: "18px",
            plate: "26px",
        },
        lineHeight: {
            normal: "1.25",
            big: "1.5",
        },
    },
    shadows: {
        blurred: "0 6px 10px rgba(0,0,0,.1)",
        crisp: "0 2px 2px rgba(0,0,0,.15)",
    },
    paddings: {
        normal: "16px",
    },
};

export default theme;
