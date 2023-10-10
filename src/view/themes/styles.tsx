import { StyleSheet } from 'react-native';
import { colors, sizes } from './variables';

export const GeneralStyles = StyleSheet.create({
    modalWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalInner: {
        backgroundColor: colors.WHITE,
        borderRadius: 6,
        padding: 18,
        alignItems: 'center',
        elevation: 400,
    },
    modalAction: {
        color: colors.BLACK,
        padding: 6,
        fontSize: 16
    },
    modalClose: {
        color: colors.SECONDARY,
        padding: 6,
        fontSize: 14
    },
    modalBtn: {
        marginBottom: 10,
        color: colors.BLACK,
        minWidth: 200,
        height: 40,
        backgroundColor: colors.PRIMARY,
        padding: 6,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalBtnTxt: {
        color: colors.WHITE,
        fontSize: 16,
    },
    modalInput: {
        minWidth: 200,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: colors.WHITE,
        color: colors.GRAY_600,
        borderRadius: 7,
        elevation: 2,
        marginBottom: 10,
    },
    dots: {
        paddingHorizontal: 5,
    },
    jobBadge: {
        backgroundColor: colors.RED,
        fontSize: 10,
        lineHeight: 21,
        height: 22,
        borderStyle: 'solid', 
        borderWidth: 3, 
        borderColor: colors.WHITE,
    },
});




export const LoginStyles = StyleSheet.create({
    input: {
        height: 50,
        paddingHorizontal: 10,
        fontSize: sizes.body3,
        backgroundColor: colors.WHITE,
        color: colors.GRAY_600,
        borderWidth: 1,
        borderColor: colors.GRAY_300,
        borderRadius: sizes.radius,
        elevation: 3,
    },
    btn: {
        height: 50,
        backgroundColor: colors.PRIMARY,
        borderRadius: sizes.radius,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    btnText: {
        color: colors.WHITE,
        fontSize: sizes.body3,
        fontWeight: '400' 
    },
    title:{
        textAlign: 'center',
        marginBottom: 30,
        fontSize: sizes.h1,
    },
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wrapper: {
        backgroundColor: colors.BG,
        paddingVertical: sizes.padding,
        flex: 1,
        justifyContent: 'center',
    },
    inner: {
        paddingHorizontal: sizes.padding,
        flexGrow: 1, 
        justifyContent: 'center',
        gap: 10,
    },
});
