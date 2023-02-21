import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import VideoPost from 'src/components/VideoPost';
import { dataSelector, fetchIntervelSelector } from 'src/modules/app/selectors';
import styled from 'styled-components';
import { getData } from 'src/fetcher/dataFetcher';
import { useTheme } from 'styled-components';
import Icon from 'react-native-easy-icon';
import { useInterval } from '../hooks/useInterval'
import { DataRow } from 'src/types/dataRow';

const HomePageComponent = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dataFetched = useSelector(dataSelector);
  const [refreshing, setRefreshing] = useState(false);
  const { delay } = useSelector(fetchIntervelSelector)

  useEffect(() => {
    !dataFetched && getData()
  }, [])

  useInterval(async () => {
    console.log("\x1b[33m  file: Home.tsx:30  useInterval  useInterval")
    await getData()
  }, delay)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData().then(() => {
      setRefreshing(false);
    })
  }, []);

  if (!dataFetched) return <ActivityIndicator />
  return (
    <Container>
      <TitleContainer>
        <Title>Shay Piano Guides</Title>
        <Icon onPress={() => onRefresh()} type="material" name="refresh" size={30} color={theme.colors.blue} />
      </TitleContainer>
      <ScrollView refreshControl={
        <RefreshControl
          title="Pull to refresh"
          titleColor={theme.colors.text}
          tintColor={theme.colors.text}
          refreshing={refreshing}
          onRefresh={onRefresh} />}>
        {dataFetched && dataFetched.map((item: DataRow) => <VideoPost key={"0" + item.id} videoData={item} />)}
      </ScrollView>
    </Container >
  );
};

const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 0px 15px;
`;

const TitleContainer = styled(View)`
  display: flex;
  flex-direction: row; 
  justify-content: space-between;
`;

const Title = styled(Text)`
  font-weight: bold;
  font-size: 18px;
  color: ${(props) => props.theme.colors.text};
  margin-top: 10px;
`;

export const HomePage = memo(HomePageComponent);
