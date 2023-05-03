VAR="http://localhost:8080/api/user_files/$1"

curl -X GET $VAR \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInJvbGUiOiJkb2N0b3IiLCJpYXQiOjE2ODMxMzI1MDAsImV4cCI6MTY4MzczNzMwMH0.Zr7E56qasney4UMkoGdv0EjDhvpzq_NartVozqGdHTY' \
--data ''