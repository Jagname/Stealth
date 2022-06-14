import requests
from bs4 import BeautifulSoup

html_text = requests.get('https://optifine.net/downloads').text
soup = BeautifulSoup(html_text, 'html.parser')
links = soup.find_all('a')

optifine_jars = list()

for link in links:
    href = link['href']
    if href.startswith('http://optifine.net/adloadx?f='):
        optifine_jars.append(href)

def download_version(version_number):
    if version_number.endswith('.0'):
        version_number = version_number[:-2] + '_'
    
    for jar in optifine_jars:
        if 'OptiFine_' + version_number in jar:
            optifine_jar = jar
            break
        elif 'OptiFine_' + version_number[:-1] + '.0' in jar:
            optifine_jar = jar
            break

    html_text = requests.get(optifine_jar).text
    soup = BeautifulSoup(html_text, 'html.parser')
    links = soup.find_all('a')
    for link in links:
        href = link['href']
        if href.startswith('downloadx'):
            file = requests.get('https://optifine.net/' + href)
            open('temp_stealth_version.jar', 'wb').write(file.content)
