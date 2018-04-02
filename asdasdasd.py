import numpy as np


def get_im2col_indices(x_shape, field_height, field_width, padding=1, stride=1):
    # First figure out what the size of the output should be
    N, C, H, W = x_shape
    assert (H + 2 * padding - field_height) % stride == 0
    assert (W + 2 * padding - field_height) % stride == 0
    out_height = (H + 2 * padding - field_height) / stride + 1
    out_width = (W + 2 * padding - field_width) / stride + 1

    i0 = np.repeat(np.arange(field_height), field_width)
    i0 = np.tile(i0, C)
    i1 = stride * np.repeat(np.arange(out_height), out_width)
    j0 = np.tile(np.arange(field_width), field_height * C)
    j1 = stride * np.tile(np.arange(out_width), out_height)
    i = i0.reshape(-1, 1) + i1.reshape(1, -1)
    j = j0.reshape(-1, 1) + j1.reshape(1, -1)

    k = np.repeat(np.arange(C), field_height * field_width).reshape(-1, 1)

    return (k, i, j)


def im2col_indices(x, field_height, field_width, padding=1, stride=1):
    """ An implementation of im2col based on some fancy indexing """
    # Zero-pad the input
    p = padding
    x_padded = np.pad(x, ((0, 0), (0, 0), (p, p), (p, p)), mode='constant')

    k, i, j = get_im2col_indices(x.shape, field_height, field_width, padding,
                                 stride)

    cols = x_padded[:, k, i, j]
    C = x.shape[1]
    cols = cols.transpose(1, 2, 0).reshape(field_height * field_width * C, -1)
    return cols


def col2im_indices(cols, x_shape, field_height=3, field_width=3, padding=1,
                   stride=1):
    """ An implementation of col2im based on fancy indexing and np.add.at """
    N, C, H, W = x_shape
    H_padded, W_padded = H + 2 * padding, W + 2 * padding
    x_padded = np.zeros((N, C, H_padded, W_padded), dtype=cols.dtype)
    k, i, j = get_im2col_indices(x_shape, field_height, field_width, padding,
                                 stride)
    cols_reshaped = cols.reshape(C * field_height * field_width, -1, N)
    cols_reshaped = cols_reshaped.transpose(2, 0, 1)
    np.add.at(x_padded, (slice(None), k, i, j), cols_reshaped)
    if padding == 0:
        return x_padded
    return x_padded[:, :, padding:-padding, padding:-padding]


cols = [[-3, -9, 12, 0, 9, 0, 9, -12, -3, 0, 9, -9, -9, -3, 9, 12, 3, -9, 0, 6, 9, -9, -6, 3, 0, 0, 12],
        [-5, -3, 8, 0, 3, 0, 3, -8, -5, 0, 3, -3, -3, -
            5, 3, 8, 5, -3, 0, -2, 3, -3, 2, 5, 0, 0, 8],
        [-2, -5, 7, 0, 5, 0, 5, -7, -2, 0, 5, -5, -5, -
            2, 5, 7, 2, -5, 0, 3, 5, -5, -3, 2, 0, 0, 7],
        [2, 8, -10, 0, -8, 0, -8, 10, 2, 0, -8, 8, 8, 2, -
         8, -10, -2, 8, 0, -6, -8, 8, 6, -2, 0, 0, -10],
        [0, 6, -6, 0, -6, 0, -6, 6, 0, 0, -6, 6, 6, 0, -
         6, -6, 0, 6, 0, -6, -6, 6, 6, 0, 0, 0, -6],
        [-3, -2, 5, 0, 2, 0, 2, -5, -3, 0, 2, -2, -2, -
         3, 2, 5, 3, -2, 0, -1, 2, -2, 1, 3, 0, 0, 5],
        [1, 0, -1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1,
         0, -1, -1, 0, 0, 1, 0, 0, -1, -1, 0, 0, -1],
        [-1, -1, 2, 0, 1, 0, 1, -2, -1, 0, 1, -1, -1, -
         1, 1, 2, 1, -1, 0, 0, 1, -1, 0, 1, 0, 0, 2],
        [0, -1, 1, 0, 1, 0, 1, -1, 0, 0, 1, -1, -1, 0,
         1, 1, 0, -1, 0, 1, 1, -1, -1, 0, 0, 0, 1],
        [3, -3, 0, 0, 3, 0, 3, 0, 3, 0, 3, -3, -3, 3,
         3, 0, -3, -3, 0, 6, 3, -3, -6, -3, 0, 0, 0],
        [1, -4, 3, 0, 4, 0, 4, -3, 1, 0, 4, -4, -4, 1,
         4, 3, -1, -4, 0, 5, 4, -4, -5, -1, 0, 0, 3],
        [4, -1, -3, 0, 1, 0, 1, 3, 4, 0, 1, -1, -1, 4,
         1, -3, -4, -1, 0, 5, 1, -1, -5, -4, 0, 0, -3],
        [0, -3, 3, 0, 3, 0, 3, -3, 0, 0, 3, -3, -3, 0,
         3, 3, 0, -3, 0, 3, 3, -3, -3, 0, 0, 0, 3],
        [3, 4, -7, 0, -4, 0, -4, 7, 3, 0, -4, 4, 4, 3, -
         4, -7, -3, 4, 0, -1, -4, 4, 1, -3, 0, 0, -7],
        [-3, -5, 8, 0, 5, 0, 5, -8, -3, 0, 5, -5, -5, -
         3, 5, 8, 3, -5, 0, 2, 5, -5, -2, 3, 0, 0, 8],
        [-2, -1, 3, 0, 1, 0, 1, -3, -2, 0, 1, -1, -1, -2, 1, 3, 2, -1, 0, -1, 1, -1, 1, 2, 0, 0, 3]]
print(np.array(cols).transpose())
# singleCols = np.array([cols])
# print(np.array([
#     [
#       [
#           [1, 2, 3, 4],
#           [5, 6, 7, 8],
#           [9, 0, 1, 2]
#       ],
#       [
#           [1, 2, 3, 4],
#           [5, 6, 7, 8],
#           [9, 0, 1, 2]
#       ],
#       ]
# ]).shape)
# print(col2im_indices(singleCols, (1, 3, 6, 6), 2, 2, 0))

x = [

    [
        [
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 6],
        ],
        [
            [10, 20, 30, 40, 50, 60],
            [10, 20, 30, 40, 50, 60],
            [10, 20, 30, 40, 50, 60],
            [10, 20, 30, 40, 50, 60],
            [10, 20, 30, 40, 50, 60],
            [10, 20, 30, 40, 50, 60],
        ],
        [
            [100, 200, 300, 400, 500, 600],
            [100, 200, 300, 400, 500, 600],
            [100, 200, 300, 400, 500, 600],
            [100, 200, 300, 400, 500, 600],
            [100, 200, 300, 400, 500, 600],
            [100, 200, 300, 400, 500, 600],
        ],
    ]


]

q = im2col_indices(np.array(x), 3, 3, 0, 1)
print(q)
print(col2im_indices(np.array(cols).transpose(), (1, 3, 6, 6), 3, 3, 0))

[[[[ -3 -14   7   5  15 -10]
   [  0  12  -4   9 -10   2]
   [  9 -13  -5 -20  11  -1]
   [ -6   9   2 -11   7   2]
   [  1   5   0   6   5   4]
   [  3  -7  12  -4  -6  -2]]

  [[  0   9  -6   2 -13   8]
   [ -9 -12   7   7   8  -9]
   [ 18  10  -4  -8 -11   8]
   [ -7   5   1  11   5  -1]
   [ -2   4   0 -15  -5   0]
   [  3  -7   2  10  -3  -1]]

  [[  0   6   7   6  -1  -8]
   [ -9 -15  -7  13   8  -1]
   [  6   5  20  17  15  -8]
   [ -1  -1 -14  -6  -3  -1]
   [ -3   1  -3  -6   7  -1]
   [  0   0   3  -7   8   3]]]]