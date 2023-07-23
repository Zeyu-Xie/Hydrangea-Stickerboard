all: install

install:
	echo "Installing dependencies in page."
	cd page && npm install && cd ..

build: 
	echo "Running build process in page."
	cd page && npm run build && cd ..

apply_build:
	echo "Copying the packed page project into the python project's folder."
	cp ./page/build/index.html ./function/templates && cp -r ./page/build/* ./function && rm ./function/index.html

run:
	echo "Starting the project..."
	python3 ./function/server.py

clear:
	echo "Removing dependencies in page."
	cd page && rm -rf node_modules && cd ..