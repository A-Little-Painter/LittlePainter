package com.yehah.image.s3;

import java.io.File;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class S3Util {

	private final AmazonS3Client amazonS3Client;

	@Value("${cloud.aws.s3.bucket}")
	public String bucket;

	// S3 파일 업로드
	public String upload(MultipartFile multipartFile, String fileName) throws IOException {
		String fileNameExTension = fileName + "." + StringUtils.getFilenameExtension(multipartFile.getOriginalFilename());

		// MultipartFile -> File
		File convertFile = convert(multipartFile)
			.orElseThrow(() -> new IllegalArgumentException("file convert error")); // 파일을 변환할 수 없으면 에러

		// S3에 파일 업로드
		amazonS3Client.putObject(new PutObjectRequest(bucket, fileNameExTension, convertFile).withCannedAcl(
			CannedAccessControlList.PublicRead));
		String uploadImageUrl = amazonS3Client.getUrl(bucket, fileNameExTension).toString();

		// 로컬 파일 삭제
		convertFile.delete();

		return uploadImageUrl;
	}

	public String update(String oldPath, String newPath) {
		try {
			oldPath = URLDecoder.decode(oldPath, "UTF-8");
			newPath = URLDecoder.decode(newPath, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		moveS3(oldPath, newPath);
		delete(oldPath);

		return amazonS3Client.getUrl(bucket, newPath).toString();
	}

	// S3 파일 이동
	public void moveS3(String oldPath, String newPath) {
		amazonS3Client.copyObject(bucket, oldPath, bucket, newPath);
	}

	// S3 파일 삭제
	public void delete(String path) {
		amazonS3Client.deleteObject(bucket, path);
	}

	// 파일 convert 후 로컬에 업로드
	private Optional<File> convert(MultipartFile file) throws IOException {
		File convertFile = new File(System.getProperty("user.dir") + "/" + file.getOriginalFilename());
		if (convertFile.createNewFile()) {
			try (FileOutputStream fos = new FileOutputStream(convertFile)) {
				fos.write(file.getBytes());
			}
			return Optional.of(convertFile);
		}
		return Optional.empty();
	}

}
