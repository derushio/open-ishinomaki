docker build -t 'open-ishinomaki' ../../
docker stop 'open-ishinomaki'
docker rm 'open-ishinomaki'
docker run -d --name 'open-ishinomaki' -v `cd ../../dist; pwd`:/etc/product/open-ishinomaki -p 8000:8000 -it 'open-ishinomaki'
