import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Svg, Path} from 'react-native-svg';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigations/AppNavigator';

type DetailScreenProps = StackScreenProps<RootStackParams, 'DetailScreen'>;
const {height, width} = Dimensions.get('window');

export default function DetailScreen({navigation}: DetailScreenProps) {
  const [paths, setPaths] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [isClearButtonClicked, setClearButtonClicked] = useState(false);

  const onTouchStart = event => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    setCurrentPath(`M${locationX.toFixed(0)},${locationY.toFixed(0)}`);
  };

  const onTouchMove = event => {
    if (currentPath === '') {
      // Ignore moves without a starting point (initial touch)
      return;
    }

    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;

    const newPoint = `L${locationX.toFixed(0)},${locationY.toFixed(0)}`;
    setCurrentPath(prevPath => prevPath + newPoint);
  };

  const onTouchEnd = () => {
    if (currentPath) {
      // Only save the path if there are points in it
      setPaths([...paths, currentPath]);
    }
    setCurrentPath('');
    setClearButtonClicked(false);
  };

  const handleClearButtonClick = () => {
    setPaths([]);
    setCurrentPath('');
    setClearButtonClicked(true);
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.svgContainer}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}>
        <Svg>
          {paths.map((item, index) => (
            <Path
              key={`path-${index}`}
              d={item}
              stroke={isClearButtonClicked ? 'transparent' : 'blue'}
              fill={'transparent'}
              strokeWidth={3}
              strokeLinejoin={'round'}
              strokeLinecap={'round'}
            />
          ))}
          <Path
            d={currentPath}
            stroke={isClearButtonClicked ? 'transparent' : 'black'}
            fill={'transparent'}
            strokeWidth={3}
            strokeLinejoin={'round'}
            strokeLinecap={'round'}
          />
        </Svg>
      </View>
      <TouchableOpacity
        style={styles.clearButton}
        onPress={handleClearButtonClick}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    height: height * 0.7,
    width,
    borderColor: 'black',
    backgroundColor: 'yellow',
    borderWidth: 1,
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
