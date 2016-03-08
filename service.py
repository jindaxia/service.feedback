#! /usr/bin/env python
# coding=utf-8

import socket
import time
from random import sample
import xbmc
import traceback
import sys
import os
import xbmcaddon
import xbmcgui
import json

ADDON = xbmcaddon.Addon()
ADDON_VERSION = ADDON.getAddonInfo('version')
ADDON_LANGUAGE = ADDON.getLocalizedString
ADDON_PATH = ADDON.getAddonInfo('path').decode("utf-8")
ADDON_SETTING = ADDON.getSetting

sys.path.append(xbmc.translatePath(os.path.join(ADDON_PATH, 'resources', 'lib')))


# HOST = 'http://remote.tofuos.com/'    # The remote host

HOST = ADDON_SETTING("server-ip")

# HOST = 'localhost'    # The remote host
PORT = 8000           # The same port as used by the server
EOF = b' END'

class Main:

    def __init__(self):
        self._init_vars()
        self._daemon()

    def _init_vars(self):
        pass

    def _daemon(self):
        import device
        # deamon is meant to keep script running at all time
        client_name = "ssssss"
        while (not xbmc.abortRequested):
            try:
                s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                s.connect((HOST, PORT))
                s.sendall(client_name + EOF)

                data = json.loads(self.recv_data(s))
                cid = data["data"]["cid"]
                vid = data["data"]["vid"]
                titleinfo = data["title"]
                print "!!play push video cid: %s, vid: %s" % (cid, vid)
                xbmc.executebuiltin("RunScript(service.tencent.data.provider,playvideo,{0},{1},1,,{2})".format(cid, vid, titleinfo.encode('utf8')))
                time.sleep(10)
                s.close()

            except Exception:
                traceback.print_exc()
            xbmc.sleep(1000)

    def recv_data(self, sock):
        data = sock.recv(1024)
        return data.replace(EOF, "")
Main()
