const javaEdition = document.getElementById('java');
const bedrockEdition = document.getElementById('bedrock');
const themeColor = '#00ff407c';
const ipInput = document.getElementById('server-ip');
const versionsList = document.getElementById('versions-list');
const checkButton = document.getElementById('check-versions');
const versionsLabel = document.getElementById('versions-label');
const versionsError = document.getElementById('versions-error');
const languageSelect = document.getElementById('language-select');
const versionToInstall = document.getElementById('version-to-install');
const downloadVersion = document.getElementById('download-version');
const ipLabel = document.getElementById('ip-label');
const editionLabel = document.getElementById('edition-label');
const versionLabel = document.getElementById('version-label');
const installError = document.getElementById('install-error');
const languageLabel = document.getElementById('language-label');
const copyrights = document.getElementById('copyrights');
const versionsLoading = document.getElementById('versions-loading');
const installLoading = document.getElementById('install-loading');

// Choose a MC edition

mcEdition = 'java';

javaEdition.onclick = function(){
  javaEdition.style.backgroundColor = themeColor;
  bedrockEdition.style.backgroundColor = 'white';
  mcEdition = 'java';
};

bedrockEdition.onclick = function(){
  bedrockEdition.style.backgroundColor = themeColor;
  javaEdition.style.backgroundColor = 'white';
  mcEdition = 'bedrock';
};

// MC Versions

function updateVersions(){
  versionsLabel.style.display = 'none';
  versionsList.innerHTML = '';
  versionsError.style.display = 'none';
  versionsLoading.style.display = 'block';
  eel.check_available_versions(ipInput.value, mcEdition)(function(versions){
      versionsLoading.style.display = 'none';
      if (versions == 1){
        versionsError.style.display = 'block';
      }
      else{
        versionsError.style.display = 'none';
        versionsLabel.style.display = 'block';
        versionsList.innerHTML = versions;
      }
  })
};

function installVersion(){
  installError.style.display = 'none';
  installLoading.style.display = 'block';
  eel.install_version(versionToInstall.value)(function(error){
    installLoading.style.display = 'none';
    if (error == 1){
      installError.style.display = 'flex';
      installError.style.justifyContent = 'center';
    }
  })
};

ipInput.addEventListener('keyup', (event) => {
  if (event.code === 'Enter'){
    updateVersions();
  }
});

checkButton.addEventListener('click', () => {
  updateVersions();
});

versionToInstall.addEventListener('keyup', (event) => {
  if (event.code === 'Enter'){
    installVersion();
  }
});

downloadVersion.addEventListener('click', () => {
  installVersion();
});

// Languages

// Default innerHTML

const languageLabelText = languageLabel.innerHTML;
const ipLabelText = ipLabel.innerHTML;
const checkButtonText = checkButton.innerHTML;
const versionsLabelText = versionsLabel.innerHTML;
const versionsErrorText = versionsError.innerHTML;
const editionLabelText = editionLabel.innerHTML;
const versionLabelText = versionLabel.innerHTML;
const versionToInstallText = versionToInstall.innerinnerHTML;
const downloadVersionText = downloadVersion.innerHTML;
const installErrorText = installError.innerHTML;
const copyrightsText = copyrights.innerHTML;
const versionsLoadingText = versionsLoading.innerHTML;
const installLoadingText = installLoading.innerHTML;

function toTranslateInEnglish(){
  languageLabel.innerHTML = languageLabelText;
  ipLabel.innerHTML = ipLabelText;
  checkButton.innerHTML = checkButtonText;
  versionsLabel.innerHTML = versionsLabelText;
  versionsError.innerHTML = versionsErrorText;
  editionLabel.innerHTML = editionLabelText;
  versionLabel.innerHTML = versionLabelText;
  versionToInstall.setAttribute('placeholder', "Enter the version number (for example: 1.8.9)");
  versionToInstall.innerHTML = versionToInstallText;
  downloadVersion.innerHTML = downloadVersionText;
  installError.innerHTML = installErrorText;
  copyrights.innerHTML = copyrightsText;
  versionsLoading.innerHTML = versionsLoadingText;
  installLoading.innerHTML = installLoadingText;
}

function toTranslateInFrench(){
  languageLabel.innerHTML = "Langage&nbsp:&nbsp";
  ipLabel.innerHTML = "Saisissez l'adresse IP du serveur :";
  checkButton.innerHTML = "Vérifier les versions disponibles";
  versionsLabel.innerHTML = "Version(s) disponible(s) détectée(s) :"
  versionsError.innerHTML = "Une erreur s'est produite :<br><br>- Vérifiez l'adresse IP du serveur<br>- Vérifiez que l'édition du jeu sélectionnée est la bonne<br>- Le serveur est peut-être actuellement indisponible";
  editionLabel.innerHTML = "Quelle est l'édition utilisée par le serveur ?";
  versionLabel.innerHTML = "Quelle version souhaitez-vous installer ? (Optifine)";
  versionToInstall.setAttribute('placeholder', "Entrez le numéro de la version (par exemple : 1.8.9)");
  downloadVersion.innerHTML = "Installer la version";
  installError.innerHTML = "Une erreur s'est produite :<br><br>- Vérifiez le numéro de la version<br>- La version n'est peut-être pas encore disponible";
  copyrights.innerHTML = "Créé par Jagname";
  versionsLoading.innerHTML = "Chargement...";
  installLoading.innerHTML = "Chargement...";
}

languageSelect.addEventListener('change', () => {
  if (languageSelect.value == 'english'){
    toTranslateInEnglish();
    eel.save_preferences(languageSelect.value);
  }

  if (languageSelect.value == 'french'){
    toTranslateInFrench();
    eel.save_preferences(languageSelect.value);
  }
});

eel.check_preferences()(function(language){
  if (language == 'english'){
    languageSelect.value = 'english';
    toTranslateInEnglish();
  }

  if (language == 'french'){
    languageSelect.value = 'french';
    toTranslateInFrench();
  }
})
