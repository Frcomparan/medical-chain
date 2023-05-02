VAR1="/home/paco/files-for-test/$4/$1/$2/file-$3.1.$4"
VAR2="/home/paco/files-for-test/$4/$1/$2/file-$3.2.$4"
VAR3="/home/paco/files-for-test/$4/$1/$2/file-$3.3.$4"
VAR4="/home/paco/files-for-test/$4/$1/$2/file-$3.4.$4"
VAR5="/home/paco/files-for-test/$4/$1/$2/file-$3.5.$4"


curl --location 'http://localhost:8080/api/user_files' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsInJvbGUiOiJkb2N0b3IiLCJpYXQiOjE2ODMwMzIxMzUsImV4cCI6MTY4MzYzNjkzNX0.jCvimfMPmmR4DBUlNv4QEnkqO0gNG9fest_dznVG4SQ' \
--form "doc=@/$VAR1" \
--form 'userId="7"'

curl --location 'http://localhost:8080/api/user_files' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsInJvbGUiOiJkb2N0b3IiLCJpYXQiOjE2ODMwMzIxMzUsImV4cCI6MTY4MzYzNjkzNX0.jCvimfMPmmR4DBUlNv4QEnkqO0gNG9fest_dznVG4SQ' \
--form "doc=@/$VAR2" \
--form 'userId="7"'

curl --location 'http://localhost:8080/api/user_files' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsInJvbGUiOiJkb2N0b3IiLCJpYXQiOjE2ODMwMzIxMzUsImV4cCI6MTY4MzYzNjkzNX0.jCvimfMPmmR4DBUlNv4QEnkqO0gNG9fest_dznVG4SQ' \
--form "doc=@/$VAR3" \
--form 'userId="7"'

curl --location 'http://localhost:8080/api/user_files' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsInJvbGUiOiJkb2N0b3IiLCJpYXQiOjE2ODMwMzIxMzUsImV4cCI6MTY4MzYzNjkzNX0.jCvimfMPmmR4DBUlNv4QEnkqO0gNG9fest_dznVG4SQ' \
--form "doc=@/$VAR4" \
--form 'userId="7"'

curl --location 'http://localhost:8080/api/user_files' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsInJvbGUiOiJkb2N0b3IiLCJpYXQiOjE2ODMwMzIxMzUsImV4cCI6MTY4MzYzNjkzNX0.jCvimfMPmmR4DBUlNv4QEnkqO0gNG9fest_dznVG4SQ' \
--form "doc=@/$VAR5" \
--form 'userId="7"'