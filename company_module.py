from crypt import methods
from dataclasses import fields
from dotenv import load_dotenv
import os
from queries import *
import datetime
import json
from flask import Blueprint, render_template, abort
from flask.globals import request

load_dotenv()

company = Blueprint('company', __name__)

# data = ["company_id", "login_id,name,logo,cover_image,wallet_address,description,company_url,year_of_establishment,number_of_employees,address,contry,contect_number,created_at,modified_at"]


def company_registration(company_data):
    try:
        fields = '*'
        tablename = os.environ.get('company_table')
        # Checking If the Address is Exists Or Not
        condition = f"""wallet_address='{company_data[5]}'"""
        data = select_query(fields, tablename, condition)
        final_data = json.loads(data.decode('utf-8'))
        print(final_data)
        if (len(final_data['rows']) == 0):
            tablename = os.environ.get('company_table')
            fields = "(login_id,name,logo,cover_image,wallet_address,description,company_url,year_of_establishment,number_of_employees,address,contry,contect_number,created_at,modified_at)"
            values = company_data + (int(datetime.datetime.now().timestamp()),
                                     int(datetime.datetime.now().timestamp()))
            data = insert_query(tablename, fields, values)
            return "Registration Successfully !"
        else:
            return "Registration is already done !", 409

    except Exception as e:
        return e

# ---------------------------------------------------------------------------------------
# ---------------------------------------------------------------------------------------
# ---------------------------------------------------------------------------------------
# Update Company Details


@company.route('/company/update', methods=['POST'])
def update():
    try:
        update_values = request.json['data']
        # print(update_values)
        walletAddress = request.json['walletAddress']
        tablename = os.environ.get('company_table')
        condition = f"""wallet_address='{walletAddress}'"""
        data = update_query(tablename, update_values, condition, True)
        # print(walletAddress)
        return "Data updated successfully!!", 200
    except Exception as e:
        print(e)
        return "Something went wrong !!", 500


# ---------------------------------------------------------------------------------------
# ---------------------------------------------------------------------------------------
# ---------------------------------------------------------------------------------------
# Add Sectors
@company.route('/company/addSectors', methods=['POST'])
def add_sector():
    try:
        name = request.json['name']
        fields = "*"
        tablename = os.environ.get('sector')
        condition = f""" sector_name='{name}'"""
        check = select_query(fields, tablename, condition)
        final_data = json.loads(check.decode('utf-8'))
        
        #print(final_data)
        
        if (len(final_data['rows']) != 0):
            return "sector already exist!!", 409
        
        fields = "(sector_name)"
        values = f"""('{name}')"""
        data = insert_query(tablename,fields,values)

        print(data)

        return "Data inserted successfully!!!", 200
    except Exception as e:
        print(e)

        return "Something went wrong", 500


# ---------------------------------------------------------------------------------------
# ---------------------------------------------------------------------------------------
# ---------------------------------------------------------------------------------------
# Add Sectors
@company.route('/company/addCreatorSectors', methods=['POST'])
def addCreatorSector():
    try:
        company_sectors = os.environ.get('company_sectors')
        fields = "(company_id, sector_id)"
        company_id = request.json['company_id']
        sector_names = request.json['sector_name']
        sector_table = os.environ.get('sector')
        sector_ids = request.json['sector_ids']
        for sector in sector_names:
            data = insert_query(sector_table,"(sector_name)",f"""('{sector}')""")    
            condition = f"""sector_name='{sector}'"""
            data = select_query("(sector_id)", sector_table, condition)
            final_data = json.loads(data.decode('utf-8'))
            if len(final_data['rows']) > 0:
                sector_ids.append(final_data['rows'][0][0])

        values = ''
        for ids in sector_ids:
            values +=  f"""({company_id},{ids}),"""
        data = insert_query(company_sectors,fields,values[0:-1])    
        response_body = {
            "status":200,
            "data":"User's Skill Addedd Successfully !"
        },200    
        return response_body

    except Exception as e:   
        response_body = {
            "status":409,
            "data":str(e)
        },409
        return response_body
