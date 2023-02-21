import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, ScrollView, RefreshControl, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import VideoPost from 'src/components/VideoPost';
import { dataSelector, fetchIntervelSelector } from 'src/modules/app/selectors';
import styled from 'styled-components';
import { getData } from 'src/fetcher/dataFetcher';
import { useTheme } from 'styled-components';
import Icon from 'react-native-easy-icon';
import { useInterval } from '../hooks/useInterval'
import { DataRow } from 'src/types/dataRow';
import Swiper from 'react-native-deck-swiper';

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
          title={t('Pull to refresh')}
          titleColor={theme.colors.text}
          tintColor={theme.colors.text}
          refreshing={refreshing}
          onRefresh={onRefresh} />}>
        {dataFetched && dataFetched.map((item: DataRow) => <VideoPost key={"0" + item.id} videoData={item} />)}
        <View style={styles.container}>
          <Swiper
            cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
            renderCard={(card) => {
              return (
                <View style={styles.card}>
                  <Text style={styles.text}>{card}</Text>
                </View>
              )
            }}
            cardStyle={{ top: 50, left: 25, right: 0, bottom: 0, alijusgnItems: 'center' }}
            onSwiped={(cardIndex) => { console.log(cardIndex) }}
            onSwipedAll={() => { console.log('onSwipedAll') }}
            cardIndex={0}
            backgroundColor='none'
            stackSize={3}>
          </Swiper>
        </View>
      </ScrollView>
    </Container >
  );
};

const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  margin-right: 15px;
  margin-left: 15px;
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

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#F5FCFF"
    height: 500
  },
  card: {
    // flex: 1,
    height: 400,
    width: '90%',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});

export const HomePage = memo(HomePageComponent);
