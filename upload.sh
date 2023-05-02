VAR1="/home/paco/files-for-test/$4/$1/$2/file-$3.1.$4"


curl --location 'http://localhost:8080/api/user_files' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInJvbGUiOiJkb2N0b3IiLCJpYXQiOjE2ODMwNDk1MjMsImV4cCI6MTY4MzY1NDMyM30.5gmpPHK2W7XI6s_bT0rtYV-bn-AeQdJZ5bGMbmVvwYg' \
--form "doc=@/$VAR1" \
--form 'userId="3"'