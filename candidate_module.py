from dataclasses import fields
from dotenv import load_dotenv
import os
from queries import *
import datetime
import json
from flask import Blueprint, render_template, abort
from flask.globals import request, session

load_dotenv()

candidate = Blueprint('candidate', __name__)


def candidate_registration(data):
    try:
        fields = '*'
        tablename = os.environ.get('candidate_table')
        #Checking If the Address is Exists Or Not
        condition =  f"""wallet_address='{data[5]}'"""
        data = select_query(fields,tablename, condition)
        final_data = json.loads(data.decode('utf-8'))
        if(len(final_data['rows']) == 0):
            tablename = os.environ.get('candidate_table')
            fields = "(login_id, name, bio, profile_image, cover_image, wallet_address, address, country, contect_number, created_at, modified_at)"
            values = data + (int(datetime.datetime.now().timestamp()), int(datetime.datetime.now().timestamp()))
            data = insert_query(tablename, fields ,values)
            return "Registration Successfully !"
        else:
            return "Registration is already done !"

    except Exception as e:
        return e    


@candidate.route('/user/addEducation', methods=["POST"])
def addEducation():
    try:
        tablename = os.environ.get('user_education')
        fields = "(login_id,wallet_address, institute_name, degree, filed_of_study, start_date, end_date, score, description)"
        values = (request.json['login_id'],request.json['wallet_address'],request.json['institute_name'],request.json['degree'],request.json['filed_of_study'],request.json['start_date'],request.json['end_date'],request.json['score'],request.json['description'])
        data = insert_query(tablename, fields ,values)
        response_body = {
            "status":200,
            "data":"User Education added !"
        }    
        return response_body
    except Exception as e:
        print(str(e))
        return str(e),403


@candidate.route('/user/addExperience', methods=["POST"])
def addExperience():
    try:
        tablename = os.environ.get('user_experiance_table')
        fields = "(login_id,wallet_address, employement_type, company_name, location, start_date, end_date,status,description)"
        values = (request.json['login_id'],request.json['wallet_address'],request.json['employement_type'],request.json['company_name'],request.json['location'],request.json['start_date'],request.json['end_date'],request.json['status'],request.json['description'])
        data = insert_query(tablename, fields ,values)
        response_body = {
            "status":200,
            "data":"User Experience Added !"
        }    
        return response_body
    except Exception as e:
        return str(e),403


@candidate.route('/user/addAchivement', methods=["POST"])
def addAchivement():
    try:
        tablename = os.environ.get('user_achivement_table')
        fields = "(login_id,wallet_address, title, description, image, issueing_organization, score)"
        values = (request.json['login_id'],request.json['wallet_address'],request.json['title'],request.json['description'],request.json['image'],request.json['issueing_organization'],request.json['score'])
        data = insert_query(tablename, fields ,values)
        response_body = {
            "status":200,
            "data":"User Achivement Added !"
        }    
        return response_body
    except Exception as e:    
        return str(e),403


@candidate.route('/user/addSkill', methods=["POST"])
def addSkill():
    try:
        user_skill_tablename = os.environ.get('user_skill_table')
        fields = "(login_id,wallet_addres, skill_id)"
        login_id = request.json['login_id']
        wallet_address = request.json['wallet_address']
        skill_names = request.json['skill_name']
        skill_tablename = os.environ.get('skill_table')
        skill_ids = request.json['skill_ids']
        for skill in skill_names:
            data = insert_query(skill_tablename,"(skill_name)",f"""('{skill}')""")    
            condition = f"""skill_name='{skill}'"""
            data = select_query("(skill_id)", skill_tablename, condition)
            final_data = json.loads(data.decode('utf-8'))
            if len(final_data['rows']) > 0:
                skill_ids.append(final_data['rows'][0][0])

        values = ''
        for ids in skill_ids:
            values +=  f"""({login_id},'{wallet_address}',{ids}),"""
        data = insert_query(user_skill_tablename,fields,values[0:-1])    
        response_body = {
            "status":200,
            "data":"User's Skill Addedd Successfully !"
        },200    
        return response_body

    except Exception as e:   
        response_body = {
            "status":401,
            "data":str(e)
        },401
        return response_body
