import subprocess
import sys
import re
import datetime

def select_query(fields,tablename, condition):
    if(condition):
        query = """
                tableland read "Select """ + fields + """ from """+ tablename + """ WHERE """ + condition + """ ;"
                """
    else:            
        query =  f"""
                tableland read "Select {fields} from { tablename } ;"
                """
    data = subprocess.check_output([query], shell=True)
    return data
    

def insert_query(tablename, fields ,values):
    query = f"""
            tableland write "INSERT INTO {tablename} {fields} VALUES { values }"
            """
    print(query)
    data = subprocess.check_output([query], shell=True)
    return data

def update_query(tablename, update_values ,condition, modified=False):
    fields = ""
    for key, value in update_values.items():
        if value:
            if type(value) != int:
                fields += f"""{key}='{value}',"""
            else:    
                fields += f"""{key}={value},"""
    
    if modified:
        fields += f"""modified_at={int(datetime.datetime.now().timestamp())}"""
    else:
        fields = fields[0:-1]            
    query = f"""
            tableland write "UPDATE {tablename} SET {fields} WHERE { condition }"
            """
    print(query)
    data = subprocess.check_output([query], shell=True)
    return data
