import React from 'react';
import { StyleSheet } from 'react-native';
import { colors, sizes } from '../../themes/variables';

export const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        padding: sizes.padding,
        backgroundColor: colors.BG
    },
    topWrapper: {
        paddingVertical: 8,
        marginBottom: 2,
        gap: 8,
    },
    topBtn: {
        borderStyle: 'solid',
        borderWidth: 1,
        height: 50,
        borderRadius: sizes.radius,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBtnText: { fontSize: sizes.body3, fontWeight: '500' },
    topBtnPrimary: { backgroundColor: colors.LIGHT_PRIMARY, borderColor: colors.PRIMARY },
    topBtnTextPrimary: { color: colors.PRIMARY },
    topBtnSuccess: { backgroundColor: colors.LIGHT_SUCCESS, borderColor: colors.SUCCESS },
    topBtnTextSuccess: { color: colors.SUCCESS },
    botWrapper: {
        paddingVertical: 8,
        marginBottom: 2,
        gap: 6
    },
    botTitle: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    botTitleText: {
        color: colors.PRIMARY,
        fontWeight: '400',
        fontSize: sizes.h4,
    },
    botTitleBadge: {
        backgroundColor: colors.PRIMARY,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    botTitleBadgeText: {
        color: colors.WHITE,
        fontWeight: '500',
        fontSize: sizes.h5,
    },
    botJobs: {
        borderRadius: sizes.radius,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.GRAY_500,
        flexDirection: 'column',
        backgroundColor: colors.WHITE
    },
    botHr: {
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: colors.GRAY_500,
    },
    botJob: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    botJobDisabled: { opacity: 0.6, backgroundColor: colors.GRAY_200 },
    botJobText: { fontSize: sizes.body3,  color: colors.GRAY_900 },
    botJobCount: { color: colors.DANGER, fontSize: sizes.body2 },  
    botJobTextDisabled: {  color: colors.BLACK },
    botJobCountDisabled: { color: colors.GRAY_800 },  
})