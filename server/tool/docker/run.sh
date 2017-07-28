docker build -t 'open-ishinomaki' ../../
docker stop 'open-ishinomaki'
docker rm 'open-ishinomaki'
docker run --privileged -d --name 'open-ishinomaki' \
    -v `cd ../../dist; pwd`:/etc/product/open-ishinomaki/server \
    -v `cd ../../../web/dist; pwd`:/etc/product/open-ishinomaki/web \
    -p 8000:8000 -it 'open-ishinomaki'
