WORK_DIR=$(pwd)

cd $WORK_DIR/api
echo "installing API modules"
npm install

cd $WORK_DIR/frontend
echo "installing Frontend modules"
yarn

cd $WORK_DIR/services/auth
echo "installing Services/Auth modules"
npm install

cd $WORK_DIR/services/posts
echo "installing Services/Posts modules"
npm install

cd $WORK_DIR/services/user
echo "installing Services/User modules"
npm install

echo "DONE!!"
cd $WORK_DIR
