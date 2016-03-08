# -*- coding: utf8 -*-


import sys
import os
import xbmc
import xbmcvfs
import xbmcaddon
import StringIO
import re
import gzip
import urllib
import urllib2
import json as simplejson
ADDON = xbmcaddon.Addon()
ADDON_VERSION = ADDON.getAddonInfo('version')
ADDON_LANGUAGE = ADDON.getLocalizedString
ADDON_PATH = ADDON.getAddonInfo('path').decode("utf-8")
ADDON_SETTING = ADDON.getSetting

sys.path.append(xbmc.translatePath(os.path.join(ADDON_PATH, 'resources', 'lib')))
print sys.path
import web

urls = (
    '/feedback', 'feedback'
)
app = web.application(urls, globals())


def GetHttpData(url, data=None):

    req = urllib2.Request(url)
    req.add_header('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) {0}{1}'.
                   format('AppleWebKit/537.36 (KHTML, like Gecko) ',
                          'Chrome/28.0.1500.71 Safari/537.36'))
    req.add_header('Accept-encoding', 'gzip')
    if data:
        response = urllib2.urlopen(req, data, timeout=10)
    else:
        response = urllib2.urlopen(req, timeout=10)
    httpdata = response.read()
    if response.headers.get('content-encoding', None) == 'gzip':
        httpdata = gzip.GzipFile(fileobj=StringIO.StringIO(httpdata)).read()
    response.close()
    match = re.compile('encoding=(.+?)"').findall(httpdata)
    if not match:
        match = re.compile('meta charset="(.+?)"').findall(httpdata)
    if match:
        charset = match[0].lower()
        if (charset != 'utf-8') and (charset != 'utf8'):
            httpdata = unicode(httpdata, charset).encode('utf8')
    return httpdata


def get_version():
    LOCAL_QUA_PATH = '/data/data/qua'
    addressfile = xbmcvfs.File(LOCAL_QUA_PATH)
    data = addressfile.read()
    addressfile.close()
    if data == '':
        data = '{"qua":"QV=1&VN=1.1.27&PT=PVS&RL=1920x1080&IT=12117592000&OS=1.1.27&CHID=13032&DV=tencent_macaroni"}'
    data = simplejson.loads(data)
    qua = data["qua"]
    match = re.compile(r'VN=(.+?)(?=&)').findall(qua)
    if match:
        return match[0]


def get_guid():
    LOCAL_GUID_PATH = '/data/data/guidinfo'
    addressfile = xbmcvfs.File(LOCAL_GUID_PATH)
    data = addressfile.read()
    addressfile.close()
    if data == '':
        data = '{"tvskey":"","guid":"","guid_secret":""}'
    data = simplejson.loads(data)
    return data['guid']


class feedback:
    def GET(self):
        raise web.seeother('/static/feedback.html')

    def POST(self):
        query = web.input()
        base_url = "http://192.168.150.87/PhpApi/Public/go3c/?"
        data = {"qq": query.qq,
                "phone": query.phone,
                "ip": "",
                "content": query.content,
                "version": get_version(),
                "guid": get_guid()}
        print data
        data["m"] = "Feedback.getFeedback"
        result = GetHttpData(base_url + urllib.urlencode(data))
        if result != "":
            return '{"result": {"ret": 0}}'
        else:
            return '{"result": {"ret": 1}}'

    def upload_log(self):
        pass


if __name__ == "__main__":
    web.httpserver.runsimple(app.wsgifunc(), ("0.0.0.0", 9527))
