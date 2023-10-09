import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const colors = {
    BLUE:           "#0D6EFD",
    INDIGO:         "#6610F2",
    PURPLE:         "#6F42C1",
    PINK:           "#D63384",
    RED:            "#DC3545",
    ORANGE:         "#FD7E14",
    YELLOW:         "#FFC107",
    GREEN:          "#198754",
    TEAL:           "#20C997",
    CYAN:           "#0DCAF0",
    GRAY_100:       "#F8F9FA",
    GRAY_200:       "#E9ECEF",
    GRAY_300:       "#DEE2E6",
    GRAY_400:       "#CED4DA",
    GRAY_500:       "#ADB5BD",
    GRAY_600:       "#6C757D",
    GRAY_700:       "#495057",
    GRAY_800:       "#343A40",
    GRAY_900:       "#212529",
    WHITE:          "#FFF",
    BLACK:          "#000",
    PRIMARY:        "#0D6EFD",
    SECONDARY:      "#6C757D",
    SUCCESS:        "#198754",
    INFO:           "#0DCAF0",
    WARNING:        "#FFC107",
    DANGER:         "#DC3545",
    LIGHT:          "#F8F9FA",
    DARK:           "#212529",
    LIGHT_PRIMARY:  "#eef8ff",
    LIGHT_SECONDARY:"#f5f6f6",
    LIGHT_SUCCESS:  "#f0fdf6",
    LIGHT_INFO:     "#ecfdff",
    LIGHT_WARNING:  "#ffffea",
    LIGHT_DANGER:   "#fef2f2",
    BG:             "#F8F9FA",
};


export const sizes = {
    // global sizes
    base:           8,
    font:           14,
    radius:         6,
    padding:        10,

    // font sizes
    h1:             24,
    h2:             22,
    h3:             20,
    h4:             18,
    h5:             16,
    h6:             14,
    body1:          20,
    body2:          18,
    body3:          16,
    body4:          14,
    body5:          12,
    body6:          10,

    // app dimensions
    width,
    height
};

export const constant = {
    activeOpacity:  0.8,
};
