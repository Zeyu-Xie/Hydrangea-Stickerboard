from PIL import Image


def merge_vertical(im1, im2):
    w = max(im1.size[0], im2.size[0])
    h = im1.size[1]+im2.size[1]
    im = Image.new("RGBA", (w, h))

    im.paste(im1)
    im.paste(im2, (0, im1.size[1]))

    return im
