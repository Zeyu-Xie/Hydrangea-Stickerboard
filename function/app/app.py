from PIL import Image
from merge import merge_vertical
from i_image import i_image
import os

script_path = os.path.abspath(__file__)
script_directory = os.path.dirname(script_path)
source_path = os.path.join(script_directory, "sources")

im = []
im_output = Image.new("RGBA", (1, 1))


sources = os.listdir(source_path)
num = len(sources)

for i in range(0, num):
    im.append(i_image(Image.open(os.path.join(
        source_path, sources[i])), sources[i]))


def sort_by_name(t):
    return t.get_name()


im.sort(key=sort_by_name)

for i in range(0, num):
    if i == 0:
        im_output = im[i].get_im()
    else:
        im_output = merge_vertical(im_output, im[i].get_im())

im_output.save("output.png")
