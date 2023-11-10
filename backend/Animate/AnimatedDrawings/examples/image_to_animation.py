# Copyright (c) Meta Platforms, Inc. and affiliates.
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

from image_to_annotations import image_to_annotations
from annotations_to_animation import annotations_to_animation
from pathlib import Path
import logging
import sys
from pkg_resources import resource_filename


def image_to_animation(img_fn: str, char_anno_dir: str, motion_cfg_fn: str, retarget_cfg_fn: str):
    """
    Given the image located at img_fn, create annotation files needed for animation.
    Then create animation from those animations and motion cfg and retarget cfg.
    """
    # create the annotations
    image_to_annotations(img_fn, char_anno_dir)

    # create the animation
    annotations_to_animation(char_anno_dir, motion_cfg_fn, retarget_cfg_fn)


if __name__ == '__main__':
    log_dir = Path('./logs')
    log_dir.mkdir(exist_ok=True, parents=True)
    logging.basicConfig(filename=f'{log_dir}/log.txt', level=logging.DEBUG)
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)

    # 인자 수신
    logger.debug(f"image_to_animation.py 진입 {len(sys.argv)}")
    img_fn = sys.argv[1]
    char_anno_dir = sys.argv[2]

    if len(sys.argv) > 3:  # animal, tale 완료하면 조건 제거(1)
        character = sys.argv[3]
        animation_type = sys.argv[4]
        logger.debug('기본인자 : ' + img_fn + ' / ' + char_anno_dir + ' / ' + character + ' / ' + animation_type)
    else:  # animal, tale 완료하면 내용까지 제거(2)
        motion_cfg_fn = resource_filename(__name__, 'config/motion/dab.yaml')
        retarget_cfg_fn = resource_filename(__name__, 'config/retarget/fair1_ppf.yaml')
        image_to_animation(img_fn, char_anno_dir, motion_cfg_fn, retarget_cfg_fn)

    animation_type = None  # 나중에 제거(3)

    if animation_type == 'animals':
        animal_list = ['강아지', '고양이', '코끼리', '소', '오리', '쥐', '사자', '닭', '늑대', '원숭이', '돼지', '호랑이', '곰', '기타']
        four_legs_animal = ['강아지', '고양이', '코끼리', '소', '사자', '늑대', '돼지', '호랑이']
        motion_cfg_fn = resource_filename(__name__, 'config/motion/zombie.yaml')
        retarget_cfg_fn = resource_filename(__name__, 'config/retarget/four_legs.yaml')
        image_to_animation(img_fn, char_anno_dir, motion_cfg_fn, retarget_cfg_fn)
    elif animation_type == 'tales':
        title = sys.argv[5]
        page_no = sys.argv[6]
        logger.debug('동화 추가 인자 : ' + title + ' / ' + page_no)
        motion_cfg_fn = resource_filename(__name__, 'config/motion/dab.yaml')
        retarget_cfg_fn = resource_filename(__name__, 'config/retarget/fair1_ppf.yaml')
        image_to_animation(img_fn, char_anno_dir, motion_cfg_fn, retarget_cfg_fn)
