from PIL import Image


class i_image:
    name = ""
    im = {}

    def __init__(self, im, name):
        self.im = im
        self.name = name

    def get_name(self):
        return self.name
    
    def get_im(self):
        return self.im
