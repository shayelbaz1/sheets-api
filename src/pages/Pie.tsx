import React, { memo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { useSelector } from 'react-redux';
import { dataSelector } from 'src/modules/app/selectors';
import { DataRow } from 'src/types/dataRow';
import styled from 'styled-components';
const sliceColor = ['#B9F3E4', '#FFB84C', '#F16767', '#A459D1']

function formatLevels(dataFetched: any) {
    if(!dataFetched) return []
    const levelsArray = dataFetched.map((i: DataRow) => +i.level) // [0,0,1,1]
    const levels = levelsArray.reduce((acc: any, level: number) => {
        acc[level] = (acc[level] || 0) + 1;
        return acc;
    }, {});

    let result = Object.entries(levels).map(([level, amount]) => ({ level: parseInt(level), amount, color: sliceColor[parseInt(level) % sliceColor.length] }));

    return result
}

const PieComponent = (): JSX.Element => {

    const dataFetched = useSelector(dataSelector);
    const levels = formatLevels(dataFetched)
    const series: number[] = levels.map((i) => i.amount) as number[]
    const sliceColor = levels.map((i) => i.color)

    return (
        <Scroll>
            <Container>
                <PieContainer>
                    <PieChart
                        widthAndHeight={250}
                        series={series}
                        sliceColor={sliceColor}
                        doughnut={true}
                        coverRadius={0.45}
                        coverFill={'#FFF'}
                    />
                </PieContainer>
                <List>
                    {levels.map((i, idx) =>
                        <Row key={idx}>
                            <Square style={{ backgroundColor: sliceColor[i.level % sliceColor.length] }} />
                            <Desc>{`Level ${i.level}\nAmount ${i.amount}`}</Desc>
                        </Row>
                    )}
                </List>
            </Container>
        </Scroll>
    );
}

const Scroll = styled(ScrollView)`
    flex: 1;
    background-color: ${(props) => props.theme.colors.background};
`;

const Container = styled(View)`
    flex: 1;
`;

const PieContainer = styled(View)`
    padding: 15px 0px;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const List = styled(View)`
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Row = styled(View)`
    width: 50%;
    align-items: center;
    flex-direction: row;
    padding-left: 15px;
    padding-vertical: 10px
`;

const Desc = styled(Text)`
  color: ${(props) => props.theme.colors.text};
`;

const Square = styled(View)`
    margin-right: 10px;
    padding: 5px;
`;

export const Pie = memo(PieComponent);