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
};


export const sizes = {
    // global sizes
    base:           8,
    font:           14,
    radius:         6,
    padding:        24,

    // font sizes
    h1:             30,
    h2:             22,
    h3:             16,
    h4:             14,
    body1:          30,
    body2:          22,
    body3:          16,
    body4:          14,
    body5:          12,

    // app dimensions
    width,
    height
};

export const fonts = {
    h1:     { fontSize: sizes.h1,      color: colors.BLACK, textTransform: 'none',  lineHeight: 36 },
    h2:     { fontSize: sizes.h2,      color: colors.BLACK, textTransform: 'none',  lineHeight: 30 },
    h3:     { fontSize: sizes.h3,      color: colors.BLACK, textTransform: 'none',  lineHeight: 22 },
    h4:     { fontSize: sizes.h4,      color: colors.BLACK, textTransform: 'none',  lineHeight: 22 },
    body1:  { fontSize: sizes.body1,   color: colors.BLACK, textTransform: 'none',  lineHeight: 36 },
    body2:  { fontSize: sizes.body2,   color: colors.BLACK, textTransform: 'none',  lineHeight: 30 },
    body3:  { fontSize: sizes.body3,   color: colors.BLACK, textTransform: 'none',  lineHeight: 22 },
    body4:  { fontSize: sizes.body4,   color: colors.BLACK, textTransform: 'none',  lineHeight: 22 },
    body5:  { fontSize: sizes.body5,   color: colors.BLACK, textTransform: 'none',  lineHeight: 22 },
};

export const btns = {
    primary:    { borderWidth: 1, borderStyle: 'solid', borderColor: colors.PRIMARY,    borderRadius: sizes.radius, backgroundColor: colors.PRIMARY,    color: colors.WHITE, textTransform: 'none' },
    success:    { borderWidth: 1, borderStyle: 'solid', borderColor: colors.SUCCESS,    borderRadius: sizes.radius, backgroundColor: colors.SUCCESS,    color: colors.WHITE, textTransform: 'none' },
    warning:    { borderWidth: 1, borderStyle: 'solid', borderColor: colors.WARNING,    borderRadius: sizes.radius, backgroundColor: colors.WARNING,    color: colors.WHITE, textTransform: 'none' },
    danger:     { borderWidth: 1, borderStyle: 'solid', borderColor: colors.DANGER,     borderRadius: sizes.radius, backgroundColor: colors.DANGER,     color: colors.WHITE, textTransform: 'none' },
    info:       { borderWidth: 1, borderStyle: 'solid', borderColor: colors.INFO,       borderRadius: sizes.radius, backgroundColor: colors.INFO,       color: colors.WHITE, textTransform: 'none' },
    light:      { borderWidth: 1, borderStyle: 'solid', borderColor: colors.LIGHT,      borderRadius: sizes.radius, backgroundColor: colors.LIGHT,      color: colors.BLACK, textTransform: 'none' },
    dark:       { borderWidth: 1, borderStyle: 'solid', borderColor: colors.DARK,       borderRadius: sizes.radius, backgroundColor: colors.DARK,       color: colors.WHITE, textTransform: 'none' },
    secondary:  { borderWidth: 1, borderStyle: 'solid', borderColor: colors.SECONDARY,  borderRadius: sizes.radius, backgroundColor: colors.SECONDARY,  color: colors.WHITE, textTransform: 'none' },
    white:      { borderWidth: 1, borderStyle: 'solid', borderColor: colors.WHITE,      borderRadius: sizes.radius, backgroundColor: colors.WHITE,      color: colors.BLACK, textTransform: 'none' },
    black:      { borderWidth: 1, borderStyle: 'solid', borderColor: colors.BLACK,      borderRadius: sizes.radius, backgroundColor: colors.BLACK,      color: colors.WHITE, textTransform: 'none' },
};

export const btns_text = {
    sm: { padding: 6,  fontSize: sizes.body5, lineHeight: 22 },
    md: { padding: 10, fontSize: sizes.body4, lineHeight: 22 },
    lg: { padding: 16, fontSize: sizes.body3, lineHeight: 22 },
};

const theme = { colors, sizes, fonts, btns, btns_text };

export default theme;