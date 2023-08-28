import { StyleSheet } from 'react-native';
import { colors } from './variables';

export const ScanAreaStyles = StyleSheet.create({
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