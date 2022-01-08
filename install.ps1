cd client
npm install
npm install font-awesome --save-dev
echo "installation des packages du client terminée"

cd ../API
npm install
npm install -g gulp

echo "installation des packages de l'API terminée"

npm install -g @angular/cli
npm install -g spectaql

echo "installation des packages supplémentaires terminée"
echo "Installation finie"
Read-Host -Prompt "Entree pour fermer"