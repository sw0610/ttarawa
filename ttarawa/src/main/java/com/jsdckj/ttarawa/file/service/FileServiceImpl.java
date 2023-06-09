package com.jsdckj.ttarawa.file.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {
  private final AmazonS3Client amazonS3Client;
  private final int urlPrefixLength = "https://ttarawa-bucket.s3.ap-northeast-2.amazonaws.com/".length();
  @Value("${cloud.aws.s3.bucket}")
  private String bucket;

  @Override
  public String uploadFile(String dirName, MultipartFile multipartFile) throws IOException {

    if (multipartFile.isEmpty()) {
      return null;
    }
    File uploadFile = convert(multipartFile)  // 파일 변환할 수 없으면 에러
        .orElseThrow(() -> new IllegalArgumentException("error: MultipartFile -> File convert fail"));
    return upload(uploadFile, dirName);
  }

  // 파일 삭제
  @Override
  public void deleteFile(String dirName, String fileUrl) {
    String fileName = fileUrl.substring(urlPrefixLength);

    try {
      amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, fileName));
      System.out.println("name "+bucket + "/" + fileName);
    } catch (AmazonServiceException e) {
      e.printStackTrace();
    } catch (SdkClientException e) {
      e.printStackTrace();
    }

  }

  public String upload(File uploadFile, String filePath) {
    String fileName = filePath + "/" + UUID.randomUUID();// + uploadFile.getName();   // S3에 저장된 파일 이름
    String uploadImageUrl = putS3(uploadFile, fileName); // s3로 업로드
    removeLocalFile(uploadFile);
    return uploadImageUrl;
  }

  // S3로 업로드
  private String putS3(File uploadFile, String fileName) {
    amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
    return amazonS3Client.getUrl(bucket, fileName).toString();
  }

  // 로컬에 저장된 이미지 삭제
  private void removeLocalFile(File targetFile) {
    if (targetFile.delete()) {
      System.out.println("Local File delete success");
      return;
    }
    System.out.println("Local delete fail");
  }

  // 로컬에 파일 업로드
  private Optional<File> convert(MultipartFile file) throws IOException {
    File convertFile = new File(System.getProperty("user.dir") + "/" + file.getOriginalFilename());
    if (convertFile.createNewFile()) { // 바로 위에서 지정한 경로에 File이 생성됨 (경로가 잘못되었다면 생성 불가능)
      try (FileOutputStream fos = new FileOutputStream(convertFile)) { // FileOutputStream 데이터를 파일에 바이트 스트림으로 저장하기 위함
        fos.write(file.getBytes());
      }
      return Optional.of(convertFile);
    }
    return Optional.empty();
  }
}