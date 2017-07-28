service postgresql start

# TODO ufw

echo "root:KsJaA4uQ" | chpasswd
su - postgres -c "psql -U postgres -c \"CREATE ROLE root WITH LOGIN CREATEDB PASSWORD 'KsJaA4uQ';\""
su - postgres -c "psql -U postgres -c \"CREATE DATABASE root OWNER root;\""
psql -c "CREATE DATABASE open_ishinomaki OWNER root;"

bash
