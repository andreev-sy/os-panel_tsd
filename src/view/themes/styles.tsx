import { StyleSheet } from 'react-native';
import { colors } from './variables';

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


export const ScanStyles = StyleSheet.create({
    rowWrapper: {
        flex: 1, 
        flexDirection: 'column', 
        paddingHorizontal: 5, 
        paddingVertical: 5
    },
    area_row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.WHITE,
        padding: 10,
        borderRadius: 7,
        elevation: 2,
        marginHorizontal: 5,
        marginVertical: 5,
    },
    container: {
        padding: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    // top: {
    //     flex: 1, 
    //     height: '100%',
    //     marginBottom: 10
    // },
    bottom: {
        height: 120,
    },
    rowSwitch: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'flex-end',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    label: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        paddingHorizontal: 10,
        fontSize: 16,
        flexBasis: '48%',
        backgroundColor: colors.WHITE,
        color: colors.GRAY_600,
        borderRadius: 7,
        elevation: 2,
    },
});

export const ControlStyles = StyleSheet.create({
    input: {
        height: 50,
        paddingHorizontal: 10,
        fontSize: 16,
        flexBasis: '48%',
        backgroundColor: colors.WHITE,
        color: colors.GRAY_600,
        borderRadius: 7,
        elevation: 2,
    },
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tableWrapper: {
        paddingVertical: 20,
    },
    wrapper: {
        padding: 10,
    }
});


export const LoginStyles = StyleSheet.create({
    input: {
        height: 50,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: colors.WHITE,
        color: colors.GRAY_600,
        borderRadius: 7,
        elevation: 2,
    },
    title:{
        textAlign: 'center',
        marginBottom: 30,
        fontSize: 24,
    },
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wrapper: {
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        gap: 10,
    },
   
});
