from dataclasses import fields
from dotenv import load_dotenv
import os
from queries import *
import datetime
import json
from flask import Blueprint, render_template, abort
from flask.globals import request

load_dotenv()

creator = Blueprint('creator', __name__)


def creator_registration(creator_data):
    try:
        fields = '*'
        tablename = os.environ.get('creators_table')
        # Checking If the Address is Exists Or Not
        condition = f"""wallet_address='{creator_data[1]}'"""
        data = select_query(fields, tablename, condition)
        final_data = json.loads(data.decode('utf-8'))
        print("Inside creators registration:", final_data)
        if (len(final_data['rows']) == 0):
            tablename = os.environ.get('creators_table')
            fields = "(login_id, wallet_address, name, bio, profile_image, cover_image, address, country, contact_number, created_at, modified_at)"
            values = creator_data + (int(datetime.datetime.now().timestamp()),
                                     int(datetime.datetime.now().timestamp()))
            print(values)
            data = insert_query(tablename, fields, values)
            return "Registration Successfully !"
        else:
            return "Registration is already done !"

    except Exception as e:
        return e


@creator.route('/creator/addTableNames', methods=['POST'])
def addTableNames():
    try:
        # print(update_values)
        walletAddress = request.json['walletAddress']
        tablename = os.environ.get('creators_table')
        data = request.json['data']
        # assesment_table = request.json['assesment_table']
        # repo_table = request.json['repo_table']

        # Check all the columns are empty or not.
        fields = "*"
        condition = f"""wallet_address = '{walletAddress}'"""
        creator_data = select_query(fields, tablename, condition)

        final_data = json.loads(creator_data.decode('utf-8'))
        print(final_data)

        status_list = []

        if data["question_table"]:
            print(final_data['rows'][0][11])
            if not final_data['rows'][0][11]:
                question_update_values = {
                    "question_table": data["question_table"]}
                condition = f"""wallet_address='{walletAddress}'"""
                question_table = update_query(
                    tablename, question_update_values, condition)
                print(question_table)
                status_list.append("Question table added successfully!!")
            else:
                status_list.append("Question table already exists!!")

        if data["assesment_table"]:
            if not final_data['rows'][0][12]:
                assesment_update_values = {
                    'assesment_table': data["assesment_table"]}
                condition = f"""wallet_address='{walletAddress}'"""
                assesment_table = update_query(
                    tablename, assesment_update_values, condition)
                print(assesment_table)
                status_list.append("Assesment table added successfully!!")
            else:
                status_list.append("Assesment table already exists!!")

        if data["repo_table"]:
            if not final_data['rows'][0][13]:
                repo_update_values = {"repo_table": data["repo_table"]}
                condition = f"""wallet_address='{walletAddress}'"""
                repo_table = update_query(
                    tablename, repo_update_values, condition)
                print(repo_table)
                status_list.append("Repo table added successfully!!")
            else:
                status_list.append("Repo table already exists!!")

        # condition = f"""wallet_address='{walletAddress}' AND """
        # data = update_query(tablename, update_values, condition, True)
        return status_list, 200
    except Exception as e:
        print(e)
        return "Something went wrong !!", 500

####################################################################################################################
####################################################################################################################
# Get creator tables


@creator.route('/creator/getTables', methods=['POST'])
def getTables():
    try:
        # print(update_values)
        walletAddress = request.json['walletAddress']
        tablename = os.environ.get('creators_table')
        fields = "*"
        condition = f"""wallet_address = '{walletAddress}'"""
        creator_data = select_query(fields, tablename, condition)

        final_data = json.loads(creator_data.decode('utf-8'))
        print(final_data)
        creator_tables = {"question_table": final_data['rows'][0][11],
                          "assesment_table": final_data['rows'][0][12], "repo_table": final_data['rows'][0][12]}
        return creator_tables, 200
    except Exception as e:
        print(e)
        return "Something went wrong !!", 500

####################################################################################################################
####################################################################################################################
# Verify questions before adding it to global questions.

@creator.route('/creator/toBeVerified', methods=['POST'])
def toBeVerified():
    try:
        walletAddress = request.json["walletAddress"]
        print(walletAddress)
        return "Inside to be verified", 200
    except Exception as e:
        print(str(e))
        return "Something went wrong!!!", 500