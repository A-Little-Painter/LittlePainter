package com.yehah.draw.global.common;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class ZipExtractor {
    public static List<byte[]> unzip(byte[] imageZip) throws IOException {
        List<byte[]> imageList = new ArrayList<>();
        byte[] buffer = new byte[1024];

        try (ZipInputStream zipInputStream = new ZipInputStream(new ByteArrayInputStream(imageZip))) {
            ZipEntry zipEntry = zipInputStream.getNextEntry();
            while (zipEntry != null) {
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                if (!zipEntry.isDirectory()) {
                    //파일인 경우만 처리
                    int length;
                    while ((length = zipInputStream.read(buffer)) > 0) {
                        outputStream.write(buffer, 0, length);
                    }
                    imageList.add(outputStream.toByteArray());
                }
                zipEntry = zipInputStream.getNextEntry();
            }
            // 모든 엔트리 처리 후 스트림 닫기
            zipInputStream.closeEntry();
        }
        return imageList;
    }
}