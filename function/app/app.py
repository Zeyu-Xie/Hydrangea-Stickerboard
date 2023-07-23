from PIL import Image
from merge import merge_vertical
import os

script_path = os.path.abspath(__file__)
script_directory = os.path.dirname(script_path)
source_path=os.path.join(script_directory, "sources")

im = []
im_output=Image.new("RGBA", (1,1))
# im.append(Image.open("forest.jpg"))
# im.append(Image.open("darkForest.png"))

# print(im[0].size, im[1].size)

# im_ = merge_vertical(im[0], im[1])

# print(im_.size)

sources = os.listdir(source_path)
num=len(sources)

for i in range(0,num):
    sources[i]=os.path.join(source_path, sources[i])
    im.append(Image.open(sources[i]))
    print(im[i].size)
    if i==0:
        im_output=im[i]
    else:
        im_output=merge_vertical(im_output,im[i])

im_output.save("output.png")