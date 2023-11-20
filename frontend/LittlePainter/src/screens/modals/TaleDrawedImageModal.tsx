/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {handleIsTaleDrawedImageModalVisible} from '../../redux/slices/user/user';
import {myFairyImage} from '../../apis/mypage/mypageApi';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

export type TaleDrawedImageModalProps = {
  taleId: number;
  title: string;
  // pictureTitle: string;
  // pictureBorderURI: string;
  // pictureOriginImageUri: string;
  // pictureExplanation: string;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TaleDrawedImageModal = (props: TaleDrawedImageModalProps) => {
  const dispatch = useDispatch();
  const isTaleDrawedImageModalVisible = useSelector(
    (state: RootState) => state.user.isTaleDrawedImageModalVisible,
  );
  const [taleId] = useState<number>(props.taleId);
  const [title] = useState<string>(props.title);
  const [taleDrawData, setTaleDrawData] = useState([]);
  const [pageNum, setPageNum] = useState<number>(0);
  const [urlGif, setUrlGif] = useState<string>('');
  const [urlWork, setUrlWork] = useState<string>('');

  async function getMyFairyImage() {
    try {
      const response = await myFairyImage(taleId);
      if (response.status === 200) {
        setTaleDrawData(response.data);
        setUrlGif(response.data[0].urlGif);
        setUrlWork(response.data[0].urlWork);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleChangeUrlGif() {
    setUrlGif(taleDrawData[pageNum].urlGif);
    setUrlWork(taleDrawData[pageNum].urlWork);
  }

  useEffect(() => {
    if (taleDrawData.length) {
      handleChangeUrlGif();
    }
  }, [pageNum]);

  useEffect(() => {
    getMyFairyImage();
  }, []);
  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={isTaleDrawedImageModalVisible}
        onRequestClose={() => {
          dispatch(handleIsTaleDrawedImageModalVisible(false));
        }}>
        <Pressable
          style={styles.centeredView}
          onPress={() => {
            dispatch(handleIsTaleDrawedImageModalVisible(false));
          }}>
          <Pressable
            style={styles.modalView}
            onPress={() => {
              dispatch(handleIsTaleDrawedImageModalVisible(true));
            }}>
            {/* 최상단 */}
            <View style={styles.modalTop}>
              <View style={styles.modalTopLeft} />
              <View style={styles.modalTopMiddle}>
                <Text style={styles.modalTitleText}>
                  우리가 그린 "{title}" 동화 그림이에요!
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalTopRight}
                onPress={() =>
                  dispatch(handleIsTaleDrawedImageModalVisible(false))
                }>
                <Text style={styles.modalCloseX}>X</Text>
              </TouchableOpacity>
            </View>
            {/* 중단 */}
            <View style={styles.modalMiddle}>
              <View style={styles.modalSubMiddle}>
                {/* 중단 좌측 버튼 */}
                <View style={styles.modalMiddleLeft}>
                  {pageNum === 0 ? null : (
                    <TouchableOpacity
                      onPress={() => {
                        setPageNum(pageNum - 1);
                      }}
                      style={styles.xCircle}>
                      <Text style={styles.xText}>
                        <IconAntDesign
                          name="caretleft"
                          size={windowHeight * 0.05}
                          color={'#A6D934'}
                        />
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                {/* 중단 이미지 출력 */}
                <View style={styles.modalMiddleMiddle}>
                  {urlGif !== '' ? (
                    <Image style={styles.imageView} source={{uri: urlGif}} />
                  ) : null}
                </View>
                {/* 중단 우측 버튼 */}
                <View style={styles.modalMiddleRight}>
                  {pageNum === taleDrawData.length - 1 ? null : (
                    <TouchableOpacity
                      onPress={() => {
                        setPageNum(pageNum + 1);
                      }}
                      style={styles.xCircle}>
                      <Text style={styles.xText}>
                        <IconAntDesign
                          name="caretright"
                          size={windowHeight * 0.05}
                          color={'#A6D934'}
                        />
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
            {/* 하단 */}
            <View style={styles.modalBottom}>
              <ScrollView>
                <View onStartShouldSetResponder={() => true}>
                  {/* <Text style={styles.contentText}>메롱</Text> */}
                </View>
              </ScrollView>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    // borderRadius: 20,
    width: windowWidth * 1,
    height: windowHeight * 1,
    justifyContent: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  modalTop: {
    flex: 0.1,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  modalTopLeft: {
    flex: 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTopMiddle: {
    flex: 0.84,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalTitleText: {
    textAlign: 'center',
    color: 'black',
    fontSize: windowWidth * 0.025,
    fontWeight: '600',
  },
  modalTopRight: {
    flex: 0.08,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  modalCloseX: {
    textAlign: 'center',
    fontSize: windowWidth * 0.03,
  },
  modalMiddle: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSubMiddle: {
    flexDirection: 'row',
    flex: 1,
  },
  modalMiddleLeft: {
    flex: 0.07,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalMiddleMiddle: {
    flex: 0.86,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalMiddleRight: {
    flex: 0.07,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    resizeMode: 'contain',
    height: windowHeight * 1 * 0.6,
    width: windowWidth * 1 * 0.8,
  },
  modalBottom: {
    flex: 0.1,
    alignItems: 'center',
  },
  contentText: {
    flexWrap: 'wrap',
    fontSize: windowWidth * 0.02,
    textAlign: 'center',
    color: 'black',
  },
  xCircle: {
    justifyContent: 'center',
    borderRadius: windowHeight * 0.07 * 0.5,
    width: windowHeight * 0.07,
    height: windowHeight * 0.07,
    borderColor: '#A6D934',
    borderWidth: 2,
  },
  xText: {
    textAlign: 'center',
  },
});

export default TaleDrawedImageModal;
