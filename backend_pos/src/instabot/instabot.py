import random
import os
from instagrapi import Client
cl = Client()
USERINSTA = "foo"
PASSINSTA = "foo"
try:
    cl.login(USERINSTA, PASSINSTA)
except:
    print('Error. Falha no Login!')

# list_user_to_get_media = ['23punk_']
# list_user_to_get_media = ['bandarockbeats']
# list_user_to_get_media = ['unlimited.voices']
# list_user_to_get_media = ['brilliantmusicians']
list_user_to_get_media = ['singing']
# list_user_to_get_media = ['musical.nation']
list_users_id = []
list_users_media_photo = []
list_users_media_video = []
list_users_media_album = []
list_with_media_photo_and_desc = {}
list_with_media_video_and_desc = {}
list_with_media_album_and_desc = {}

print('Obtendo lista de Ids')


def get_list_user_id():
    print('Obtendo usuarios e medias...')
    for u in list_user_to_get_media:
        c = cl.user_info_by_username(u).dict().get('pk')
        l = cl.user_medias(c, amount=1)
        i = l[0].dict().get('pk')
        t = l[0].dict().get('caption_text')
        n = l[0].dict().get('user').get('username')
        if l[0].dict().get('media_type') == 1:
            list_users_media_photo.append(i)
            list_with_media_photo_and_desc[str(i)] = [str(t), str(n)]
        if l[0].dict().get('media_type') == 2:
            list_users_media_video.append(i)
            list_with_media_video_and_desc[str(i)] = [str(t), str(n)]
#        if l[0].dict().get('media_type') == 8:
#            list_users_media_album.append(i)
#            list_with_media_album_and_desc[str(i)] = [str(t), str(n)]
    print(str(list_with_media_photo_and_desc))


def download_media(list_media_photo, list_media_video, list_media_album):
    print('Realizando download de medias de usuarios...')
    for p in list_media_photo:
        f = cl.photo_download(int(p), './images')
        print('Download do arquivo:' + f.name)
    for p in list_media_video:
        f = cl.video_download(int(p), './videos')
        print('Download do arquivo:' + f.name)
#    for p in list_media_album:
#        f = cl.album_download(int(p), './albums')
#        print('Download do arquivo:' + f.name)


def post_medias(dict_medias_photo, dict_medias_video, dict_medias_album):
    try:
        for x in dict_medias_photo.items():
            cl.photo_upload('./images/' + str(x[1][1]) + '_' + str(
                x[0]) + '.jpg', str(x[1][0]) + ' from @' + str(x[1][1]))
            os.remove('./images/' + str(x[1][1]) + '_' + str(x[0]) + '.jpg')
        print('Upload de photo realizado com sucesso!')
        for x in dict_medias_video.items():
            cl.igtv_upload('./videos/' + str(x[1][1]) + '_' + str(
                x[0]) + '.mp4', "Good Sounds - ",  str(x[1][0]) + ' from @' + str(x[1][1]))
            os.remove('./videos/' + str(x[1][1]) + '_' + str(x[0]) + '.mp4')
            os.remove('./videos/' + str(x[1][1]) +
                      '_' + str(x[0]) + '.mp4.jpg')
        print('Upload de video realizado com sucesso!')
# TODO modificar pois deve ser passado a lista de caminhos das fotos do albium
        for x in dict_medias_album.items():
            cl.album_upload('./album/' + str(x[1][1]) + '_' + str(
                x[0]) + '.jpg', str(x[1][0]) + ' from @' + str(x[1][1]))
        print('Upload de album realizado com sucesso!')
    except Exception as e:
        print('Falha para realizar o post ' + e)


get_list_user_id()
download_media(list_users_media_photo,
               list_users_media_video, list_users_media_album)
post_medias(list_with_media_photo_and_desc,
            list_with_media_video_and_desc, list_with_media_album_and_desc)
