# Copyright (c) Meta Platforms, Inc. and affiliates.
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.
import shutil

import yaml

from image_to_annotations import image_to_annotations
from annotations_to_animation import annotations_to_animation
from pathlib import Path
from PIL import Image, ImageOps
import logging
import sys
from pkg_resources import resource_filename


def image_to_animation(img_fn: str, char_anno_dir: str, motion_cfg_fn: str, retarget_cfg_fn: str, animation_type=None,
                       character=None):
    """
    Given the image located at img_fn, create annotation files needed for animation.
    Then create animation from those animations and motion cfg and retarget cfg.
    """
    logging.debug('image_to_animation 진입')

    # create the annotations
    image_to_annotations(img_fn, char_anno_dir, animation_type)

    # 동물그리기) 모델이 도출한 annotation(mask, texture)을 프리셋에 맞게 수정
    if animation_type == 'tales' or animation_type == 'animals':
        # 수정하기 전 texture.png, char_cfg.yaml 보존
        shutil.copy(f"{char_anno_dir}/char_cfg.yaml", f"{char_anno_dir}/char_cfg2.yaml")
        shutil.copy(f"{char_anno_dir}/texture.png", f"{char_anno_dir}/texture2.png")

        # 프리셋 반영 1) char_cfg파일 복사
        try:
            # Copy the file to the destination folder
            shutil.copy(f"{char_anno_dir}/../char_cfg.yaml", f"{char_anno_dir}/char_cfg.yaml")
            print("File copied successfully.")
        except FileNotFoundError:
            print("Source file not found.")
        except PermissionError:
            print("Permission error: Check if you have write access to the destination folder.")
        except Exception as e:
            print(f"An error occurred: {e}")

        # 프리셋 반영 2) 복사한 char_cfg파일에 맞게 이미지 수정
        # # cfg파일 로드
        with open(f"{char_anno_dir}/char_cfg.yaml", "r") as file:
            cfg_file = yaml.safe_load(file)
        # # texture.png 로드, *수정*, 저장
        texture = Image.open(f"{char_anno_dir}/texture.png")
        resized_image = ImageOps.pad(texture, (cfg_file["width"], cfg_file["height"]), method=1)
        resized_image.save(f"{char_anno_dir}/texture.png")
        # # mask.png 로드, *수정*, 저장
        mask = Image.open(f"{char_anno_dir}/mask.png")
        resized_image = ImageOps.pad(mask, (cfg_file["width"], cfg_file["height"]), method=1)
        resized_image.save(f"{char_anno_dir}/mask.png")

    # create the animation
    annotations_to_animation(char_anno_dir, motion_cfg_fn, retarget_cfg_fn, animation_type, character)


if __name__ == '__main__':
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    motion_cfg_fn = None
    retarget_cfg_fn = None

    # 인자 수신
    img_fn = sys.argv[1]
    char_anno_dir = sys.argv[2]
    character = sys.argv[3]
    animation_type = sys.argv[4]

    # motion, retarget config 할당
    if animation_type == 'animals':
        # 동물은 모두 걷기 모션 적용
        motion_cfg_fn = resource_filename(__name__, 'config/motion/zombie.yaml')
        retarget_cfg_fn = resource_filename(__name__, 'config/retarget/four_legs.yaml')
    elif animation_type == 'tales':
        # 동화 추가인자 수신
        title = sys.argv[5]
        page_no = sys.argv[6]
        motion_cfg_fn = resource_filename(__name__, f'../result/tales/{title}/{character}/motion_cfg.yaml')
        retarget_cfg_fn = resource_filename(__name__, 'config/retarget/rokoko_mine.yaml')
    elif animation_type == 'friends':
        motion_cfg_fn = resource_filename(__name__, 'config/motion/wave_hello.yaml')
        retarget_cfg_fn = resource_filename(__name__, 'config/retarget/fair1_ppf.yaml')

    # 골격종류 포함하여 config파일 생성 함수 실행
    image_to_animation(img_fn, char_anno_dir, motion_cfg_fn, retarget_cfg_fn, animation_type, character)
