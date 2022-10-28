import logging
import os
import sys
from dotenv import load_dotenv
load_dotenv()
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0, '/home/ubuntu/marketplace_api/api')
os.environ['login_table'] = 'login_table_80001_1645'
from app import app as application