import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../../navigations/AppNavigator';
import IconFontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';

type ReadFairytaleScreenProps = StackScreenProps<
  RootStackParams,
  'ReadFairytaleScreen'
>;

// const windowWidth: number = Dimensions.get('window').width;
const windowHeight: number = Dimensions.get('window').height;

const tmptaleData = [
  {
    id: 1,
    title: '흥부 놀부',
    content:
      '옛날 옛적에 가난한 동생 흥부와 부자 형 놀부가 살고 있었어요.\n흥부는 마음씨가 좋았지만 놀부는 욕심이 많았어요.\n흥부와 놀부의 아버지는 사이좋게 유산을 나눠가지라고 했어요.\n하지만, 욕심많은 놀부가 흥부의 몫까지 모두 가져가고 흥부를 내쫓았어요.\n그래서 흥부는 쫓겨나고 말았어요',
  },
];
export default function ReadFairytaleScreen({
  navigation,
  route,
}: ReadFairytaleScreenProps) {
  const [fairytaleTitle] = useState<string>(route.params.title);
  const [contentLines, setContentLines] = useState<string[]>([]);

  useEffect(() => {
    const lineChunks: string[] = tmptaleData[0].content.split('\n');
    const initialLines: string[] = lineChunks.slice(0, 2);
    setContentLines(initialLines);
    let lineIndex = 2;
    const interval = setInterval(() => {
      if (lineIndex < lineChunks.length) {
        const newLines = lineChunks.slice(lineIndex, lineIndex + 2);
        setContentLines(newLines);
        lineIndex += 2;
      } else {
        clearInterval(interval);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../../assets/bgImage/taleBackground.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.subContainer}>
          {/* 상단 */}
          <View style={styles.topContainer}>
            <View>
              <Text style={styles.fairytaleTitle}>{fairytaleTitle}</Text>
            </View>
            {/* X버튼 */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MainScreen');
              }}
              style={styles.xCircle}>
              <Text style={styles.xText}>
                <IconFontAwesome6
                  name="x"
                  size={windowHeight * 0.05}
                  color={'#A6D934'}
                />
              </Text>
            </TouchableOpacity>
          </View>
          {/* 중단 */}
          <View style={styles.middleContainer}>
            {/* 중단 좌측 */}
            <View style={styles.middleLeftContainer}>
              <TouchableOpacity onPress={() => {}} style={styles.xCircle}>
                <Text style={styles.xText}>
                  <IconAntDesign
                    name="caretleft"
                    size={windowHeight * 0.05}
                    color={'#A6D934'}
                  />
                </Text>
              </TouchableOpacity>
            </View>
            {/* 중단 중앙 */}
            <View style={styles.middleCenterContainer}>
              <Image
                source={require('../../../assets/images/taleImage/taleImageTest1.png')}
                style={styles.fairytaleImage}
              />
            </View>
            {/* 중단 우측 */}
            <View style={styles.middleRightContainer}>
              <TouchableOpacity onPress={() => {}} style={styles.xCircle}>
                <Text style={styles.xText}>
                  <IconAntDesign
                    name="caretright"
                    size={windowHeight * 0.05}
                    color={'#A6D934'}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* 하단 */}
          <View style={styles.bottomContainer}>
            <View style={styles.bottomTextContainer}>
              {contentLines.map((line, index) => (
                <Text key={index} style={styles.subtitles1}>
                  {line}
                </Text>
              ))}
            </View>
            {/* <View style={styles.bottomTextContainer}>
              <Text style={styles.subtitles1}>
                옛날 옛적에 가난한 동생 흥부와 부자 형 놀부가 살고 있었어요.
              </Text>
              <Text style={styles.subtitles2}>
                흥부는 마음씨가 좋았지만 놀부는 욕심이 많았어요.
              </Text>
            </View> */}
            <View style={styles.bottomScriptContainer}>
              <TouchableOpacity>
                <IconIonicons
                  name="document-text-outline"
                  size={windowHeight * 0.075}
                  color={'#000000'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    // justifyContent: 'center',
  },
  subContainer: {
    alignSelf: 'center',
    flex: 1,
    width: '95%',
  },
  topContainer: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fairytaleTitle: {
    fontSize: windowHeight * 0.055,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: windowHeight * 0.003,
  },
  xCircle: {
    justifyContent: 'center',
    borderRadius: windowHeight * 0.08 * 0.5,
    backgroundColor: 'white',
    width: windowHeight * 0.08,
    height: windowHeight * 0.08,
    borderColor: '#A6D934',
    borderWidth: 2,
  },
  xText: {
    textAlign: 'center',
  },
  middleContainer: {
    flex: 0.65,
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
  },
  middleLeftContainer: {
    flex: 0.1,
    alignItems: 'center',
  },
  middleCenterContainer: {
    flex: 0.8,
    alignItems: 'center',
  },
  fairytaleImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  middleRightContainer: {
    flex: 0.1,
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 0.2,
    flexDirection: 'row',
    alignSelf: 'center',
    width: '95%',
  },
  bottomTextContainer: {
    flex: 0.95,
    justifyContent: 'center',
  },
  subtitles1: {
    fontSize: windowHeight * 0.04,
    color: '#000000',
  },
  subtitles2: {
    fontSize: windowHeight * 0.04,
    color: '#000000',
    alignSelf: 'flex-end',
  },
  bottomScriptContainer: {
    flex: 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
