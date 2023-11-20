import React, { useState, useEffect, useCallback } from 'react';
import createInstance from '../../helpers/AxiosInstance';
import { View, Text, Vibration, StyleSheet, TouchableOpacity } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { colors, constant, sizes, sounds } from '../themes/variables';
import Dialog from 'react-native-dialog';
import { useFocusEffect } from '@react-navigation/native';


function Notification({style}) {
    const [noty, setNoty] = useState({});
    const [visible, setVisible] = useState(false);
    const api = createInstance();
 
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                  const response = await api.get(`/notification/message/`)
                  if(response.data?.text?.length > 0){
                      setNoty(response.data)
                      Vibration.vibrate(constant.vibroTimeShort)
                      sounds.beep_info.play()
                      setVisible(response.data)
                      api.get(`/notification/send/?id=${response.data.id}`)
      
                      setTimeout( () => {
                          setVisible(false)
                          setNoty({})
                      }, constant.notyTime)
                  }
                } catch (error) {
                  console.log('Error occurred', error);
                }
              };
      
              const interval = setInterval(fetchData, constant.notyDelay);
              return () => clearInterval(interval);
        }, [])
    );

    return (
        <View style={ !visible ? styles.empty : [styles.wrapper, style] }>
            {
                visible ?
                        <View style={styles.inner}>
                            <View style={styles.top}>
                                <Text style={styles.topTitle}>Уведомление</Text>
                                <Text style={styles.topDate}>{noty.date}</Text>
                            </View>
                            <Text style={styles.contentText}>{noty.text}</Text>
                            <View style={styles.bottom}>
                                <TouchableOpacity
                                    style={styles.bottomBtn}
                                    activeOpacity={constant.activeOpacity}
                                    accessibilityRole="button"
                                    onPress={() => {
                                        setVisible(false)
                                        setNoty({})
                                    }}
                                >
                                    <Text style={styles.bottomBtnText}>Скрыть</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.bottomBtn}
                                    activeOpacity={constant.activeOpacity}
                                    accessibilityRole="button"
                                    onPress={() => {
                                        api.get(`/notification/update/?id=${noty.id}`)
                                        setVisible(false)
                                        setNoty({})
                                    }}
                                >
                                    <Text style={[styles.bottomBtnText, styles.bottomBtnTextRead]}>Прочитано</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    : ''
            }
        </View>
    );
}


export const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 3,
        padding: sizes.padding,
    },
    inner: {
        borderRadius: sizes.radius,
        backgroundColor: colors.WHITE,
        padding: sizes.padding,
        paddingBottom: 0,
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 9 },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
    },
    empty: { width: 0, height: 0 },
    top: { flexDirection: 'row', gap: 6, alignItems: 'flex-end', marginBottom: 3, },
    topTitle: { color: colors.GRAY_700, fontSize: sizes.body4, fontWeight: '500', },
    topDate: { color: colors.GRAY_600, fontSize: sizes.body5, fontWeight: '500', },
    contentText: { color: colors.GRAY_600, fontSize: sizes.body4, fontWeight: '400', },
    bottom: { flexDirection: 'row', gap: 10, justifyContent: 'flex-end', alignItems: 'flex-end' },
    bottomBtn: { paddingVertical: 10, paddingHorizontal: 5, },
    bottomBtnText: { color: colors.GRAY_600, fontSize: sizes.body4, fontWeight: '400', },
    bottomBtnTextRead: { color: colors.GRAY_800, fontWeight: '500', },
});


export default Notification;


