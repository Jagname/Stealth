import os
import subprocess
import eel
import pyautogui
import time
import server_communicator as sv
import version_downloader as vd

FRONTEND_ASSET_FOLDER = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'web')

PREFERENCES_FOLDER = os.path.expanduser('~\Documents\StealthMC')
PREFERENCES_FILE = os.path.expanduser('~\Documents\StealthMC\stealth_preferences.txt')

if not os.path.exists(PREFERENCES_FOLDER):
    os.mkdir(PREFERENCES_FOLDER)

startup_info = subprocess.STARTUPINFO()
startup_info.dwFlags |= subprocess.STARTF_USESHOWWINDOW

screen_width, screen_height = pyautogui.size()

eel.init(FRONTEND_ASSET_FOLDER)

@eel.expose
def check_available_versions(ip, edition):
    try:
        available_versions = sv.get_availables_versions(ip, edition)
    except:
        return 1
    return available_versions

@eel.expose
def install_version(version):
    try:
        vd.download_version(version)
        subprocess.call('java -jar temp_stealth_version.jar', startupinfo=startup_info)
        subprocess.Popen('del temp_stealth_version.jar', shell=True)
    except:
        time.sleep(0.01) # to see a refresh
        return 1

@eel.expose
def save_preferences(language):
    with open(PREFERENCES_FILE, 'w') as prefs:
        prefs.write(language)

@eel.expose
def check_preferences():
    with open(PREFERENCES_FILE, 'a+') as prefs:
        prefs.seek(0)
        return ''.join(prefs.readline())

eel.start('index.html', size=(700, 500), position=((screen_width/2)-350, (screen_height/2)-250))
