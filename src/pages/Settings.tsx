import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'src/hooks/useSelector';
import { setAppFecthInterval, setAppTheme } from 'src/modules/app/actions';
import { Themes, ThemeType } from 'src/theme';
import styled, { useTheme } from 'styled-components';
import { Picker } from '@react-native-picker/picker';
import { fetchIntervelSelector } from 'src/modules/app/selectors';

const SettingsPageComponent = (): JSX.Element => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch();
  const theme = useTheme()
  const fetchIntervel = useSelector(fetchIntervelSelector)
  const [showPicker, setShowPicker] = useState(false);

  const onValueChange = (key: string) => {
    let payload = { title: '1D', delay: 1000 * 60 * 60 * 24 }
    switch (key) {
      case "1D":
        payload = { title: '1D', delay: 1000 * 60 * 60 * 24 }
        break
      case "10m":
        payload = { title: '10m', delay: 1000 * 60 * 10 }
        break
      case "5m":
        payload = { title: '5m', delay: 1000 * 60 * 5 }
        break
      case "1m":
        payload = { title: '1m', delay: 1000 * 60 }
        break
      case "10s":
        payload = { title: '10s', delay: 1000 * 10 }
        break
      case "5s":
        payload = { title: '5s', delay: 1000 * 5 }
        break
    }
    dispatch(setAppFecthInterval(payload))
  }

  return (
    <Container>
      {Object.keys(Themes).map((themeType) => {
        return (
          <Button
            key={themeType}
            title={t(themeType)}
            onPress={() => {
              dispatch(setAppTheme(themeType as ThemeType));
            }}
          />
        );
      })}
      <Button
        title={`${t('refresh in')} ${t(fetchIntervel.title)}`}
        onPress={() => { setShowPicker(!showPicker) }}
      />
      <Button
        title={t(i18n.language)}
        onPress={() => {
          i18n.language === 'he'
            ? i18n.changeLanguage("en")
            : i18n.changeLanguage("he")
        }}
      />
      {showPicker &&
        <PickerContainer>
          <CloseContainer>
            <Button
              title={t('close')}
              onPress={() => { setShowPicker(false) }}
            />
          </CloseContainer>
          <Picker
            mode="dropdown" // Android only
            selectedValue={fetchIntervel.title}
            onValueChange={onValueChange}>
            <Picker.Item color={theme.colors.text} label={t('1 Day')} value={'1D'} />
            <Picker.Item color={theme.colors.text} label={t('10 Minutes')} value={'10m'} />
            <Picker.Item color={theme.colors.text} label={t('5 Minutes')} value={'5m'} />
            <Picker.Item color={theme.colors.text} label={t('1 Minute')} value={'1m'} />
            <Picker.Item color={theme.colors.text} label={t('10 Seconds')} value={'10s'} />
            <Picker.Item color={theme.colors.text} label={t('5 Seconds')} value={'5s'} />
          </Picker>
        </PickerContainer>}
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
`;

const PickerContainer = styled(View)`
  width: 100%;
  position: absolute;
  bottom: 0
`;

const CloseContainer = styled(View)`
  display: flex;
  align-items: flex-start;
  margin-left: 15px;
`;

const Title = styled(Text)`
  color: ${(props) => props.theme.colors.text};
`;

export const SettingsPage = memo(SettingsPageComponent);
