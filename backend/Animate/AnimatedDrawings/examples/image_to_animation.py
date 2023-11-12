# Copyright (c) Meta Platforms, Inc. and affiliates.
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.
import shutil

from image_to_annotations import image_to_annotations
from annotations_to_animation import annotations_to_animation
from pathlib import Path
import logging
import sys
from pkg_resources import resource_filename


def image_to_animation(img_fn: str, char_anno_dir: str, motion_cfg_fn: str, retarget_cfg_fn: str, animation_type=None, character=None):
    """
    Given the image located at img_fn, create annotation files needed for animation.
    Then create animation from those animations and motion cfg and retarget cfg.
    """
    logging.debug('image_to_animation 진입')

    # create the annotations
    image_to_annotations(img_fn, char_anno_dir, animation_type)

    # 모델이 도출한 annotation(mask, texture) 프리셋에 맞게 수정
    # char_cfg파일 복사
    if animation_type == 'tales' or animation_type == 'animals':
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
    # 복사한 char_cfg파일에 맞게 이미지 수정

    # create the animation
    annotations_to_animation(char_anno_dir, motion_cfg_fn, retarget_cfg_fn, animation_type, character)


if __name__ == '__main__':
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)

    # 인자 수신
    animation_type = None  # 나중에 제거(3)
    character = None

    logging.debug(f"image_to_animation.py 진입 {len(sys.argv)}")
    img_fn = sys.argv[1]
    char_anno_dir = sys.argv[2]

    if len(sys.argv) > 3:  # animal, tale 완료하면 조건 제거(1)
        character = sys.argv[3]
        animation_type = sys.argv[4]
        logging.debug('기본인자 : ' + img_fn + ' / ' + char_anno_dir + ' / ' + character + ' / ' + animation_type)
    else:  # animal, tale 완료하면 내용까지 제거(2)
        motion_cfg_fn = resource_filename(__name__, 'config/motion/dab.yaml')
        retarget_cfg_fn = resource_filename(__name__, 'config/retarget/fair1_ppf.yaml')
        image_to_animation(img_fn, char_anno_dir, motion_cfg_fn, retarget_cfg_fn)

    # motion, retarget config 할당
    if animation_type == 'animals':
        # 동물별로 분기 제공
        # if character in animal_list:
        #     motion_cfg_fn = resource_filename(__name__, 'config/motion/zombie.yaml')
        #     retarget_cfg_fn = resource_filename(__name__, 'config/retarget/four_legs.yaml')
        #
        # else:
        #     motion_cfg_fn = resource_filename(__name__, 'config/motion/dab.yaml')
        #     retarget_cfg_fn = resource_filename(__name__, 'config/retarget/fair1_ppf.yaml')

        # 분기 제공 취소. 동물은 모두 걷기만 적용
        motion_cfg_fn = resource_filename(__name__, 'config/motion/zombie.yaml')
        retarget_cfg_fn = resource_filename(__name__, 'config/retarget/four_legs.yaml')

        # 골격종류 포함하여 config파일 생성 함수 실행
        image_to_animation(img_fn, char_anno_dir, motion_cfg_fn, retarget_cfg_fn, 'animals', character)

    elif animation_type == 'tales':
        title = sys.argv[5]
        page_no = sys.argv[6]
        logging.debug('동화 추가 인자 : ' + title + ' / ' + page_no)

        motion_cfg_fn = resource_filename(__name__, 'config/motion/dab.yaml')
        retarget_cfg_fn = resource_filename(__name__, 'config/retarget/fair1_ppf.yaml')

        # 골격종류 포함하여 config파일 생성 함수 실행
        image_to_animation(img_fn, char_anno_dir, motion_cfg_fn, retarget_cfg_fn, 'tales', character)
