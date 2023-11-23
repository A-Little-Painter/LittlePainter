
package com.yehah.draw.global.Processor;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yehah.draw.domain.animations.dto.response.AnimationResDto;
import com.yehah.draw.domain.animations.dto.response.FriendResDto;
import com.yehah.draw.domain.animations.exception.AnimationBorderExtractionException;
import com.yehah.draw.domain.animations.exception.AnimationChangeException;
import com.yehah.draw.domain.animations.exception.AnimationDataSaveException;
import com.yehah.draw.global.common.ImageListToRequestBodyData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;
@Slf4j
@Configuration
@RequiredArgsConstructor
public class ImageAndGifProcessor {
    @Value("${micro.path.similarityCheck}")
    private String similarityPath;
    @Value("${micro.path.animate}")
    private String animatePath;
    @Value("${micro.path.image}")
    private String imagePath;
    private final CommunicationProcessor communicationProcessor;
    //    private MultiValueMap<String, Object> bodyData;
//
//    @PostConstruct
//    public void initialize(){
//        bodyData = new LinkedMultiValueMap<>();
//    }
    // 1. 테두리의 영역 안에 있는 이미지만 추출하기
    public byte[] extractBorderImage(String roomId, MultipartFile originalFile, MultipartFile newFile){
        MultiValueMap<String, Object> bodyData = new LinkedMultiValueMap<>();
        // bodyData.clear();
        bodyData.add("roomId", roomId);
        bodyData.add("originalFile", originalFile.getResource());
        bodyData.add("newFile", newFile.getResource());
        try{
            return communicationProcessor.postMultipartAnimateMethod(bodyData, similarityPath+"/border-extraction");
        }catch(Exception e){
            throw new AnimationBorderExtractionException("테두리 내부 영역의 이미지를 추출할 수 없습니다.");
        }
    }
    public byte[] animalConvertToGif(String animalType, Map<String, byte[]> images){
        MultiValueMap<String, Object> bodyData = new LinkedMultiValueMap<>();
        //bodyData.clear();
        bodyData.add("animalType", animalType);
        ImageListToRequestBodyData.addImage(images, bodyData);
        try{
            return communicationProcessor.postMultipartAnimateMethod(bodyData, animatePath+"/animals");
        }catch(Exception e){
            throw new AnimationChangeException("이미지를 GIF로 변환할 수 없습니다.");
        }
    }
    public byte[] taleConvertToGif(int pageNo, String taleTitle, String character, Map<String, byte[]> images){
        MultiValueMap<String, Object> bodyData = new LinkedMultiValueMap<>();
        // bodyData.clear();
        bodyData.add("pageNo", pageNo);
        bodyData.add("taleTitle", taleTitle.replace(" ", ""));
        bodyData.add("character", character.replace(" ", ""));
        ImageListToRequestBodyData.addImage(images, bodyData);
        try{
            return communicationProcessor.postMultipartAnimateMethod(bodyData, animatePath+"/tales");
        } catch (Exception e) {
            e.printStackTrace();
            throw new AnimationChangeException("이미지를 GIF로 변환할 수 없습니다.");
        }
    }
    public byte[] friendConvertToGif(Map<String, byte[]> images){
        MultiValueMap<String, Object> bodyData = new LinkedMultiValueMap<>();
        //bodyData.clear();
        ImageListToRequestBodyData.addImage(images, bodyData);
        try{
            return communicationProcessor.postMultipartAnimateMethod(bodyData, animatePath+"/friends");
        } catch (Exception e) {
            e.printStackTrace();
            throw new AnimationChangeException("이미지를 GIF로 변환할 수 없습니다.");
        }
    }
    public AnimationResDto uploadsImageAndGif(byte[] imageFile, byte[] gifFile) throws JsonMappingException {
        MultiValueMap<String, Object> bodyData = new LinkedMultiValueMap<>();
        //bodyData.clear();
        bodyData.add("imageFile", new ByteArrayResource(imageFile){
            @Override
            public String getFilename() throws IllegalStateException {
                return "imageFile.jpg";
            }
        });
        bodyData.add("gifFile", new ByteArrayResource(gifFile){
            @Override
            public String getFilename() throws IllegalStateException {
                return "gifFile.gif";
            }
        });
        ObjectMapper objectMapper = new ObjectMapper();
        try{
            String json = objectMapper.writeValueAsString(communicationProcessor.postMultipartMethod(bodyData, imagePath+"/comm/temp", Object.class));
            log.info("Data : {}", json);
            return objectMapper.readValue(json, AnimationResDto.class);
        } catch(JsonMappingException e){
            e.printStackTrace();
            throw new JsonMappingException("데이터 변환 오류");
        } catch(Exception e){
            throw new AnimationDataSaveException("S3에 이미지를 저장할 수 없습니다.");
        }
    }
    public FriendResDto uploadsImage(byte[] imageFile) throws JsonMappingException {
        MultiValueMap<String, Object> bodyData = new LinkedMultiValueMap<>();
        bodyData.add("imageFile", new ByteArrayResource(imageFile){
            @Override
            public String getFilename() throws IllegalStateException {
                return "imageFile.jpg";
            }
        });
        ObjectMapper objectMapper = new ObjectMapper();
        try{
            String json = objectMapper.writeValueAsString(communicationProcessor.postMultipartMethod(bodyData, imagePath+"/comm/temp", Object.class));
            log.info("Data : {}", json);
            return objectMapper.readValue(json, FriendResDto.class);
        } catch(JsonMappingException e){
            e.printStackTrace();
            throw new JsonMappingException("데이터 변환 오류");
        } catch(Exception e){
            throw new AnimationDataSaveException("S3에 이미지를 저장할 수 없습니다.");
        }
    }
}
