echo ENTER | ssh-keygen -t rsa -C "mail@gmail.com" -f /root/.ssh/id_rsa -P ""
cat /root/.ssh/id_rsa.pub
sudo apt update
sudo apt-get install git
echo Y | sudo apt install nginx
systemctl enable nginx
timedatectl set-timezone "Asia/Taipei"
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
npm i -g n pm2
cd /var/www
git clone git@github.com:HexschoolInskill/Inskill.git --branch main --single-branch
cd Inskill
vim .env
npm install
npm run build
pm2 start
