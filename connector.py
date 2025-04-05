import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="your_password",
    database="your_database"
)

if conn.is_connected():
    print("Connected to MySQL database!")
